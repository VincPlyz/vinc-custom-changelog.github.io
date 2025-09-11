---
title: "1.21.6-pre1"
date: 2025-08-27
showReadingTime: false
showWordCount: false
---

# 1.21.6-pre1

"Hey! This is the first pre-release of 1.21.6. From now on, you will mostly see us fixing bugs and the release schedule might include more than one pre-release per week. We are on the finish line for the second drop of the year!"

## Changes

- The Dried Ghast Block now emits a vibration frequency of 11 when its block state changes
- Shearing Saddles, Horse Armor, and Carpets now emits a vibration frequency of 6, along with the Unequip frequency of 4
- The Ambient Dried Ghast sounds are now adjusted under the Blocks sound option instead of the Ambient/Environment option
- A player riding a Happy Ghast can no longer completely fly through a Happy Ghast ridden by another player

## Technical Changes

- The Data Pack version is now 79
- The Resource Pack version is now 63

## Data Pack Version 79

- Dialogs can now configure if they pause the game and if they close after an action is taken
- Every dialog can now have inputs and can submit information
    - The definition of actions has been changed to accommodate that
    - The dedicated input dialog types have been removed, since they are redundant now
    - The order of elements is:
        - Body
        - Inputs
        - Actions
- The minecraft:custom click event has been expanded to carry full a NBT tag
- A new keybind called "Quick Actions" has been added to allow accessing content-configured dialogs

### Quick Actions Keybind

- A new keybind has been addded that allows users to access a set of dialogs
- Default key: G
- This feature is configured by minecraft:quick_actions dialog tag
    - If this tag is empty, the keybind does nothing
    - If this tag has a single element, the keybind will open this dialog
    - If this tag has multiple elements, the keybind will lead to minecraft:quick_actions dialog which (by default) lets user select one of the tag elements
        - If this dialog is removed, the keybind does nothing
- This option is intended to be used in custom content and by servers, so this tag is empty by default

### Common Dialog fields

New fields:

- pause - if the dialog screen should pause the game in single-player mode, default: true
- after_action - an additional operation performed on the dialog after click or submit actions, default: close
    - close - closes the dialog and returns to the previous non-dialog screen (if any)
    - none - does nothing, i.e. keeps the current dialog screen open
        - only available if pause is false to avoid locking the game in single-player mode
    - wait_for_response - replace the current dialog with a "Waiting for Response" screen
        - this option is intended to prevent users from sending multiple actions on slow connections
            - servers are expected to eventually replace this screen with a new dialog
        - to avoid accidental locking, a "Back" button will become active after 5 seconds
            - clicking this button will continue as if the dialog was closed (i.e. the game returns to the previous non-dialog screen, if any)
        - The "Waiting for Response" screen will unpause the game in single-player mode to avoid locking the game

### Dialog Types

#### Changed minecraft:multi_action, minecraft:server_links, minecraft:dialog_list

- Replaced field on_cancel with exit_action, holding an optional action
    - If exit_action is present, a button for it will appear in footer, otherwise the footer is not present
    - exit_action is also used for the Escape action

#### Removed minecraft:simple_input_form

- Since any dialog can now have inputs, this dialog can be replaced by minecraft:notice

#### Removed minecraft:multi_action_input_form

- Since any dialog can now have inputs, this dialog can be replaced by minecraft:multi_action (without any specified exit_action)

### Input Control Types

- To accomodate the new minecraft:custom click event, all inputs will now return either a string or an NBT tag, depending on context

#### minecraft:text

- Output values:
    - As template substitution: contents without modification
    - As tag: a string tag with contents without modification

#### minecraft:boolean

- Output values:
    - As template substitution: on_true when checked, on_false when unchecked
    - As tag: 1b when checked, 0b when unchecked

#### minecraft:number_range

- Output values:
    - As template substitution: text representation of current value
        - Whole numbers will be sent without decimal point
    - As tag: a float tag with current value

#### Dialog Body Types

Hover and click events on text components within bodies now work as expected

- Click events are handled by the dialog screen like any other action - that means it will also run the after_action

### Actions

- The format of actions has been changed due to the merging of plain and input dialogs
- After every action the dialog will always evaluate the contents of the after_action field (see above)

Fields:

- Kept fields: label, tooltip, width
- New field: action (replaces on_click and on_submit) - an action to perform when button is clicked, optional object with fields:
    - type - value from minecraft:dialog_action_type registry
    - >type-specific< - see below, depends on type

##### Static Dialog Action Types

