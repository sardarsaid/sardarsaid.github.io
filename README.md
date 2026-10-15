# Sardar Said — mechanical engineering portfolio

A buildless, responsive website prepared for **https://sardarsaid.github.io**. Includes the supplied V6 engine screenshots, resume PDF, public email, and confirmed personal project description. Interactive GLB models and the other project write-ups remain pending.

## Publish on GitHub Pages

1. Sign in to GitHub as **sardarsaid**. Create a public repository named **sardarsaid.github.io**. If it already exists, preserve its contents and review changes before replacing files.
2. Upload the **contents** of this folder into the repository root, not the enclosing `portfolio` folder or ZIP. `index.html` must be at the root beside `styles.css`, `app.js`, `content.js`, and `assets/`. Include `.nojekyll` (an empty file); `.gitkeep` files only preserve empty asset folders.
3. Commit the files to `main`.
4. Open **Settings → Pages → Build and deployment → Source → Deploy from a branch**. Choose **main** and **/(root)**, then Save.
5. Watch the deployment under Actions. When successful, open **https://sardarsaid.github.io**. Publication can take up to 10 minutes.
6. Later changes are published when committed to the selected branch. No npm installation, build command, or paid hosting is required.

Official guide: https://docs.github.com/en/pages/quickstart

## Personalize it

Edit `content.js` in a text editor or GitHub's file editor. Keep the JavaScript quotes and commas intact. Use `null` for anything not yet ready.

```js
resume: "assets/documents/resume.pdf",
email: "your-real-public-email@example.com",
```

The email above is an example only; replace it with your actual address. Add the real PDF before enabling its link. Edit the visible name, introductory copy, and background paragraph in `index.html` when ready.

For each project, upload approved files and change its fields in `content.js`, for example:

```js
model: "assets/models/v6-engine.glb",
image: "assets/images/v6-engine.webp",
imageAlt: "Describe what your actual screenshot shows",
role: "Describe your own contribution and distinguish it from the team's work.",
approach: "Explain a constraint, the options you considered, and why you chose the design.",
evidence: "State only results supported by your drawings, calculations, or tests."
```

Suggested model filenames: `v6-engine.glb`, `robotic-gripper.glb`, `land-speed-ev.glb`. Images are optional and do not need to match the model filename. File paths and capitalization must match exactly. Keep `model: null` until the model exists; the page will show a clean placeholder instead of a broken viewer. The EV section can use only an approved photo and write-up if CAD cannot be shared.

Useful material for each write-up:

- **V6 engine:** your scope, assembly organization, one design decision, section/exploded views, and any checks actually performed. A CAD assembly alone does not prove the engine works.
- **Robotic gripper:** intended task, mechanism choice, your iterations, and any measured travel or grip results with the test conditions. Do not imply testing occurred if it did not.
- **Purdue Land Speed EV:** dates and role, your subsystem and deliverables, collaborators' scope, approved pictures, and evidence tied specifically to your work. Publish only material you have permission to share.

## Interactive 3D: use GLB

This site uses Google's `<model-viewer>`, loaded only after a visitor selects **Load 3D model**. It supports orbit/zoom, reset, and optional auto-rotation. Rotation is off by default. The viewer is pinned to version 4.0.0 from Google's CDN. Font files also use Google Fonts, with local system fallbacks. Internet access is needed for the viewer library; model/library errors show a readable message.

**JT, STEP, SLDPRT, SLDASM, and Fusion design files are not directly supported by this viewer.** Export/convert to GLB; renaming a file extension does not convert it. Keep original CAD as your editable master. GLB is a visualization mesh, not the original parametric CAD model. Constraints, mates, simulation results, and motion behavior do not automatically become interactive engineering simulations.

Viewer documentation: https://modelviewer.dev/docs/

### SolidWorks → GLB

1. Open the part or resolved assembly; hide anything you do not want to publish. Save a copy for web export.
2. In supported installations, use **File → Save As → Extended Reality (*.GLB)**. Inspect Options and export geometry/appearances. Start with a static export.
3. If this option is absent in your version/license, export a mesh such as STL, then use Blender as below. STL discards materials and assembly semantics; rebuild presentation materials in Blender. For separate part colors, export parts separately if necessary.
4. Confirm geometry, units, orientation, and colors after export. SolidWorks' advanced XR features may require approved provider viewers; do not assume motion studies or exploded configurations will work in this portfolio. The current UI provides viewing controls, not animation controls.

Official export documentation: https://help.solidworks.com/2024/english/SolidWorks/sldworks/t_export_using_extended_reality.htm

### Fusion 360 → OBJ → Blender → GLB

1. In Fusion's Design workspace, right-click the component or body in the Browser → **Save As Mesh**.
2. Choose **OBJ**, choose the intended units (meters simplifies web scale), and select a suitable refinement. Export the component's bodies. Preserve accompanying material/texture files if produced. STL is a fallback but carries no appearance information.
3. In Blender, remove the default cube. Use **File → Import → Wavefront (.obj)** (or STL for an STL export).
4. Check a known dimension, orientation, and part alignment. OBJ/STL scale must be checked rather than assumed. Apply simple materials where necessary; inspect normals and curved surfaces.
5. Select the intended objects. Use **File → Export → glTF 2.0**, choose **glTF Binary (.glb)**, and enable the option to export selected objects if needed. Embed the necessary materials/textures.
6. Save the GLB under `assets/models/`, then set that project's `model` path in `content.js`.

Official references:
- Autodesk Save As Mesh: https://help.autodesk.com/view/fusion360/ENU/?contextId=MESH-SAVE-AS-MESH
- Blender glTF export: https://docs.blender.org/manual/en/5.1/addons/import_export/scene_gltf2.html

### Prepare models for the web

Use a simplified copy, remove hidden/internal hardware that does not serve the presentation, and reduce excessive tessellation. Aim for a few MB per model where practical; this is a performance target, not a hard viewer limit. Preserve curved surfaces and important details. Inspect the exported result before publishing and try it on a phone over a slower connection. GitHub uploads and repository storage have separate limits; keep web assets small rather than storing full CAD assemblies here.

## Preview and final checks

For a quick text/layout check, open `index.html` directly. For reliable model testing, serve this folder over HTTP (for example, if Python is installed, run `python -m http.server 8000` in this folder and open http://localhost:8000). Stop that local server with Ctrl+C when done. The published Pages site serves over HTTPS.

- Check the page at phone and desktop widths, keyboard navigation, anchor links, and expandable notes.
- Add the real resume and contact details before sharing with recruiters.
- Load each actual GLB, inspect it from all sides, and check reset and auto-rotate.
- Verify photo descriptions and that no placeholder wording is mistaken for a completed result.
- Review team-owned material before publishing. GitHub Pages assets are publicly downloadable; a viewer is not copy protection.

All project data lives in `content.js`; overall page copy is in `index.html`; presentation is in `styles.css`; viewer logic is in `app.js`. No analytics or form backend is included.
