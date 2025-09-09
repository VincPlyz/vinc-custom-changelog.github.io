---
title: "25w36a Changelog"
date: "2025-09-09T16:31:55.685091"
draft: true
description: "Alle Änderungen und Neuigkeiten in Minecraft Snapshot 25w36a."
---

Snapshot 25w36a is out and it includes mannequins, a new technical entity that is spawned with commands and can be used as an NPC. Conflicting key binds will now function together allowing you to bind a key to multiple actions. And as always, this snapshot also includes technical tweaks and bug fixes.
Developer's Note: This snapshot brings a large change to how we collect and draw block entities and particles. We don't anticipate any change of behaviors so please keep an eye out and report anything suspicious as a bug, thank you!

Update: We have now released Snapshot 25w36b to fix some common crashes.
## Fixed bugs in 25w36b

* [MC-301745](https://bugs.mojang.com/browse/MC-MC-301745)- Placing an ender chest in the world crashes the game

* [MC-301749](https://bugs.mojang.com/browse/MC-MC-301749)- Multiplayer Crash.

## New Features

* World Borders can now be set per dimension

End Light Flashes

* While the Ender Dragon fog effect is active the flash source in the sky is not visible and the brightness of the light affecting the world is reduced

Accessibility

* Multiple key binds that have the same key assigned to them can now work together, while before only one would workFor example, you can now bindDtoJumpandStrafe Leftto jump and strafe left at the same timeThe red warning for assigning the same key to multiple key binds is changed to yellow

* The spectator hotbar menu key can now be reboundIt is part of a newSpectatorcategory in the Key Binds screen, alongside the pre-existingHighlight Playerskey bind

## Changes

* Formatting codes are now stripped from Code of Conduct files

World Border

* The World Border is now dimension-specificThis means that each dimension can have its own World Border size, position, etc.

Minor Tweaks to Blocks, Items and Entities

* Copper Torch and Copper Lantern colors are adjusted to make them more discernible to color blind players

UI

* Double-clicking a word in edit box now selects it

Block States

* Powered Shelves can now only connect to other Powered Shelves facing the exact same direction

Performance Improvements

* Particles outside of players view are not rendered anymore, which provides a performance improvement in some cases

## Technical Changes

* The Data Pack version is now 86.0

## Data Pack Version 86.0

* Added Mannequin entities

* The World Border is now dimension-specific

Mannequins
Added a new type of technical entity called minecraft:mannequin which can only be spawned with summon commands.

* A Mannequin is a Player Avatar without a connected Player

* Mannequins always show an "NPC" text where a Player'sbelow_scorescore would show

* Mannequins function as Living Entities - they can hold and wear equipment, have attributes & effects, take damage, etc

Data Fields:

* profile- Which profile to show on the entity. This is either a Player profile (same format as aminecraft:profilecomponent) or a Mannequin profile with the following fields:texture- Namespaced ID of the skin texture to useThe skin is specified relative to thetexturesfolder and with a.pngsuffixe.g.entity/player/wide/stevewill use the default wide Steve skincape- Optional namespaced ID of the cape texture to useWhen specified, uses the same format as thetexturefieldOmitting this field means the Mannequin has no capeelytra- Optional namespaced ID of the elytra texture to useWhen specified, uses the same format as thetexturefieldOmitting this field means the Mannequin uses the cape texture, or if that is also omitted, the default Elytra texture when wearing Elytramodel- Optional model type, one ofwideandslimIf omitted,wideis used

* hidden_layers- List of outer skin layers to hideValid entries:cape,jacket,left_sleeve,right_sleeve,left_pants_leg,right_pants_leg,hat

* main_hand- Which hand is the main hand of the Mannequn - one ofleftandright

Particles

* dragon_breathnow optionally takes apowerparameter (float, default1.0), which is multiplied onto its initial velocity, after all randomness

* instant_effectandeffectnow optionally takepower(float, default1.0) andcolor(rgb, default0xFFFFFF) parameters

* flashnow requires acolorparameter (argb)

## Resource Pack Version 68.0

Shaders

* The following unused shaders have been removed:core/position_color_lightmap.vshcore/position_color_lightmap.fshcore/position_color_tex_lightmap.vshcore/position_color_tex_lightmap.fsh

## Fixed bugs in 25w36a

* [MC-223142](https://bugs.mojang.com/browse/MC-MC-223142)- Player can move while spectating a marker

* [MC-225088](https://bugs.mojang.com/browse/MC-MC-225088)- Overworld surface is darker than before on low brightness

* [MC-234737](https://bugs.mojang.com/browse/MC-MC-234737)- Typo in exception message: "EmtyPoolElement"

* [MC-236508](https://bugs.mojang.com/browse/MC-MC-236508)- The title within the "Add Server" menu is displayed as "Edit Server Info"

* [MC-237590](https://bugs.mojang.com/browse/MC-MC-237590)- The word "chunks" is improperly capitalized within the render and simulation distance sliders

* [MC-238273](https://bugs.mojang.com/browse/MC-MC-238273)- "Locked by another running instance of Minecraft" lacks punctuation

* [MC-249205](https://bugs.mojang.com/browse/MC-MC-249205)- "minecraft.used:minecraft.potion" increases by a value of two when using water bottles to create mud in creative mode

* [MC-250062](https://bugs.mojang.com/browse/MC-MC-250062)- Several strings throughout the game contain comma splices

* [MC-250193](https://bugs.mojang.com/browse/MC-MC-250193)- Server log does not use the string representation of a player's GameProfile on a disconnect during encryption

* [MC-254052](https://bugs.mojang.com/browse/MC-MC-254052)- /locate doesn't work outside build limit

* [MC-254668](https://bugs.mojang.com/browse/MC-MC-254668)- Pressing Escape on the death screen's title screen warning respawns the player

* [MC-257792](https://bugs.mojang.com/browse/MC-MC-257792)- Output slot for trading menu is off-center

* [MC-258191](https://bugs.mojang.com/browse/MC-MC-258191)- Root system feature allows hanging root vertical span of 0, causing error

* [MC-259347](https://bugs.mojang.com/browse/MC-MC-259347)- Height limit warning message is shown when right-clicking the top of a block at the build height limit with a bucket

* [MC-262370](https://bugs.mojang.com/browse/MC-MC-262370)- Some multiplayer strings are untranslatable

* [MC-264962](https://bugs.mojang.com/browse/MC-MC-264962)- Strings that contain two inputs for a given action have inconsistent spacing and apostrophes

* [MC-265807](https://bugs.mojang.com/browse/MC-MC-265807)- Mobs don't drown if their Air NBT is less than -19

* [MC-277975](https://bugs.mojang.com/browse/MC-MC-277975)- The first line of the command execution warning in an item's tooltip is missing punctuation

* [MC-278435](https://bugs.mojang.com/browse/MC-MC-278435)- Mushroom Fields biome doesn't generate pumpkin patches despite being specified in vanilla datapack

* [MC-279123](https://bugs.mojang.com/browse/MC-MC-279123)- Some strings that reference Minecraft Realms use inconsistent or missing verb forms

* [MC-279153](https://bugs.mojang.com/browse/MC-MC-279153)- Some strings that mention the base values of attributes are missing articles

* [MC-279173](https://bugs.mojang.com/browse/MC-MC-279173)- The "chat.disabled.invalid_command_signature" string is missing an article before the word "Command"

* [MC-279174](https://bugs.mojang.com/browse/MC-MC-279174)- The "gamerule.spawnChunkRadius.description" string is missing an article before the word "Amount"

* [MC-279175](https://bugs.mojang.com/browse/MC-MC-279175)- Some multiplayer disconnection strings are missing articles and demonstratives

* [MC-279176](https://bugs.mojang.com/browse/MC-MC-279176)- The "gamerule.commandModificationBlockLimit.description" string is missing an article before the word "Number"

* [MC-279212](https://bugs.mojang.com/browse/MC-MC-279212)- Some narration strings are missing articles and possessive determiners

* [MC-295829](https://bugs.mojang.com/browse/MC-MC-295829)- Test instance block GUI uses "Batch" instead of "Environment"

* [MC-298605](https://bugs.mojang.com/browse/MC-MC-298605)- When creating a Water World superflat world, the player spawns at the bottom of the sea

* [MC-299105](https://bugs.mojang.com/browse/MC-MC-299105)- Tears and Lava Chicken music disc 'desc' translations are unused

* [MC-300055](https://bugs.mojang.com/browse/MC-MC-300055)- You get the advancement Wax On for changing the pose of a Copper Golem Statue while holding Honeycomb

* [MC-300088](https://bugs.mojang.com/browse/MC-MC-300088)- Items placed by a copper golem in a double chest do not update redstone comparators reading the right side of the double chest

* [MC-300109](https://bugs.mojang.com/browse/MC-MC-300109)- Lightning bolt does not remove oxidation from the lightning rod

* [MC-300169](https://bugs.mojang.com/browse/MC-MC-300169)- The CustomName tag of a copper golem statue is not kept when mined

* [MC-300192](https://bugs.mojang.com/browse/MC-MC-300192)- No darker trim for copper

* [MC-300201](https://bugs.mojang.com/browse/MC-MC-300201)- Breaking a copper golem statue with a pose does not retain its pose

* [MC-300416](https://bugs.mojang.com/browse/MC-MC-300416)- Copper golems' pathfinding to chests is biased to northwest

* [MC-300558](https://bugs.mojang.com/browse/MC-MC-300558)- Copper golems can open locked chests without an appropriate key item

* [MC-300729](https://bugs.mojang.com/browse/MC-MC-300729)- Incorrect or unusually obvious pixels on the weathered and exposed copper bars

* [MC-300961](https://bugs.mojang.com/browse/MC-MC-300961)- The armor layer on husks no longer reflects their larger size compared to other humanoids

* [MC-301099](https://bugs.mojang.com/browse/MC-MC-301099)- Copper chests worn on copper golems' heads are not visible

* [MC-301250](https://bugs.mojang.com/browse/MC-MC-301250)- Upon exiting the gamemode switcher (F3+F4) while viewing the credits, the player still does not resume viewing the credits and instead remains in the end in a phantom state until they relog

* [MC-301258](https://bugs.mojang.com/browse/MC-MC-301258)- Copper golem statues in the walking pose have a bit of their necks poking through their arms

* [MC-301259](https://bugs.mojang.com/browse/MC-MC-301259)- Shelf align_items_to_bottom in block entity data doesn't work

* [MC-301261](https://bugs.mojang.com/browse/MC-MC-301261)- The right arm of the copper golem statue isn't connected to its body

* [MC-301276](https://bugs.mojang.com/browse/MC-MC-301276)- The hand animation no longer plays when shearing copper golems

* [MC-301277](https://bugs.mojang.com/browse/MC-MC-301277)- Item frames with maps and paintings cannot share a corner anymore

* [MC-301278](https://bugs.mojang.com/browse/MC-MC-301278)- The code of conduct screen renders carriage return characters

* [MC-301283](https://bugs.mojang.com/browse/MC-MC-301283)- Sprint and sneak input can get 'stuck' if a screen is opened right as the input is pressed

* [MC-301310](https://bugs.mojang.com/browse/MC-MC-301310)- The “Transfer Now” button in the realms menu renders outside the selection box

* [MC-301312](https://bugs.mojang.com/browse/MC-MC-301312)- You cannot begin to use items while looking at copper golems

* [MC-301324](https://bugs.mojang.com/browse/MC-MC-301324)- Sitting copper golem statue nose is rotated incorrectly

* [MC-301330](https://bugs.mojang.com/browse/MC-MC-301330)- Malicious server can force client to remain stuck on code of conduct screen

* [MC-301374](https://bugs.mojang.com/browse/MC-MC-301374)- Evokers can now spawn in Peaceful difficulty

* [MC-301519](https://bugs.mojang.com/browse/MC-MC-301519)- Trying to use a command block while the "enableCommandBlocks" gamerule is set to false says "Command blocks are not enabled on this server" even if you're not on a server

* [MC-301523](https://bugs.mojang.com/browse/MC-MC-301523)- Some gamerule description strings consist of inconsistent concluding punctuation, redundantly include “or not”, and are grammatically incorrect

* [MC-301524](https://bugs.mojang.com/browse/MC-MC-301524)- The block breaking animation on banners now amplifies with each pattern applied

* [MC-301546](https://bugs.mojang.com/browse/MC-MC-301546)- Bells do not display ringing animation when another bell is nearby

* [MC-301577](https://bugs.mojang.com/browse/MC-MC-301577)- Block light sources produce shadows around themselves under skylight

* [MC-301619](https://bugs.mojang.com/browse/MC-MC-301619)- Game mode translation key is used in the console message sent when a player tries to switch their game mode without permission

## Get the Snapshot

Snapshots are available for Minecraft: Java Edition. To install the Snapshot, open up the [Minecraft Launcher](https://www.minecraft.net/content/minecraft-net/language-masters/download) and enable snapshots in the "Installations" tab.
Testing versions can corrupt your world, so please backup and/or run them in a different folder from your main worlds.
Cross-platform server jar:

* Minecraft server jar

Report bugs here:

* Minecraft issue tracker!

Want to give feedback?

* For any feedback and suggestions, head over to theFeedback site. If you're feeling chatty, join us over at theofficial Minecraft Discord.