All existing click_event actions (except for open_file) are included as dialog action types.

Uses same format as click_event on text components (but with action replaced with type) For example, when using show_dialog, entry for action button will look like:

```
{
    "label": "some label",
    "action": {
        "type": "show_dialog",
        "dialog": "some:id"
    }
}
```

##### minecraft:dynamic/run_command Action Type

- This action will build a run_command event using a provided macro template
- The macro will be expanded with string values from all inputs
    - For example, if the macro template is some_command $(some_input), the string value from the input with key of some_input will be used for the template expansion
    - Inputs not used in macro will be ignored, while macro parameters not matching any inputs will be replaced with an empty string

Fields:

- template - a string with a macro template to be interpreted as a command

##### minecraft:dynamic/custom Action Type

- This method will build a minecraft:custom event using all input values
- All input contents will be sent together inside a compound tag, with tag value of each input put under id from key field of that input
- Additional static fields can be added to payload

Fields:

- additions - fields to be added to payload, optional compound tag
- id - namespaced ID

## Resource Pack version 63

- Added oversized_in_gui item model field
- Introduced new player head special model type

### Item Models

- Item model definitions now have a boolean field oversized_in_gui which is false by default
    - If true, the item model will be allowed to be bigger than its item slot
    - If false, the item model will be clipped to the item slot size when being rendered in gui
    - This ability of items being rendered outside their slots should not be considered officially supported, it was temporarily restored as an exception since many servers are relying on it
    - At some point in the future we hope to replace it with an officially supported way of achieving similar functionality
- Introduced new item model minecraft:player_head to handle player profile texture loading and rendering
- Removed support for minecraft:profile from minecraft:head

##### minecraft:player_head special model type

- Renders a player head
- Uses profile from the minecraft:profile component to load a texture. Renders a default texture until the profile texture is fully loaded
- No fields

##### minecraft:head special model type

- No longer supports profile from minecraft:profile component to load a player texture
- Renders a default player texture when kind is player and no texture override is supplied
- Fields remain unchanged

## Befehle

- Neue Gamerule: `useLocatorBar` zum Aktivieren/Deaktivieren der Locator Bar.
    
- 3 Neue Attribute:
    
    - `waypoint_transmit_range`:
        
        - Wie weit der Waypoint einer Entity in der Locator Bar angezeigt wird.
        - Ist bei Spielern standardmäßig auf 60.000.000 Blöcke gesetzt (die ganze Welt).
    - `waypoint_receive_range`:
        
        - Wie weit eine Entity Waypoints empfangen kann.
        - Ist bei Spielern standardmäßig auf 60.000.000 Blöcke gesetzt (die ganze Welt).
    
    - `camera_distance`:
        - Erlaubt die distance der 3rd person camera anzupassen
        - Default: 4.0
- Neuer Command: `/waypoint`
    
    - Erlaubt es, Waypoints zu manipulieren.
        - `/waypoint list`:
            
            - Listet alle in der Welt existierenden Waypoints auf.
        - `/waypoint modify`:
            
            - Erlaubt es, die Farbe und Fade-In/Fade-Out Farbe/Range eines Waypoints einzustellen.
- Neuer Command: `/datapack create`
    
    - generiert ein simples Datapack.
- Neuer Command: `/version`
    
    - Sendet aktuelle serverseitige Versionsinformationen in den Chat.

## Änderungen

### Generell

- Die third-person kamera ist nun weiter rausgezoomt wenn man einen Ghast, Ender Dragon oder Giant reitet
    
- Die Bein Texture von Wölfen, Schafen und Schweinen ist nun gespiegelt
    

### Ambient Desert Block Sound Changes

- Ambient sand sounds müssen nun nicht mehr freien himmel über sich haben
    
- Ambient sand sounds spielen nun ein wenig seltener
    
- Terracotta blöcke spielen nun keine Sand sounds mehr ab
    
- Sand blöcke spielen nun keine Wind Sounds mehr ab
    
- Terracotta blöcke spielen nun keine Wind Sounds mehr ab
    

## Technische Änderungen

- Durch den Keybind F3 + V werden nun client-side versions informationen in den Chat gesendet

**Developer's Note**: _Der GUI-Rendering-Code wird in diesem Snapshot Cycle einem umfangreichen Refactoring unterzogen. Die in diesem Snapshot veröffentlichte Version ist nicht als endgültig zu betrachten und wird weiter überarbeitet._


 <pre>















































































</pre>



---