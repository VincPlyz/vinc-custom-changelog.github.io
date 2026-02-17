/**
 * Blockbench 3D Viewer
 * A Three.js based viewer for Blockbench models with animation and texture support
 * 
 * Supports Blockbench geometry format (1.12.0+)
 */

const BlockbenchViewer = (() => {
  let viewers = {};

  const Config = {
    cameraDistance: 25,
    fov: 50,
    near: 0.1,
    far: 1000,
    rotationSpeed: 0.005,
    zoomSpeed: 0.1,
    backgroundColor: 0x1a1a1a,
    lightColor: 0xffffff,
    ambientLightIntensity: 0.6,
    directionalLightIntensity: 0.8,
  };

  /**
   * Initialize a new 3D viewer
   */
  function init(options) {
    const {
      canvasId,
      containerId,
      modelPath,
      texturePath,
      scale = 1,
      autoRotate = true,
    } = options;

    const canvas = document.getElementById(canvasId);
    const container = document.getElementById(containerId);

    if (!canvas) {
      console.error(`Canvas element with id "${canvasId}" not found`);
      return;
    }

    // Create viewer instance
    const viewer = new Viewer({
      canvas,
      container,
      modelPath,
      texturePath,
      scale,
      autoRotate,
    });

    viewers[canvasId] = viewer;
    return viewer;
  }

  /**
   * Main Viewer class
   */
  class Viewer {
    constructor(options) {
      this.canvas = options.canvas;
      this.container = options.container;
      this.modelPath = options.modelPath;
      this.texturePath = options.texturePath;
      this.scale = options.scale;
      this.autoRotateEnabled = options.autoRotate;
      this.wireframeMode = false;
      this.animationId = null;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.mouseDown = false;
      this.rotationX = 0.3;
      this.rotationY = 0.5;

      this.initScene();
      this.loadModel();
      this.setupControls();
      this.animate();
    }

    initScene() {
      // Scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(Config.backgroundColor);

      // Camera setup
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      this.camera = new THREE.PerspectiveCamera(
        Config.fov,
        width / height,
        Config.near,
        Config.far
      );
      this.camera.position.set(0, 5, Config.cameraDistance);
      this.camera.lookAt(0, 0, 0);

      // Renderer setup
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;

      // Lighting
      this.setupLighting();

      // Handle window resize
      window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLighting() {
      // Ambient light
      const ambientLight = new THREE.AmbientLight(
        Config.lightColor,
        Config.ambientLightIntensity
      );
      this.scene.add(ambientLight);

      // Directional light (sun)
      this.directionalLight = new THREE.DirectionalLight(
        Config.lightColor,
        Config.directionalLightIntensity
      );
      this.directionalLight.position.set(10, 15, 10);
      this.directionalLight.castShadow = true;
      this.directionalLight.shadow.mapSize.width = 2048;
      this.directionalLight.shadow.mapSize.height = 2048;
      this.directionalLight.shadow.camera.left = -30;
      this.directionalLight.shadow.camera.right = 30;
      this.directionalLight.shadow.camera.top = 30;
      this.directionalLight.shadow.camera.bottom = -30;
      this.scene.add(this.directionalLight);

      // Point light for better visibility
      const pointLight = new THREE.PointLight(Config.lightColor, 0.5);
      pointLight.position.set(-10, 10, -10);
      this.scene.add(pointLight);
    }

    async loadModel() {
      try {
        const response = await fetch(this.modelPath);
        if (!response.ok) {
          throw new Error(`Failed to load model: ${response.statusText}`);
        }

        const data = await response.json();
        this.modelData = data;
        this.buildModel(data);

        // Load texture if provided
        if (this.texturePath) {
          this.loadTexture(this.texturePath);
        }
      } catch (error) {
        console.error('Error loading model:', error);
        this.showError(`Failed to load model: ${error.message}`);
      }
    }

    async loadTexture(texturePath) {
      try {
        const textureLoader = new THREE.TextureLoader();
        const texture = await textureLoader.loadAsync(texturePath);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;

        // Apply texture to all materials
        this.scene.traverse((child) => {
          if (child.isMesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.map = texture;
                mat.needsUpdate = true;
              });
            } else {
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
          }
        });
      } catch (error) {
        console.error('Error loading texture:', error);
      }
    }

    buildModel(data) {
      // Clear existing model
      const existingModel = this.scene.getObjectByName('model');
      if (existingModel) {
        this.scene.remove(existingModel);
      }

      const modelGroup = new THREE.Group();
      modelGroup.name = 'model';

      if (!data['minecraft:geometry'] || !Array.isArray(data['minecraft:geometry'])) {
        console.error('Invalid model format');
        return;
      }

      data['minecraft:geometry'].forEach((geometry) => {
        if (geometry.bones) {
          this.buildBones(geometry.bones, modelGroup);
        }
      });

      // Center and scale the model
      const bbox = new THREE.Box3().setFromObject(modelGroup);
      const center = bbox.getCenter(new THREE.Vector3());
      modelGroup.position.sub(center);
      modelGroup.scale.multiplyScalar(this.scale);

      this.scene.add(modelGroup);
      this.model = modelGroup;
    }

    buildBones(bones, parent, parentBone = null) {
      bones.forEach((bone) => {
        const boneGroup = new THREE.Group();
        boneGroup.name = bone.name;

        if (bone.pivot) {
          boneGroup.position.set(bone.pivot[0], bone.pivot[1], bone.pivot[2]);
        }

        if (bone.rotation) {
          const [x, y, z] = bone.rotation;
          boneGroup.rotation.order = 'ZYX';
          boneGroup.rotation.z = THREE.MathUtils.degToRad(x);
          boneGroup.rotation.y = THREE.MathUtils.degToRad(y);
          boneGroup.rotation.x = THREE.MathUtils.degToRad(z);
        }

        // Create cubes for this bone
        if (bone.cubes && Array.isArray(bone.cubes)) {
          bone.cubes.forEach((cube) => {
            const mesh = this.createCubeMesh(cube);
            if (mesh) {
              boneGroup.add(mesh);
            }
          });
        }

        // Recursively build child bones
        if (bone.children && Array.isArray(bone.children)) {
          this.buildBones(bone.children, boneGroup, bone);
        }

        parent.add(boneGroup);
      });
    }

    createCubeMesh(cube) {
      const {
        origin = [0, 0, 0],
        size = [1, 1, 1],
        rotation = [0, 0, 0],
        inflate = 0,
        pivot = null,
        uv = [0, 0],
      } = cube;

      const [sx, sy, sz] = [
        size[0] + inflate * 2,
        size[1] + inflate * 2,
        size[2] + inflate * 2,
      ];

      const geometry = new THREE.BoxGeometry(sx, sy, sz);
      const material = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.3,
        roughness: 0.7,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Position the cube
      mesh.position.set(
        origin[0] + sx / 2 - (inflate || 0),
        origin[1] + sy / 2 - (inflate || 0),
        origin[2] + sz / 2 - (inflate || 0)
      );

      // Apply rotation if specified
      if (rotation && (rotation[0] || rotation[1] || rotation[2])) {
        if (pivot) {
          mesh.position.sub(new THREE.Vector3(...pivot));
        }
        mesh.rotation.order = 'ZYX';
        mesh.rotation.z = THREE.MathUtils.degToRad(rotation[0]);
        mesh.rotation.y = THREE.MathUtils.degToRad(rotation[1]);
        mesh.rotation.x = THREE.MathUtils.degToRad(rotation[2]);
        if (pivot) {
          mesh.position.add(new THREE.Vector3(...pivot));
        }
      }

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      return mesh;
    }

    setupControls() {
      // Mouse controls
      this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
      this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
      this.canvas.addEventListener('mouseup', () => this.onMouseUp());
      this.canvas.addEventListener('wheel', (e) => this.onMouseWheel(e), false);

      // Touch controls for mobile
      this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
      this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
      this.canvas.addEventListener('touchend', () => this.onTouchEnd());
    }

    onMouseDown(event) {
      this.mouseDown = true;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    }

    onMouseMove(event) {
      if (!this.mouseDown || !this.model) return;

      const deltaX = event.clientX - this.lastMouseX;
      const deltaY = event.clientY - this.lastMouseY;

      this.rotationY += deltaX * Config.rotationSpeed;
      this.rotationX += deltaY * Config.rotationSpeed;

      // Clamp rotation
      this.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotationX));

      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    }

    onMouseUp() {
      this.mouseDown = false;
    }

    onMouseWheel(event) {
      event.preventDefault();
      const zoomDirection = event.deltaY > 0 ? 1 : -1;
      const currentDistance = this.camera.position.length();
      const newDistance = Math.max(
        5,
        Math.min(100, currentDistance + zoomDirection * Config.zoomSpeed * 2)
      );
      const scale = newDistance / currentDistance;
      this.camera.position.multiplyScalar(scale);
    }

    onTouchStart(event) {
      if (event.touches.length === 1) {
        this.mouseDown = true;
        this.lastMouseX = event.touches[0].clientX;
        this.lastMouseY = event.touches[0].clientY;
      }
    }

    onTouchMove(event) {
      if (event.touches.length === 1 && this.mouseDown && this.model) {
        const deltaX = event.touches[0].clientX - this.lastMouseX;
        const deltaY = event.touches[0].clientY - this.lastMouseY;

        this.rotationY += deltaX * Config.rotationSpeed;
        this.rotationX += deltaY * Config.rotationSpeed;

        this.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotationX));

        this.lastMouseX = event.touches[0].clientX;
        this.lastMouseY = event.touches[0].clientY;
      }
    }

    onTouchEnd() {
      this.mouseDown = false;
    }

    onWindowResize() {
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    animate() {
      this.animationId = requestAnimationFrame(() => this.animate());

      // Auto-rotate
      if (this.autoRotateEnabled && !this.mouseDown && this.model) {
        this.rotationY += 0.002;
      }

      // Update model rotation
      if (this.model) {
        this.model.rotation.order = 'YXZ';
        this.model.rotation.y = this.rotationY;
        this.model.rotation.x = this.rotationX;
      }

      // Update camera position based on rotation
      const distance = this.camera.position.length();
      this.camera.position.x = distance * Math.sin(this.rotationY) * Math.cos(this.rotationX);
      this.camera.position.y = distance * Math.sin(this.rotationX) + 5;
      this.camera.position.z = distance * Math.cos(this.rotationY) * Math.cos(this.rotationX);
      this.camera.lookAt(0, 0, 0);

      this.renderer.render(this.scene, this.camera);
    }

    toggleAutoRotate() {
      this.autoRotateEnabled = !this.autoRotateEnabled;
    }

    toggleWireframe() {
      this.wireframeMode = !this.wireframeMode;
      this.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.wireframe = this.wireframeMode;
            });
          } else {
            child.material.wireframe = this.wireframeMode;
          }
        }
      });
    }

    resetCamera() {
      this.rotationX = 0.3;
      this.rotationY = 0.5;
      this.camera.position.set(0, 5, Config.cameraDistance);
      this.camera.lookAt(0, 0, 0);
    }

    showError(message) {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(220, 53, 69, 0.9);
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-family: monospace;
        text-align: center;
      `;
      errorDiv.textContent = message;
      this.container.appendChild(errorDiv);
    }
  }

  // Global helper functions
  window.toggleAutoRotate = function (btn) {
    const container = btn.closest('.blockbench-viewer-container');
    const canvas = container.querySelector('canvas');
    const viewer = viewers[canvas.id];
    if (viewer) {
      viewer.toggleAutoRotate();
      btn.style.opacity = viewer.autoRotateEnabled ? '1' : '0.5';
    }
  };

  window.resetCamera = function (btn) {
    const container = btn.closest('.blockbench-viewer-container');
    const canvas = container.querySelector('canvas');
    const viewer = viewers[canvas.id];
    if (viewer) {
      viewer.resetCamera();
    }
  };

  window.toggleWireframe = function (btn) {
    const container = btn.closest('.blockbench-viewer-container');
    const canvas = container.querySelector('canvas');
    const viewer = viewers[canvas.id];
    if (viewer) {
      viewer.toggleWireframe();
      btn.style.opacity = viewer.wireframeMode ? '1' : '0.5';
    }
  };

  return {
    init,
    viewers,
  };
})();
