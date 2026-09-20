# Powder Ridge

An original 3D browser skiing prototype inspired by the Xiaohongshu reference supplied by the user. All interface text is English. The geometry is generated in `game.js`; no extracted reference assets are used.

## Run

Run `node server.mjs` in this folder, then open http://127.0.0.1:5173. Node.js is the only development prerequisite. Three.js is bundled locally under its MIT license. Optional Google Fonts fall back to system fonts offline.

## Play

- A/D or left/right arrows: steer
- Space: jump
- Q/E: jump and spin left/right, or start a spin during an existing jump (complete a rotation before landing for 300 points)
- Shift or W: boost; release to recharge
- P/Escape: pause
- Stars: 100 points and a little boost energy
- Rocks: cause a fall and deduct 50 points. The skier stops at the impact location, falls over, then stands up after 2.2 seconds. A short recovery grace period prevents immediately hitting the same stone again; course progress and collected stars are retained.
- Ramps: launch higher jumps
- Finish the 1,800 m course to see results

Touch controls and an automatic Watch demo mode are included. Sound is synthesized locally and opt-in.

## Reference study

Source: https://www.xiaohongshu.com/explore/6aae4bd6000000002b001bf9

The author describes concept art, finding matching models and open animations, and assembling lighting/materials/scenery in Blender, followed by camera, animation, UI, sound, and combo iterations. They cite Mario Kart as visual inspiration. The video shows a rear-follow camera, stylized skier, snowy alpine village, gold stars, jump/spin feedback, speed, boost energy, distance, and collision recovery. The exact runtime, source code, physics parameters, and complete rules were not provided; this implementation approximates the visible behavior.

This prototype uses procedural meshes, a real-time Three.js renderer, simple arcade movement and proximity collisions, generated scenery, a short finite course, and synthesized sounds. It is not a reconstruction of the original source code. Blender is optional for a later custom modeling/animation pass; no additional tool installation is required to play or edit this version.
