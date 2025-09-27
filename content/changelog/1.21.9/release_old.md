---
title: "1.21.9 - The Copper Age"
description: "Alle Änderungen und Neuigkeiten in 1.21.9 - The Copper Age"
showReadingTime: false
showWordCount: false
date: 2025-09-09
---


[Gameplay Changes](#gameplay-changes)

[Technical Changes](#technical-changelog)

Datapack Changelog

Resourcepack Changelog

[Bug Fixes](#bug-fixes)




# Gameplay Changes

## New Blocks

### Copper Chest

* Has 4 oxidation variants and 2 waxed variants for each oxidation variant, like other copper-type blocks  

  {{< gallery >}}
<img src="https://minecraft.wiki/images/Copper_Chest_BE2.gif" class="grid-w25" style="width:150px;">
<img src="https://minecraft.wiki/images/Exposed_Copper_Chest_BE2.gif" class="grid-w25" style="width:150px;">
<img src="https://minecraft.wiki/images/Weathered_Copper_Chest_BE2.gif" class="grid-w25" style="width:150px;">
<img src="https://minecraft.wiki/images/Oxidized_Copper_Chest_BE2.gif" class="grid-w25" style="width:150px;">
{{< /gallery >}}

* Can be crafted with the following recipe: 

  {{< crafting_v2 scale=2
    row_1-1="Copper_Ingot"
    row_1-2="Copper_Ingot"
    row_1-3="Copper_Ingot"
    row_2-1="Copper_Ingot"
    row_2-2="Chest"
    row_2-3="Copper_Ingot"
    row_3-1="Copper_Ingot"
    row_3-2="Copper_Ingot"
    row_3-3="Copper_Ingot"
    output="Copper_Chest"
>}}

  * The oxidation and waxed variant of the chest when crafted is unoxidized and unwaxed, respectively  
  * The recipe is unlocked when obtaining a copper chest (of any variant)  
* Is also generated below a copper golem spawned from a block of copper (any state) with a carved pumpkin on top  
  * The oxidation variant of the chest corresponds to the oxidation variant of the block of copper used to generate it

### Copper Golem Statue

* Has 4 oxidation variants and 2 waxed variants for each oxidation variant, like other copper-type blocks  

 {{< gallery >}}
<img src="https://minecraft.wiki/images/Copper_Golem_Statue_BE1.png?afdf5&format=original" class="grid-w25" style="">
<img src="https://minecraft.wiki/images/Exposed_Copper_Golem_Statue_BE1.png?a7cdd&format=original" class="grid-w25" style="">
<img src="https://minecraft.wiki/images/Weathered_Copper_Golem_Statue_BE1.png?c6a60&format=original" class="grid-w25" style="">
<img src="https://minecraft.wiki/images/Oxidized_Copper_Golem_Statue_BE1.png?afd3d&format=original" class="grid-w25" style="">
{{< /gallery >}}

* Its oxidized variant is placed into the world after a copper golem oxidizes past its oxidized state  
  * The statue will have a random pose when the block is generated  
* When an axe is used on its non-oxidized variant, the block will be converted into a new copper golem mob  
  * If the copper golem initially used to generate the block had a custom name, the block will store that name and give it to the new copper golem spawned  
* Interacting with the block will change the pose of the statue, cycling through a total of 4 different poses  
* When connected to a redstone comparator, the comparator will produce a redstone signal, with the signal strength differing for each pose of the statue, from 1 to 4  
* When destroyed, its current pose is kept on the resulting item  
* Is destroyed and dropped as an item when pushed by a piston

### Shelf

* Has 12 variants corresponding to each wood type and to bamboo  

{{< carousel
"https://minecraft.wiki/images/Oak_Shelf_JE1_BE2.png?b1719&format=original|Oak|1.0|-30px|20px"
"https://minecraft.wiki/images/Spruce_Shelf_JE1_BE2.png?8ef92&format=original|Spruce|1.0|-30px|20px"
"https://minecraft.wiki/images/Birch_Shelf_JE1_BE2.png?bb5ca&format=original|Birch|1.0|-30px|20px"
"https://minecraft.wiki/images/Jungle_Shelf_JE1_BE2.png?f3c01&format=original|Jungle|1.0|-30px|20px"
"https://minecraft.wiki/images/Acacia_Shelf_JE1_BE2.png?feb1c&format=original|Acacia|1.0|-30px|20px"
"https://minecraft.wiki/images/Dark_Oak_Shelf_JE1_BE2.png?36233&format=original|Dark Oak|1.0|-30px|20px"
"https://minecraft.wiki/images/Mangrove_Shelf_JE1_BE2.png?662e3&format=original|Mangrove|1.0|-30px|20px"
"https://minecraft.wiki/images/Cherry_Shelf_JE1_BE2.png?1394a&format=original|Cherry|1.0|-30px|20px"
"https://minecraft.wiki/images/Pale_Oak_Shelf_JE1_BE2.png?01b82&format=original|Pale Oak|1.0|-30px|20px"
"https://minecraft.wiki/images/Bamboo_Shelf_JE1_BE2.png?e92d2&format=original|Bamboo|1.0|-30px|20px"
"https://minecraft.wiki/images/Crimson_Shelf_JE1_BE2.png?93507&format=original|Crimson|1.0|-30px|20px"
"https://minecraft.wiki/images/Warped_Shelf_JE1_BE2.png?aee19&format=original|Warped|1.0|-30px|20px"
>}}

* Can be crafted with the following recipe: 

  {{< crafting_v2 scale=2
    row_1-1="chatg_stripped_log"
    row_1-2="chatg_stripped_log"
    row_1-3="chatg_stripped_log"
    row_2-2="Chest"
    row_3-1="chatg_stripped_log"
    row_3-2="chatg_stripped_log"
    row_3-3="chatg_stripped_log"
    output="chatg_shelfs|1.2"
>}}

  * All stripped logs, stripped stems, or blocks of stripped bamboo in the recipe have to be of the same type  
  * The type of shelf crafted corresponds to the type of stripped logs, stripped stems, or the blocks of stripped bamboo used to craft it  
  * The recipe for a specific type of shelf is unlocked when obtaining a stripped log, stripped stem, block of stripped bamboo, or a shelf, of the same wood type  
* Can store up to 3 item stacks  
* Has 3 slots that can each be interacted with, which will swap the contents of the slot with the item stack held in the player's main hand  
* If a slot contains an item stack, the item will be displayed in front of the slot, similar to item frames  
* When powered by a redstone signal, its slots will connect, making all of them interactable together  
  * When the player interacts with the block in this state, the contents of the player's hotbar's 3 rightmost item stacks will be swapped with the contents of the shelf's slots  
* When powered and adjacent to another shelf (regardless of its type) that is also powered, the shelves will connect together and combine their slots  
  * Interacting with any of the connected shelves will swap the same number of item stacks from the player's hotbar as the number of shelf slots connected, starting from the rightmost slot of the hotbar  
  * Up to 3 powered shelves can be connected together, for a total of 9 connected slots, which will swap the contents of the player's entire hotbar with the contents of all the shelves' slots  
* When the block is destroyed, drops itself and the items stored inside it  
* When connected to a redstone comparator, produces a redstone signal, with the signal strength depending on the which of its slots are filled  
  * The signal strength is determined by converting the binary representation of its slots' filled state (from the first slot to the last slot) to a decimal value  
  * Examples:  
    * All slots empty (binary representation: 000\) → signal strength of 0  
    * First slot filled (binary representation: 001\) → signal strength of 1  
    * Second slot filled (binary representation: 010\) → signal strength of 2  
    * Third slot filled (binary representation: 100\) → signal strength of 4  
    * All slots filled (binary representation: 111\) → signal strength of 7

### Copper Torch

<img src="/vinc-custom-changelog.github.io/images/25w32a/copper_torch_iw.png" alt="" style="width:500px;"/>

* Does not oxidize over time, unlike other copper-type blocks  
* Can be crafted with the following recipe: 

  {{< crafting_v2 scale=2
    row_1-2="Copper_Nugget"
    row_2-2="chatg_coal"
    row_3-2="Stick"
    output="Copper_Torch|1.1"
>}}

  * The recipe is unlocked when obtaining a copper nugget or copper torch  
* Similar to torches, but has a green color  
* Can be used to craft copper lanterns

### Copper Bars

<img src="/vinc-custom-changelog.github.io/images/1.21.9/copper_bars.png" alt="" style="width:500px;"/>

* Has 4 oxidation variants and 2 waxed variants for each oxidation variant, like other copper-type blocks  
* Can be crafted with the following recipe: 

  {{< crafting_v2 scale=2
    row_2-1="Copper_Ingot"
    row_2-2="Copper_Ingot"
    row_2-3="Copper_Ingot"
    row_3-1="Copper_Ingot"
    row_3-2="Copper_Ingot"
    row_3-3="Copper_Ingot"
    output="Copper_Bars"
    count="16"
>}}

  * The oxidation and waxed variant of the chest when crafted is unoxidized and unwaxed, respectively  
  * The recipe is unlocked when obtaining a copper ingot or copper bars

### Copper Chain

<img src="/vinc-custom-changelog.github.io/images/1.21.9/copper_chain.png" alt="" style="width:500px;"/>

* Has 4 oxidation variants and 2 waxed variants for each oxidation variant, like other copper-type blocks  
* Can be crafted with the following recipe:

  {{< crafting_v2 scale=2
    row_1-2="Copper_Nugget"
    row_2-2="Copper_Ingot"
    row_3-2="Copper_Nugget"
    output="Copper_chain"
>}}

  * The oxidation and waxed variant of the chest when crafted is unoxidized and unwaxed, respectively  
  * The recipe is unlocked when obtaining a copper nugget, copper ingot, or copper chain

### Copper Lantern

<img src="/vinc-custom-changelog.github.io/images/1.21.9/copper_lantern.png" alt="" style="width:500px;"/>

* Has 4 oxidation variants and 2 waxed variants for each oxidation variant, like other copper-type blocks  
* Can be crafted with the following recipe:

  {{< crafting_v2 scale=2
    row_1-1="Copper_Nugget"
    row_1-2="Copper_Nugget"
    row_1-3="Copper_Nugget"
    row_2-1="Copper_Nugget"
    row_2-2="Copper_Torch"
    row_2-3="Copper_Nugget"
    row_3-1="Copper_Nugget"
    row_3-2="Copper_Nugget"
    row_3-3="Copper_Nugget"
    output="Copper_Lantern"
>}}

  * The oxidation and waxed variant of the chest when crafted is unoxidized and unwaxed, respectively  
  * The recipe is unlocked when obtaining a copper nugget, copper ingot, or copper lantern  
* Similar to lanterns, but its lit part is a green color

### Lightning Rod Oxidation Variants

* Lightning rods now oxidize over time, resulting in its oxidation variants, like other copper-type blocks  
* Consists of the following blocks: Exposed Lightning Rod, Weathered Lightning Rod, Oxidized Lightning Rod

 {{< gallery >}}
<img src="https://minecraft.wiki/images/Lightning_Rod_%28U%29_JE3.png?6db91&format=original" class="grid-w25" style="width:150px;">
<img src="https://minecraft.wiki/images/Exposed_Lightning_Rod_%28U%29_JE1.png?63b1b&format=original" class="grid-w25" style="width:150px;">
<img src="https://minecraft.wiki/images/Weathered_Lightning_Rod_%28U%29_JE1.png?2d2f0&format=original" class="grid-w25" style="width:150px;">
<img src="https://minecraft.wiki/images/Oxidized_Lightning_Rod_%28U%29_JE1.png?f7d43&format=original" class="grid-w25" style="width:150px;">
{{< /gallery >}}

### Lightning Rod Waxed Variants

* As lightning rods now oxidize over time, lightning rods can now also be waxed using honeycomb on them or crafting them with honeycomb, like other copper-type blocks  
* Consists of the following blocks: Waxed Lightning Rod, Waxed Exposed Lightning Rod, Waxed Weathered Lightning Rod, Waxed Oxidized Lightning Rod


## New Items

### Copper Tools

* Consist of the following items:  
  * Copper Sword  
    * Can be crafted with the following recipe: 

      {{< crafting_v2 scale=1.5
    row_1-2="Copper_Ingot"
    row_2-2="Copper_Ingot"
    row_3-2="Stick"
    output="Copper_Sword"
    >}}

  * Copper Axe  
    * Can be crafted with the following recipe: 

      {{< crafting_v2 scale=1.5
    row_1-2="Copper_Ingot"
    row_1-3="Copper_Ingot"
    row_2-3="Copper_Ingot"
    row_2-2="Stick"
    row_3-2="Stick"
    output="Copper_Axe"
    >}}

  * Copper Pickaxe  
    * Can be crafted with the following recipe: 
    
      {{< crafting_v2 scale=1.5
    row_1-1="Copper_Ingot"
    row_1-2="Copper_Ingot"
    row_1-3="Copper_Ingot"
    row_2-2="Stick"
    row_3-2="Stick"
    output="Copper_Pickaxe"
    >}}

  * Copper Shovel  
    * Can be crafted with the following recipe: 

      {{< crafting_v2 scale=1.5
    row_1-2="Copper_Ingot"
    row_2-2="Stick"
    row_3-2="Stick"
    output="Copper_Shovel"
    >}}

  * Copper Hoe  
    * Can be crafted with the following recipe: 
      
      {{< crafting_v2 scale=1.5
    row_1-2="Copper_Ingot"
    row_1-3="Copper_Ingot"
    row_2-2="Stick"
    row_3-2="Stick"
    output="Copper_Hoe"
    >}}

* Their crafting recipes are unlocked when obtaining a copper ingot or the same item type  
* Have a higher mining efficiency than stone tools, but less than iron tools  
* Have higher enchantability than diamond tools, but less than iron tools  
* Have 191 durability and can be repaired in an anvil using copper ingots

### Copper Armor

<img src="https://minecraft.wiki/images/Steve_in_copper_armor.png" alt="" style="width:150px;"/>

* Consist of the following items:  
  * Copper Helmet  
    * Can be crafted with the following recipe: 

        {{< crafting_v2 scale=1.5
    row_1-1="Copper_Ingot"
    row_1-2="Copper_Ingot"
    row_1-3="Copper_Ingot"
    row_2-1="Copper_Ingot"
    row_2-3="Copper_Ingot"
    output="Copper_Helmet"
    >}}

    * Gives 2 armor points when equipped in the head armor slot  
    * Has 121 durability  

  * Copper Chestplate  
    * Can be crafted with the following recipe:

        {{< crafting_v2 scale=1.5
    row_1-1="Copper_Ingot"
    row_1-3="Copper_Ingot"
    row_2-1="Copper_Ingot"
    row_2-2="Copper_Ingot"
    row_2-3="Copper_Ingot"
    row_3-1="Copper_Ingot"
    row_3-2="Copper_Ingot"
    row_3-3="Copper_Ingot"
    output="Copper_Chestplate"
    >}}
     
    * Gives 4 armor points when equipped in the chest armor slot  
    * Has 176 durability  
  * Copper Leggings  
    * Can be crafted with the following recipe:

        {{< crafting_v2 scale=1.5
    row_1-1="Copper_Ingot"
    row_1-2="Copper_Ingot"
    row_1-3="Copper_Ingot"
    row_2-1="Copper_Ingot"
    row_2-3="Copper_Ingot"
    row_3-1="Copper_Ingot"
    row_3-3="Copper_Ingot"
    output="Copper_Leggings"
    >}}

    * Gives 3 armor points when equipped in the legs armor slot  
    * Has 165 durability  
  * Copper Boots  
    * Can be crafted with the following recipe:

        {{< crafting_v2 scale=1.5
    row_2-1="Copper_Ingot"
    row_2-3="Copper_Ingot"
    row_3-1="Copper_Ingot"
    row_3-3="Copper_Ingot"
    output="Copper_Boots"
    >}}

    * Gives 1 armor point when equipped in the feet armor slot  
    * Has 143 durability  

* Their crafting recipes are unlocked when obtaining a copper ingot or the same item type  
* Zombies, husks, skeletons, strays, and bogged can also naturally spawn with copper armor equipped  
* Have higher enchantability than diamond armor, but less than iron armor  
* Can be repaired in an anvil using copper ingots

### Copper Horse Armor

* Generates in the same chest loot and with the same weight as iron horse armor  
* Gives an armor toughness of 4 when equipped on a horse

<img src="https://minecraft.wiki/images/Copper_Horse_Armor_JE1_BE1.png" alt="" style="width:250px;"/>


### Copper Nugget

* Can be smelted into from copper tools and copper armor  
* Can also be crafted with the following recipe: 

    {{< crafting_v2 scale=1.5
    row_2-2="Copper_Ingot"
    output="Copper_Nugget"
    count="9"
    >}}

  * The recipe is unlocked when obtaining a copper ingot or copper nugget  
* Can be used to craft copper ingots, with the following recipe:

    {{< crafting_v2 scale=1.5
    row_1-1="Copper_Nugget"
    row_1-2="Copper_Nugget"
    row_1-3="Copper_Nugget"
    row_2-1="Copper_Nugget"
    row_2-2="Copper_Nugget"
    row_2-3="Copper_Nugget"
    row_3-1="Copper_Nugget"
    row_3-2="Copper_Nugget"
    row_3-3="Copper_Nugget"
    output="Copper_Ingot"
    >}}

  * The recipe is unlocked when obtaining a copper nugget or copper ingot  
* Can also be used to craft copper chains, torches, and lanterns

### Copper Golem Spawn Egg

<img src="https://minecraft.wiki/images/Copper_Golem_Spawn_Egg_JE1_BE1.png" alt="" style="width:150px;"/>


* When used on a block, spawns a copper golem  
  * The oxidation and waxed variant of the mob is unoxidized and unwaxed, respectively

## New Mobs

### Copper Golem

 {{< gallery >}}
<img src="https://minecraft.wiki/images/Copper_Golem_JE1_BE1.png?3c87d&format=original" class="grid-w25" style="width:140px;padding-left:20px;">
<img src="https://minecraft.wiki/images/Exposed_Copper_Golem_JE1_BE1.png?0355f&format=original" class="grid-w25" style="width:140px;padding-left:20px;">
<img src="https://minecraft.wiki/images/Weathered_Copper_Golem_JE1_BE1.png?6b51d&format=original" class="grid-w25" style="width:140px;padding-left:20px;">
<img src="https://minecraft.wiki/images/Oxidized_Copper_Golem_JE1_BE1.png?6980f&format=original" class="grid-w25" style="width:140px; padding-left:20px;">
{{< /gallery >}}

* Has 4 oxidation variants and 2 waxed variants for each oxidation variant, like copper-type blocks  
  * Has the same oxidation and waxing functionality as copper-type blocks  
  * The mob's oxidation variant or its waxed variant has no effect on its functionality  
  * As the mob gets more oxidized, the brightness of its eyes get dimmer (but the mob does not emit any light)  
* After the mob oxidizes past its oxidized state, it will turn into an oxidized copper golem statue  
  * If the mob was holding items, it will drop them before turning into the statue  
* Spawned from a block of copper (any state) with a carved pumpkin or jack o' lantern on top  
  * The oxidation variant of the mob corresponds to the oxidation variant of the block of copper used to spawn it  
  * A copper chest is also generated (of the same oxidation variant as the mob) below the mob  
* Also spawned from using an axe on a non-oxidized copper golem statue  
* Can pick up any items from nearby copper chests, if it is not holding items already  
  * Picks up a maximum of 16 of a single item stack at a time  
  * The chest will open when the mob is picking up items from it and close when the mob is done picking up items from it  
* While holding items, interacting with the mob with an empty hand will make it drop the items  
* If it is holding items, will look for a nearby chest (excluding copper chests) or trapped chest to put the items it is holding into  
  * The mob will only put items in the chest if the chest contains no items or contains the same item type as the items the mob has  
  * The mob will look for up to 10 chests in sequence to potentially put items into  
  * If no eligible chest is found, the mob will idle for 7 seconds before searching again  
  * The search area for chests from the mob's position is 32 blocks horizontally and 8 blocks vertically  
  * If the chest is not on the same level as the mob, the mob can reach the chest up to 1 block vertically from it  
  * The chest will open when the mob is putting items into it and close when the mob is done putting items into it  
* If a player is interacting with a chest that the mob is going to interact with, then the mob will queue in front of the chest until the player stops interacting with it  
* When killed, drops 1-3 copper ingots and the items it is holding (if any)  
* Its eyes are emissive (but do not actually emit gameplay-affecting light)  
* When near an iron golem, there is a chance for the iron golem to offer a poppy to the mob and eventually plant the poppy on the mob's head  
  * Can only occur during daytime  
  * Using shears on the mob will remove the poppy  
  * The poppy will be removed if the mob turns into a copper golem statue  
* Has the following other properties:  
  * Is passive  
  * Can be leashed  
  * Can open and close copper doors

## New Options

### Save Unsent Chats

* If enabled, chat messages will always be saved as chat drafts, even if the player intentionally closes the chat  
* Located in the Chat Settings screen  
* Disabled by default

**Allow Cursor Changes**

* Toggles the mouse cursor changing its shape when the cursor is over certain UI elements  
* Located in the Mouse Settings screen  
* Enabled by default

**Attack/Destroy**

* Sets the Attack/Destroy key bind to either be activated by holding or toggled by pressing the corresponding key  
* Located in the Controls screen  
* Set to Hold by default

**Use Item/Place Block**

* Sets the Use Item/Place Block key bind to either be activated by holding or toggled by pressing the corresponding key  
* Located in the Controls screen  
* Set to Hold by default

**Invert Mouse X**

* When enabled, inverts movement of the player's camera by the mouse on the x-axis  
* Located in the Mouse Settings screen  
* Disabled by default

**Sprint Window**

* Sets the time window, in ticks, where double-tapping the forward key activates the sprint action  
* Located in the Controls screen  
* Can either be disabled or set to a number from 1 to 10  
  * When disabled, double-tapping the forward key will not activate the sprint action

# Changes

* Changed the textures of all dye items, to enhance visual cohesion across the dye set while maintaining distinct shapes to support colorblind accessibility  



* Renamed the "Chain" block to "Iron Chain"  
* The crafting recipe for copper trapdoors now requires 4 copper ingots, instead of 6  
* Updated the title screen panorama to now show the new copper golem mob  
* Updated the Peaceful world difficulty:  
  * Spawn eggs for monsters now have a warning in their inventory tooltip, reading "Disabled in Peaceful"  
  * Monsters can no longer spawn for one tick before being despawned  
* Updated UIs:  
  * Updated the world loading screen:  
    * The chunk loading indicator now shows the chunks the player is about to be placed into, instead of the chunks loaded around the world spawn  
    * Now contains a green progress bar that loads as all appropriate chunks are loaded in the world  
  * Updated the Accessibility Settings screen:  
    * Now has a button leading to the Controls screen  
    * Moved the Auto-Jump, Sneak, and Sprint options from this screen to the Controls screen  
    * Renamed the Show Subtitles button to Closed Captions  
  * Updated the in-game chat:  
    * Unsent chat messages will now be saved as chat drafts if the chat was forcibly closed (including external sources such as dying or a dialog opening, but not the player intentionally closing the chat)  
      * Any existing chat draft will get pre-filled into the message box the next time the chat is opened, with a grayed-out appearance until fully restored  
      * Draft text can be restored as regular text by interacting with it, in the following ways: typing additional text, moving the text cursor, clicking the text, highlight the text  
        * Pressing Enter on a chat draft prior to it being restored will send it like a normal chat message  
        * Pressing Backspace on a chat draft prior to it being restored will delete the draft  
    * Can now be opened while the player is standing in a Nether portal  
    * If opened and the player travels to another dimension, the chat now remains open and unchanged after the player arrives  
  * Players seen in the game world of the current server are now always shown in the Social Interactions screen, even if the player is currently offline  
  * Halychian is now a supported language  
  * The Server Name field in the Add Server screen is no longer prefilled  
    * If left empty, the default name of the server is used  
  * More text inputs now support selecting text by dragging the mouse  
  * Some UI components will now change the shape of the mouse cursor to be in-line with the action performed on those components (e.g. text inputs, numeric sliders, buttons, scroll bars)  
  * Clickable parts of text labels (such as links) will now change the mouse cursor to the "hand" shape  
  * Updated the Key Binds screen:  
    * Multiple key binds that have the same key assigned to them can now work together  
      * The red warning shown for key bind conflicts is now yellow  
      * Example: The D key can be bound to both the Jump and Strafe Left key binds, to jump and strafe left at the same time by pressing D  
    * There is now a new Spectator category, containing the existing Highlight Players key bind and a new Select On Hotbar key bind, which controls toggling the hotbar in Spectator mode  
      * The Select On Hotbar key bind is bound to the middle mouse button by default  
  * Double-clicking a word in an edit box will now select the word  
  * All sound sliders in the Music & Sound Options screen, except for Master Volume and Narrator/Voice, now play a preview sound when the slider is adjusted when the user is not in a world  
  * The Select Resource Packs and Select Data Packs screens now each have a search bar to search the list of available resource packs and data packs, respectively  
* Updated sounds:  
  * Happy ghasts are now audible within 64 blocks of them  
  * Sounds for chests now play at a lower volume  
  * The volume at which a sound is played at now respects the source volume value of the sound  
  * Renamed the Voice/Speech sound source to Narrator/Voice  
* Updated the End:  
  * Now produces a constant skylight level of 15  
  * Now has flashes that occur in the sky from time to time, which flood the dimension with purple light for a short while  
    * If the ender dragon fog is active, then the flashes are not visible in the sky and the brightness of the produced light is reduced  
* When connecting to a server, a Code of Conduct screen can now be shown, which sets the code of conduct for playing on the server  
  * Accepting the code of conduct is required to play on the server  
  * The screen also contains a checkbox to turn off the screen from being displayed again on future reconnects, unless the server's code of conduct is changed  
* Adjusted ambient lighting on entities to now be more visually in-line with blocks and other parts of the game  
  * The underside of flat surfaces will now be lit from the proper direction, instead of the opposite direction  
  * Mainly affects models containing cubes that are either flat or "hollow", such as: worn armor & elytra, the outside layers on player skins, the rib cages of skeletons & skeleton horses, the feet of chickens & frogs, the wings of phantoms & ender dragons, the fins on fish, and more  
* Switching from Spectator mode to Creative mode no longer automatically causes the player to stop flying  
  * Instead, flight is now only disabled when switching game modes if the player is near the ground  
    * A player is considered to be near the ground if there is a collidable surface (i.e. blocks, happy ghasts, boats, etc.) within 1 block below them  
  * Flight will not be disabled if the player was inside a block or collidable entity (to prevent players from suddenly falling through the ground)  
* Updated mobs that can naturally spawn with armor:  
  * Can now initially select copper armor, in addition to leather and gold armor  
  * Increased the chance for the armor tier to be upgraded upon spawning to 10.87% from 9.5% (due to the addition of copper armor as a possibility)

# Technical Changelog

## Additions

##### Minecraft Server Management Protocol

* Is a server management API (JSON-RPC over WebSocket) for dedicated servers, adhering to the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification)  
* Is disabled by default, but can be enabled using the new management-server-enabled server property  
  * The host and port the server is started on can be controlled by the new management-server-host and management-server-port server properties  
* Can be accessed at ws://\<management-server-host\>:\<management-server-port\>, when enabled  
* Clients must authenticate to access the API  
  * Clients should supply an Authorization bearer token header with a server-specific secret, which is configured through the new management-server-secret server property  
  * Unauthorized requests will be rejected with a 401 Unauthorized error  
* Supports querying and updating of server state (players, allowlist, operators, settings, game rules)  
* Sends notifications on state changes (e.g. player joins, game rule updates)  
* Calling {"id":1,"method":"rpc.discover"} returns an API schema containing supported methods and notifications of the currently running server  
* The data generator will produce an API schema (in file json-rpc-api-schema.json) in the reports output folder, mirroring the contents returned by the rpc.discover API method  
* Uses namespaced methods, with minecraft being a reserved namespace (e.g. minecraft:players, minecraft:allowlist/add, minecraft:notification:players/joined)  
  * Can be extended via custom namespaces for additional methods and events  
* Contains the following core method groups: players, allowlist, operators, server (save, stop), server settings, game rules  
* Errors and error codes follow the [JSON-RPC 2.0 error object format](https://www.jsonrpc.org/specification#error_object)  
* The TLS protocol is enabled by default on the server, but can be configured through the new management-server-tls-enabled and management-server-tls-keystore server properties  
* Example method call:  
  * Request: {"method":"minecraft:allowlist/add","id":1,"params":\[\[{"name":"jeb\_"}\]\]}  
  * Response: {"jsonrpc":"2.0","id":1,"result":\[{"id":"853c80ef-3c37-49fd-aa49-938b674adae6","name":"jeb\_"}\]}  
* Example notification: {"jsonrpc":"2.0","method":"minecraft:notification:players/joined","params":\[{"id":"853c80ef-3c37-49fd-aa49-938b674adae6","name":"jeb\_"}\]}  
* Example error:  
  * Request: {"method":"minecraft:foo/bar":"id":1}  
  * Response: {"jsonrpc":"2.0","id":1,"result":{"jsonrpc":"2.0","id":1,"error":{"code":-32601,"message": "Method not found","data":"Method not found: minecraft:foo/bar"}}}

##### **New Server Properties**

**enable-code-of-conduct**

* If set to true, the server will look for code of conduct files in a codeofconduct folder (in the same directory as the server.properties file) and display their contents to players when they connect, according to their selected language  
  * Each file in this folder should have a name of format \<language\_code\>.txt  
  * The language of the code of conduct shown will attempt to match the language selected by connected players'  
  * If no file exists for a particular language, then the en\_us.txt file will be used instead  
  * If the en\_us.txt file does not exist, then an arbitrary available file is used instead  
* Type: boolean  
* Default value: false

**management-server-enabled**

* Controls whether the Minecraft Server Management Protocol is enabled  
* Type: boolean  
* Default value: false

**management-server-port**

* Controls the port that the Minecraft Server Management Protocol is started on  
  * If set to 0, an available port is automatically assigned each time the server is started  
* Type: integer  
* Default value: 0

**management-server-host**

* Controls the host that the Minecraft Server Management Protocol is started on  
* Type: string  
* Default value: localhost

**management-server-secret**

* Sets the server secret of the Minecraft Server Management Protocol for clients to authenticate with  
* Type: string  
* Must be exactly 40 alphanumeric characters (A-Z, a-z, 0-9) or be empty  
  * If empty, the server secret is automatically generated

**management-server-tls-enabled**

* Controls whether TLS protocol is applied to the Minecraft Server Management Protocol server  
* Type: boolean  
* Default value: true

**management-server-tls-keystore**

* Sets the keystore file used for the TLS protocol in the Minecraft Server Management Protocol server  
  * The keystore file must be in PKCS12 format  
  * The keystore password can be set in the following ways, in order of priority:  
    * Environment variable: MINECRAFT\_MANAGEMENT\_TLS\_KEYSTORE\_PASSWORD  
    * JVM argument: \-Dmanagement.tls.keystore.password=  
    * Server property: management-server-tls-keystore-password=  
  * if the property is set to an empty string and the TLS protocol is enabled in the management server, then the dedicated server will not start  
* Type: string  
* Default value: empty string  
* Example: management-server-tls-keystore=path/to/keystore.p12

**management-server-tls-keystore-password**

* Sets the keystore password used for the keystore file in the TLS protocol in the Minecraft Server Management Protocol server  
* Default value: empty string  
* Type: string

**status-heartbeat-interval**

* Controls the interval that the Minecraft Server Management Protocol sends heartbeat notifications to connected clients  
  * If set to 0, no notifications are sent  
* Type: integer  
* Default value: 0

# Changes

* The game now requires OpenGL version 3.3, instead of 3.2  
* A dimension that has any player activity, forceloaded chunks, active portals, or ender pearls in flight will now be considered "active" and keep processing chunks and entities  
  * Previously, this would only apply if a player was in the dimension or a chunk was forceloaded  
* The concept of fixed "spawn chunks" no longer exists; the following chunks are now fully loaded before a player joins or the server starts:  
  * Forceloaded chunks, using the forceload command  
  * Chunks active due to portal activity  
  * Chunks containing an ender pearl belonging to an active player  
  * A small area of chunks around each player  
  * Chunks required to assign the global world spawn, on world creation only  
* Updated the debug screen:  
  * Can now be accessed from anywhere in the game, instead of only while in a world  
  * Now displays less information by default  
  * Pressing F3+F6 now opens a new Debug Options screen, which can be used to configure which debug information should be displayed on the screen  
    * For each item, it can be set to one of the following options:  
      * Off – is never shown  
      * In F3 – visible only when the debug screen is opened  
      * Always – always visible, even when the debug screen is closed  
    * Items can be searched through  
    * A preset profile can also be selected, which automatically configures certain debug information to be shown, with the following available preset profiles:  
      * Default – resets everything to the default state  
      * Performance – shows simple performance metrics, with the FPS meter always visible on the screen  
    * Some debug features that were previously available, such as chunk border rendering or entity hitbox rendering, can now be configured to be shown through this screen  
    * Some debug features not previously available to end users, such as octree visualization, can now be configured to be shown through this screen  
  * The current state of the screen is now saved between game launches  
* Improved entity rendering order for significantly better performance  
* Updated pack versions:  
  * Now each support a minor version, which is incremented if the pack version is backwards-compatible with all pack versions with the same major version  
    * As a result, all packs that share the same major version will now be compatible with each other  
* Updated the pack.mcmeta pack file, for data pack versions 82.0 and higher, and for resource pack versions 65.0 and higher:  
  * The pack.pack\_format field is now optional  
  * The pack field and elements of the overlays.entries field now each have the following new fields:  
    * min\_format – specifies the minimum supported pack version  
    * max\_format – specifies the maximum supported pack version  
    * Types of each field:  
      * integer, integer\[1\] – specifies a major pack version; the minor pack version is assumed to be 0  
      * integer\[2\] – specifies a major and minor pack version  
  * Removed the following fields: pack.supported\_formats, overlays.entries\[\].formats  
* The display field of a model now accepts the key on\_shelf, which controls the display of the model when its corresponding item is placed on a shelf  
  * The vertical translation specified will be ignored if the align\_items\_to\_bottom field of the shelf's block entity is set to false  
* Particles outside the player's view are no longer rendered, which can provide a performance improvement in some cases  
* Some debug features that were previously removed during compilation are now preserved and can be used by users  
  * Individual values can be enabled with JVM properties  
    * First, a global debug flag must be enabled with \-DMC\_DEBUG\_ENABLED or \-DMC\_DEBUG\_ENABLED=true  
    * Then, a specific debug feature can be enabled, for example: \-DMC\_DEBUG\_BRAIN or \-DMC\_DEBUG\_BRAIN=true  
    * To get a full list of all available debug properties, add \-DMC\_DEBUG\_PRINT\_PROPERTIES  
  * Is an advanced feature and is not guaranteed to function properly  
* Test instance blocks now preserve error markers between world reloads  
* Removed the following server properties: allow-nether, spawn-monsters, enable-command-block, pvp  
  * Each removed property has been replaced with a corresponding new game rule



# 163 Bug Fixes

* [MC-383](https://bugs.mojang.com/browse/MC-383) - In the world selection screen, world names/versions/timestamps can overflow the list to the right
* [MC-26334](https://bugs.mojang.com/browse/MC-26334) - Chat UI is forcibly cleared when killed
* [MC-36783](https://bugs.mojang.com/browse/MC-36783) - Item frames/Glow item frames don't change their hitbox if they contain a map
* [MC-46503](https://bugs.mojang.com/browse/MC-46503) - You can retain entities' shaders by running the "/kill" command while in spectator mode
* [MC-46634](https://bugs.mojang.com/browse/MC-46634) - Thunder volume is not affected by weather volume settings
* [MC-59413](https://bugs.mojang.com/browse/MC-59413) - Water and lava can drip from barriers
* [MC-69216](https://bugs.mojang.com/browse/MC-69216) - Switching to spectator mode while fishing keeps rod cast
* [MC-73881](https://bugs.mojang.com/browse/MC-73881) - Summoning monsters in peaceful difficulty spawns monster for 1 tick
* [MC-89142](https://bugs.mojang.com/browse/MC-89142) - Changing jump key to "Enter" let player jump after completing chat line
* [MC-94610](https://bugs.mojang.com/browse/MC-94610) - Missing loot table entries for mob heads from charged creepers
* [MC-98200](https://bugs.mojang.com/browse/MC-98200) - All sound sliders except master are ignored by high-volume /playsound
* [MC-98322](https://bugs.mojang.com/browse/MC-98322) - Flying after shifting between Creative/Spectator
* [MC-99785](https://bugs.mojang.com/browse/MC-99785) - You can leash entities in spectator mode
* [MC-119417](https://bugs.mojang.com/browse/MC-119417) - A spectator can occupy a bed if they enter it and then are switched to spectator mode
* [MC-147784](https://bugs.mojang.com/browse/MC-147784) - Fletching table flashes crafting table's GUI for about a second upon right-clicking it in spectator mode
* [MC-163218](https://bugs.mojang.com/browse/MC-163218) - Players with the Sneak option set to "Toggle" can sneak while in GUIs
* [MC-165991](https://bugs.mojang.com/browse/MC-165991) - TNT explosion no longer shows additional smoke particles since 1.15 Pre-release 1
* [MC-173730](https://bugs.mojang.com/browse/MC-173730) - Shift-clicking water buckets against a waterloggable block doesn't place the water beside the waterloggable block
* [MC-174759](https://bugs.mojang.com/browse/MC-174759) - Dragon eggs can be teleported to a height below void
* [MC-183776](https://bugs.mojang.com/browse/MC-183776) - After switching game modes using F3+F4, you need to press F3 twice to toggle the debug screen
* [MC-183784](https://bugs.mojang.com/browse/MC-183784) - Visual bug to the Game Mode Switcher debug menu after resizing the window
* [MC-187850](https://bugs.mojang.com/browse/MC-187850) - "run\_command" click\_event doesn't work in written books if chat is hidden
* [MC-191669](https://bugs.mojang.com/browse/MC-191669) - Sprinting is disabled when switching your gamemode to spectator while sprinting into a block or general obstruction
* [MC-192907](https://bugs.mojang.com/browse/MC-192907) - The F3 debug menu cannot be toggled while chat is open
* [MC-196443](https://bugs.mojang.com/browse/MC-196443) - When reducedDebugInfo is true, hitting F3+B and F3+G would still tell the player in chat that they are being toggled, despite nothing happening
* [MC-197247](https://bugs.mojang.com/browse/MC-197247) - Using F3+D to clear pending lines keeps the previous delay for a new message
* [MC-203401](https://bugs.mojang.com/browse/MC-203401) - Double-tapping forward button to sprint cannot be disabled/reconfigured
* [MC-220842](https://bugs.mojang.com/browse/MC-220842) - Opening game mode switcher while spectating a mob with shader effect toggles the effect
* [MC-223142](https://bugs.mojang.com/browse/MC-223142) - Player can move while spectating a marker
* [MC-225088](https://bugs.mojang.com/browse/MC-225088) - Overworld surface is darker than before on low brightness
* [MC-232968](https://bugs.mojang.com/browse/MC-232968) - Spectators can prevent the closing animation of a chest/barrel when viewing it at the same time as a non-spectator
* [MC-234479](https://bugs.mojang.com/browse/MC-234479) - You can invite the same player multiple times to your realm even if they've already received an invitation or have already joined it
* [MC-234737](https://bugs.mojang.com/browse/MC-234737) - Typo in exception message: "EmtyPoolElement"
* [MC-235780](https://bugs.mojang.com/browse/MC-235780) - The beacon GUI incorrectly displays the "Beacon" tooltip when the mouse cursor is held over the "Done" or "Cancel" buttons
* [MC-236508](https://bugs.mojang.com/browse/MC-236508) - The title within the "Add Server" menu is displayed as "Edit Server Info"
* [MC-237016](https://bugs.mojang.com/browse/MC-237016) - The chat delay function continues to print messages despite the game being paused
* [MC-237590](https://bugs.mojang.com/browse/MC-237590) - The word "chunks" is improperly capitalized within the render and simulation distance sliders
* [MC-237843](https://bugs.mojang.com/browse/MC-237843) - Players can be idle kicked whilst viewing the end credits
* [MC-238146](https://bugs.mojang.com/browse/MC-238146) - When you switch to Spectator mode while sleeping, the night never skips
* [MC-238273](https://bugs.mojang.com/browse/MC-238273) - "Locked by another running instance of Minecraft" lacks punctuation
* [MC-249205](https://bugs.mojang.com/browse/MC-249205) - "minecraft.used:minecraft.potion" increases by a value of two when using water bottles to create mud in creative mode
* [MC-250062](https://bugs.mojang.com/browse/MC-250062) - Several strings throughout the game contain comma splices
* [MC-257540](https://bugs.mojang.com/browse/MC-257540) - Sheep eat half as often as they did before 21w39a
* [MC-259571](https://bugs.mojang.com/browse/MC-259571) - Last player game mode not saved after player dies or the game is reloaded
* [MC-259673](https://bugs.mojang.com/browse/MC-259673) - Tab selection works differently in world creation and statistics screens
* [MC-259692](https://bugs.mojang.com/browse/MC-259692) - Sneaking and sprinting states are activated or toggled unexpectedly when releasing their input keys while an interface was just previously closed
* [MC-259935](https://bugs.mojang.com/browse/MC-259935) - It can snow even when biome precipitation is set to NONE
* [MC-260591](https://bugs.mojang.com/browse/MC-260591) - 'execute on origin' and 'execute on owner' fail to find the targeted entity when it is in a separate dimension
* [MC-260822](https://bugs.mojang.com/browse/MC-260822) - The "Done" and "Cancel" buttons within the beacon GUI no longer display tooltips when the mouse cursor is held over them
* [MC-260920](https://bugs.mojang.com/browse/MC-260920) - Statistics screen columns are not accessible through keyboard navigation
* [MC-261387](https://bugs.mojang.com/browse/MC-261387) - Redundant block\_predicate\_filter check in mangrove tree placement
* [MC-262000](https://bugs.mojang.com/browse/MC-262000) - Unused texture: misc/white.png
* [MC-263597](https://bugs.mojang.com/browse/MC-263597) - The ender dragon's respawning noise cannot be turned down by the Hostile Mobs volume slider
* [MC-265290](https://bugs.mojang.com/browse/MC-265290) - Elements within the command block interface are not selected in order when using the TAB key
* [MC-269838](https://bugs.mojang.com/browse/MC-269838) - Pumpkin seeds drop from sheared pumpkins is hardcoded
* [MC-269839](https://bugs.mojang.com/browse/MC-269839) - Honeycomb drop from sheared bee nests and beehives is hardcoded
* [MC-270172](https://bugs.mojang.com/browse/MC-270172) - Client and server desync for hooked players when changing gamemode to spectator
* [MC-270190](https://bugs.mojang.com/browse/MC-270190) - Hovering over banner patterns in the loom UI does not display tooltips
* [MC-270669](https://bugs.mojang.com/browse/MC-270669) - Incorrect argument order in translation key argument.block.property.novalue
* [MC-270918](https://bugs.mojang.com/browse/MC-270918) - Loot tables for mob heads are missing copy\_components loot function for custom\_name
* [MC-272584](https://bugs.mojang.com/browse/MC-272584) - Fireballs redirected by explosions caused by player owned entities no longer carry player ownership
* [MC-273943](https://bugs.mojang.com/browse/MC-273943) - Sweet berries drop from harvested bushes is hardcoded
* [MC-275244](https://bugs.mojang.com/browse/MC-275244) - Setting "width\_smoothness" in file configured\_carver to 0 causes the game to freeze or crash
* [MC-275432](https://bugs.mojang.com/browse/MC-275432) - Subtitles are difficult to see within screens
* [MC-276431](https://bugs.mojang.com/browse/MC-276431) - Dragon egg teleports above the build height limit and deletes itself
* [MC-276568](https://bugs.mojang.com/browse/MC-276568) - Mipmapped versions of the armor trims atlas are generated
* [MC-276629](https://bugs.mojang.com/browse/MC-276629) - Glow berries drop from cave vines appears to be hardcoded
* [MC-276759](https://bugs.mojang.com/browse/MC-276759) - Scute drop from brushing armadillos is hardcoded
* [MC-276931](https://bugs.mojang.com/browse/MC-276931) - Enchanted books have the wrong rarity
* [MC-277447](https://bugs.mojang.com/browse/MC-277447) - Minecraft generates mipmapped textures for chests, but does not use them
* [MC-277450](https://bugs.mojang.com/browse/MC-277450) - Minecraft generates mipmapped textures for shulker boxes, but does not use them
* [MC-277470](https://bugs.mojang.com/browse/MC-277470) - Minecraft generates mipmapped textures for beds, but does not use them
* [MC-277471](https://bugs.mojang.com/browse/MC-277471) - Minecraft generates mipmapped textures for signs, but does not use them
* [MC-277473](https://bugs.mojang.com/browse/MC-277473) - Minecraft generates mipmapped textures for decorated pots, but does not use them
* [MC-277481](https://bugs.mojang.com/browse/MC-277481) - Minecraft generates mipmapped textures for banners, but does not use them
* [MC-277483](https://bugs.mojang.com/browse/MC-277483) - Minecraft generates mipmapped textures for shields, but does not use them
* [MC-277770](https://bugs.mojang.com/browse/MC-277770) - Processor type block\_age always modifies slabs property "type" to bottom
* [MC-278550](https://bugs.mojang.com/browse/MC-278550) - While flying in creative or spectator mode, the surface of water can prevent you from sprinting
* [MC-278965](https://bugs.mojang.com/browse/MC-278965) - Cherry Grove is not part of the #stronghold\_biased\_to tag
* [MC-279548](https://bugs.mojang.com/browse/MC-279548) - TNT minecart does not remember ignition source when exploding from a fall
* [MC-279793](https://bugs.mojang.com/browse/MC-279793) - Mounting horses, donkeys, mules, zombie horses, skeleton horses, and camels no longer forces you to face forward
* [MC-289348](https://bugs.mojang.com/browse/MC-289348) - Ender pearls stop loading chunks in The End after relog, if there are no players in that dimension
* [MC-295841](https://bugs.mojang.com/browse/MC-295841) - Interactive collision check path is broken
* [MC-296054](https://bugs.mojang.com/browse/MC-296054) - Fast non-projectile entity movements may fail to apply block effects from blocks around the starting position when moving in positive directions
* [MC-296055](https://bugs.mojang.com/browse/MC-296055) - Slow non-projectile entity movements may fail to apply block effects from origin block
* [MC-296057](https://bugs.mojang.com/browse/MC-296057) - Sideways non-projectile movements may fail to apply block effects from blocks around start of sideways motion
* [MC-296372](https://bugs.mojang.com/browse/MC-296372) - Teleport duration is unreliable as of 1.21.5
* [MC-296789](https://bugs.mojang.com/browse/MC-296789) - The color of text within the test instance block interface is inconsistent with other similar interfaces
* [MC-297126](https://bugs.mojang.com/browse/MC-297126) - "Failed to read field..." error spam when upgrading a 25w15a or 25w16a world
* [MC-297496](https://bugs.mojang.com/browse/MC-297496) - Text inside the middle of the java realms information box completely disappears when selected
* [MC-297593](https://bugs.mojang.com/browse/MC-297593) - Cauldrons now apply the effect of the substance they're filled with when contacted from the underside
* [MC-297898](https://bugs.mojang.com/browse/MC-297898) - Entering a dialog temporarily closes the chat and clears anything the player was currently typing
* [MC-298274](https://bugs.mojang.com/browse/MC-298274) - Certain invalid commands give "see below for error" with no additional information
* [MC-298605](https://bugs.mojang.com/browse/MC-298605) - When creating a Water World superflat world, the player spawns at the bottom of the sea
* [MC-298732](https://bugs.mojang.com/browse/MC-298732) - The cursor is no longer shown at the end of lines that aren't the final one
* [MC-298805](https://bugs.mojang.com/browse/MC-298805) - Axes disable shields even when the shield does not block the attack
* [MC-298883](https://bugs.mojang.com/browse/MC-298883) - The active world slot is not highlighted when selected via TAB navigation in Realms
* [MC-299067](https://bugs.mojang.com/browse/MC-299067) - Arrows can lose ownership on disconnection in multiplayer
* [MC-299115](https://bugs.mojang.com/browse/MC-299115) - Arrows lose their owner tag when deflected while the owner is offline
* [MC-299314](https://bugs.mojang.com/browse/MC-299314) - Breaking jukeboxes in certain ways doesn't stop the music
* [MC-299450](https://bugs.mojang.com/browse/MC-299450) - You can no longer double-click to select characters in the book and quill interface
* [MC-299451](https://bugs.mojang.com/browse/MC-299451) - Pages in book and quills are no longer automatically focused when switching pages
* [MC-299548](https://bugs.mojang.com/browse/MC-299548) - "run\_command" dialog actions don't work if chat is hidden
* [MC-299566](https://bugs.mojang.com/browse/MC-299566) - The cursor in the book and quill interface is positioned too far to the left
* [MC-299627](https://bugs.mojang.com/browse/MC-299627) - Entity interpolation for high speed projectiles is wildly inaccurate
* [MC-299628](https://bugs.mojang.com/browse/MC-299628) - Mounted players/mobs trigger sculk sensors on world load
* [MC-299770](https://bugs.mojang.com/browse/MC-299770) - Chunks loaded by ender pearls permanently unload upon player death even when enderPearlsVanishOnDeath is set to false
* [MC-299782](https://bugs.mojang.com/browse/MC-299782) - Zombie villagers saved in jigsaw structures forget their biome variant and profession upon world generation
* [MC-299823](https://bugs.mojang.com/browse/MC-299823) - Minecraft shaders cause C7050 warnings
* [MC-299837](https://bugs.mojang.com/browse/MC-299837) - Running two or more /rotate commands in the same tick only applies the rotation of the last command
* [MC-299872](https://bugs.mojang.com/browse/MC-299872) - The freezing overlay flashes when a freezing player touches fire
* [MC-299873](https://bugs.mojang.com/browse/MC-299873) - Selection boxes of plain messages within dialogs can get cut off
* [MC-299896](https://bugs.mojang.com/browse/MC-299896) - You can switch the worlds of expired realms to empty slots, which misleadingly prompts world creation despite no active realms subscription
* [MC-299913](https://bugs.mojang.com/browse/MC-299913) - The "You don't seem to have a Realm..." focusable text widget now has a black background
* [MC-300021](https://bugs.mojang.com/browse/MC-300021) - Some elements of the villager interface are now rendered above the cursor item
* [MC-300034](https://bugs.mojang.com/browse/MC-300034) - Dolphins can ride boats
* [MC-300044](https://bugs.mojang.com/browse/MC-300044) - Z-fighting occurs when the heads of copper golems intersect their bodies
* [MC-300045](https://bugs.mojang.com/browse/MC-300045) - The hand animation plays when right-clicking copper golems
* [MC-300046](https://bugs.mojang.com/browse/MC-300046) - The copper golem statue models in the inventory are partly cut off at the top
* [MC-300048](https://bugs.mojang.com/browse/MC-300048) - Copper golem statue item entities are rendered too large
* [MC-300049](https://bugs.mojang.com/browse/MC-300049) - The debug text is rendered on top of the debug options
* [MC-300051](https://bugs.mojang.com/browse/MC-300051) - The top part of worn leggings does not render
* [MC-300054](https://bugs.mojang.com/browse/MC-300054) - Double oxidized copper chest texture UV is missing pixels
* [MC-300057](https://bugs.mojang.com/browse/MC-300057) - Monsters still spawn for a tick when spawning them with a Spawn Egg in Peaceful
* [MC-300066](https://bugs.mojang.com/browse/MC-300066) - The Ender Dragon Spawn Egg has the "Disabled in Peaceful" note despite being able to spawn in Peaceful mode
* [MC-300067](https://bugs.mojang.com/browse/MC-300067) - Copper golems continue their chest searching animations while dying
* [MC-300074](https://bugs.mojang.com/browse/MC-300074) - No particles are produced when scraping oxidation off copper golems
* [MC-300077](https://bugs.mojang.com/browse/MC-300077) - Copper golems can interact with chests diagonally through solid blocks
* [MC-300082](https://bugs.mojang.com/browse/MC-300082) - Copper golems with the “NoAI” tag can adjust their rotation and spin
* [MC-300083](https://bugs.mojang.com/browse/MC-300083) - Copper golems with the “Silent” tag can still produce some sounds
* [MC-300085](https://bugs.mojang.com/browse/MC-300085) - Copper golem statues' poses are off-centered
* [MC-300089](https://bugs.mojang.com/browse/MC-300089) - Chests sometimes get stuck in inverted states after being interacted with by copper golems
* [MC-300092](https://bugs.mojang.com/browse/MC-300092) - F3 pie chart particle entries are missing names
* [MC-300094](https://bugs.mojang.com/browse/MC-300094) - Entities' held items no longer follow their arm movements when they have the invisibility effect
* [MC-300100](https://bugs.mojang.com/browse/MC-300100) - The “biome” debug option no longer has a space before its biome name
* [MC-300102](https://bugs.mojang.com/browse/MC-300102) - Shelves float when held in the player's hand in third person
* [MC-300103](https://bugs.mojang.com/browse/MC-300103) - Removing items from a shelf uses the "Item placed" caption
* [MC-300105](https://bugs.mojang.com/browse/MC-300105) - The player can drown while the game is paused
* [MC-300108](https://bugs.mojang.com/browse/MC-300108) - Villagers' and zombie villagers' clothes are incomplete
* [MC-300113](https://bugs.mojang.com/browse/MC-300113) - pack.mcmeta no longer accepts the longform object syntax in the supported\_formats field
* [MC-300119](https://bugs.mojang.com/browse/MC-300119) - Copper golems don’t always avoid dangerous blocks when pathfinding to chests
* [MC-300121](https://bugs.mojang.com/browse/MC-300121) - Interacting with a group of more than 3 connected shelves causes the game to crash
* [MC-300122](https://bugs.mojang.com/browse/MC-300122) - Certain parts of horse armor are sometimes invisible
* [MC-300124](https://bugs.mojang.com/browse/MC-300124) - All the oxidation states of the lightning rod are listed in the redstone tab of the creative inventory
* [MC-300129](https://bugs.mojang.com/browse/MC-300129) - Copper golems can't put items into chests above them
* [MC-300130](https://bugs.mojang.com/browse/MC-300130) - The "commands.summon.failed.peaceful" string doesn’t pluralize the word "Monster"
* [MC-300131](https://bugs.mojang.com/browse/MC-300131) - The "debug.entry.currently.inF3" string is improperly capitalized
* [MC-300134](https://bugs.mojang.com/browse/MC-300134) - Copper Golem Spawn Egg isn't alphabetized in the creative inventory
* [MC-300136](https://bugs.mojang.com/browse/MC-300136) - Held item positions are synchronized between entities of the same model in view
* [MC-300145](https://bugs.mojang.com/browse/MC-300145) - Players can use items while their inventories are open when the “Use Item/Place Block” option is set to “Toggle”
* [MC-300146](https://bugs.mojang.com/browse/MC-300146) - Exiting interfaces is incredibly difficult when the “Use Item/Place Block” option is set to “Toggle”
* [MC-300153](https://bugs.mojang.com/browse/MC-300153) - The inner cubes of slimes are sometimes invisible from the outside
* [MC-300155](https://bugs.mojang.com/browse/MC-300155) - Players can freeze while standing in powder snow despite the game being paused
* [MC-300164](https://bugs.mojang.com/browse/MC-300164) - The value of the "Sprint Window" option is not saved
* [MC-300165](https://bugs.mojang.com/browse/MC-300165) - Players are damaged when blocking attacks with shields that disable shields
* [MC-300166](https://bugs.mojang.com/browse/MC-300166) - When looking\_at\_block or looking\_at\_fluid is enabled in the debug options, FPS is impacted by server tick rate
* [MC-300168](https://bugs.mojang.com/browse/MC-300168) - All shelf variants are in the redstone section of the creative inventory
* [MC-300173](https://bugs.mojang.com/browse/MC-300173) - The Copper Chest textures' diagonal glint direction doesn't match the large chest variants' on some sides
* [MC-300180](https://bugs.mojang.com/browse/MC-300180) - Debug screen text now stays on the screen in F1
* [MC-300187](https://bugs.mojang.com/browse/MC-300187) - Interacting with items with certain components in the inventory causes a crash
* [MC-300193](https://bugs.mojang.com/browse/MC-300193) - Dying and respawning within the same dimension consistently shows a loading terrain screen
* [MC-300196](https://bugs.mojang.com/browse/MC-300196) - Local Difficulty debug information flickers if it is open while GUI is hidden
* [MC-300213](https://bugs.mojang.com/browse/MC-300213) - Copper golems' hitbox is too large to fit through open single doors
* [MC-300214](https://bugs.mojang.com/browse/MC-300214) - The shadows of baby mobs are now of the same size as those of their adult counterparts
* [MC-300222](https://bugs.mojang.com/browse/MC-300222) - Upon exiting the gamemode switcher (F3+F4) or debug options menu (F3+F5) while viewing the credits, the player does not resume viewing the credits and instead remains in the end in a phantom state until they relog
* [MC-300229](https://bugs.mojang.com/browse/MC-300229) - Z-fighting on antenna when putting certain blocks above a copper golem statue
* [MC-300235](https://bugs.mojang.com/browse/MC-300235) - First number in E counter is always stuck at 0
* [MC-300245](https://bugs.mojang.com/browse/MC-300245) - Any double chests variant doesnt play any sound when a copper golem interacts with the right part of the chest specifically
* [MC-300248](https://bugs.mojang.com/browse/MC-300248) - Subtitles/closed captions obstruct the inventory UI
* [MC-300249](https://bugs.mojang.com/browse/MC-300249) - Copper golem statue block outline is above the top of the block below
* [MC-300267](https://bugs.mojang.com/browse/MC-300267) - The miniature mobs inside spawners and trial spawners are sometimes lit incorrectly
* [MC-300275](https://bugs.mojang.com/browse/MC-300275) - Pausing while riding a strider on top of lava sets the player on fire
* [MC-300301](https://bugs.mojang.com/browse/MC-300301) - Shelves produce unusually high-resolution particles due to having a 32x32 texture
* [MC-300304](https://bugs.mojang.com/browse/MC-300304) - Comparators can stay active when measuring the pose of a copper golem statue block which is revived
* [MC-300305](https://bugs.mojang.com/browse/MC-300305) - When multiple people use fishing rods, an additional black line is drawn
* [MC-300340](https://bugs.mojang.com/browse/MC-300340) - Continuously clicking "Continue" on the welcome page resets the button disappearance animation progress
* [MC-300365](https://bugs.mojang.com/browse/MC-300365) - Copper golems inconsistently activate trapped chests
* [MC-300394](https://bugs.mojang.com/browse/MC-300394) - Oxidized/waxed oxidized copper golems, statue and entity versions, have the wrong pixels underneath their feet compared to their other counterparts
* [MC-300406](https://bugs.mojang.com/browse/MC-300406) - Updating open copper chests causes the chests to remain open
* [MC-300417](https://bugs.mojang.com/browse/MC-300417) - The copper pickaxe is not part of the #cluster\_max\_harvestables item tag
* [MC-300421](https://bugs.mojang.com/browse/MC-300421) - Inconsistent capitalization for F3+F5 description in F3+Q debug menu
* [MC-300440](https://bugs.mojang.com/browse/MC-300440) - Elytra consumes durability while the game is paused in singleplayer
* [MC-300441](https://bugs.mojang.com/browse/MC-300441) - Nether ambient sounds continue playing after leaving the Nether
* [MC-300457](https://bugs.mojang.com/browse/MC-300457) - Dialog is unescapable when action or exit\_action is set to run\_command with a command that would produce a signed chat message
* [MC-300462](https://bugs.mojang.com/browse/MC-300462) - Copper golems attached to leads still attempt to pathfind toward chests
* [MC-300464](https://bugs.mojang.com/browse/MC-300464) - The debug crosshair is rendered in third person
* [MC-300475](https://bugs.mojang.com/browse/MC-300475) - The Glowing outline now appears black on the fur model parts of invisible sheep
* [MC-300480](https://bugs.mojang.com/browse/MC-300480) - Worn copper golem statues are incorrectly rotated
* [MC-300501](https://bugs.mojang.com/browse/MC-300501) - Variants of copper chests are not included in the "Redstone Blocks" tab in the creative inventory whereas normal chests are
* [MC-300568](https://bugs.mojang.com/browse/MC-300568) - Copper golems don't open chests if given room to walk about
* [MC-300688](https://bugs.mojang.com/browse/MC-300688) - The iron chain's block/item ID is still "chain"
* [MC-300695](https://bugs.mojang.com/browse/MC-300695) - The sprint toggle state is now reset when viewing any screen
* [MC-300703](https://bugs.mojang.com/browse/MC-300703) - The underside of double copper chests does not use a merged texture
* [MC-300718](https://bugs.mojang.com/browse/MC-300718) - Player doesn't re-sneak automatically if they were sneaking before opening a GUI with Sneak Toggle set
* [MC-300722](https://bugs.mojang.com/browse/MC-300722) - Hoppers appear to randomly stop draining items through shelves
* [MC-300732](https://bugs.mojang.com/browse/MC-300732) - Loaded ender pearls are deleted when viewing the end credits for the first time when enderPearlsVanishOnDeath is true
* [MC-300739](https://bugs.mojang.com/browse/MC-300739) - Server crash when generating custom structures containing shelf blocks
* [MC-300744](https://bugs.mojang.com/browse/MC-300744) - The copper and iron nuggets are inverted and arranged incorrectly in the Creative mode inventory
* [MC-300746](https://bugs.mojang.com/browse/MC-300746) - Missing translation for copper wall torch
* [MC-300747](https://bugs.mojang.com/browse/MC-300747) - Cannot see villager's profession layer behind slime
* [MC-300762](https://bugs.mojang.com/browse/MC-300762) - Copper golems require at least 3 blocks of space above a chest to place anything
* [MC-300796](https://bugs.mojang.com/browse/MC-300796) - Harvesting from sweet berry bushes can drop more sweet berries than before
* [MC-300797](https://bugs.mojang.com/browse/MC-300797) - The glowing effect causes entities to render incorrectly inside of inventories
* [MC-300804](https://bugs.mojang.com/browse/MC-300804) - The Glowing outline is now always white on invisible entities that aren't the player, unless the player is in the same team
* [MC-300825](https://bugs.mojang.com/browse/MC-300825) - Entities with NaN motion cause clients to be kicked and softlocked
* [MC-300827](https://bugs.mojang.com/browse/MC-300827) - Pressing F3+Q in certain screens does not show help, despite F3 suggesting it
* [MC-300839](https://bugs.mojang.com/browse/MC-300839) - Disc sounds can be heard in another dimension
* [MC-300846](https://bugs.mojang.com/browse/MC-300846) - The /rotate command doubles the target entity's motion each time it is run
* [MC-300856](https://bugs.mojang.com/browse/MC-300856) - I-beam cursor in book signing screen has wrong color
* [MC-300888](https://bugs.mojang.com/browse/MC-300888) - pack.mcmeta no longer supports versions below 16 in the supported\_formats field
* [MC-300968](https://bugs.mojang.com/browse/MC-300968) - Flying state is not saved when reloading world
* [MC-300970](https://bugs.mojang.com/browse/MC-300970) - Missing sound for event: minecraft:entity.copper\_golem.shear
* [MC-300972](https://bugs.mojang.com/browse/MC-300972) - End light flashes sound can be heard while looking at the credits
* [MC-300975](https://bugs.mojang.com/browse/MC-300975) - Copper golems wear banners backwards
* [MC-300977](https://bugs.mojang.com/browse/MC-300977) - Clocks function in the recipe book/villager/crafter UI
* [MC-300983](https://bugs.mojang.com/browse/MC-300983) - The speed field in ExplosionParticleInfo codec is misspelled as "speec"
* [MC-300995](https://bugs.mojang.com/browse/MC-300995) - Game crashes when changing the F3 menu during world disconnection
* [MC-301004](https://bugs.mojang.com/browse/MC-301004) - Normal guardians are no longer able to enter boats
* [MC-301023](https://bugs.mojang.com/browse/MC-301023) - When a warden applies the darkness effect to you, the chat interface, item bar, and items become dark
* [MC-301025](https://bugs.mojang.com/browse/MC-301025) - End flash purplish light saturation is affected by brightness values
* [MC-301026](https://bugs.mojang.com/browse/MC-301026) - End flash purplish light becomes extremely saturated when the player is affected by darkness
* [MC-301030](https://bugs.mojang.com/browse/MC-301030) - Frosted ice now melts in the End
* [MC-301032](https://bugs.mojang.com/browse/MC-301032) - Bees in the End now hide in their hive when it's raining in the Overworld
* [MC-301048](https://bugs.mojang.com/browse/MC-301048) - In the "sitting" pose, the copper statue’s rod becomes shorter
* [MC-301101](https://bugs.mojang.com/browse/MC-301101) - Certain similar blocks are positioned differently on copper golems' heads
* [MC-301224](https://bugs.mojang.com/browse/MC-301224) - The first few stages of block cracks are not rendered on chests
* [MC-301225](https://bugs.mojang.com/browse/MC-301225) - Game crashes when quitting creating new world menu without other worlds created before
* [MC-301226](https://bugs.mojang.com/browse/MC-301226) - Block cracks no longer render on banners
* [MC-301228](https://bugs.mojang.com/browse/MC-301228) - Block cracks no longer render on heads and skulls
* [MC-301230](https://bugs.mojang.com/browse/MC-301230) - The word "resolve" is misspelled as "resolved" within the "commands.profile\_fetch.id.failure" string
* [MC-301231](https://bugs.mojang.com/browse/MC-301231) - Enchanting table book animations are not independent
* [MC-301236](https://bugs.mojang.com/browse/MC-301236) - Enchantment glint is no longer visible on held tridents
* [MC-301242](https://bugs.mojang.com/browse/MC-301242) - Enchantment glint is no longer visible on shields
* [MC-301273](https://bugs.mojang.com/browse/MC-301273) - Clicking on the join server hover button now selects the server, unless any server is already selected
* [MC-301290](https://bugs.mojang.com/browse/MC-301290) - Game crashes when trying to render a glowing enchanted item
* [MC-301295](https://bugs.mojang.com/browse/MC-301295) - TTF font provider oversample increases width of characters
* [MC-301328](https://bugs.mojang.com/browse/MC-301328) - Glowing item entities briefly turn white upon pickup
* [MC-301339](https://bugs.mojang.com/browse/MC-301339) - Miniature mobs inside spawners always render fully lit

