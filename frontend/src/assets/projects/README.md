# Project screenshots (auto-loaded)

Drop screenshots here and they appear automatically on the matching project's
detail page — **no code changes needed**.

## How to add images

1. Find the project's `id` in [`src/data/projects.ts`](../../data/projects.ts).
   Example: the Enterprise ERP System has `id: "enterprise-erp-system"`.

2. Put your screenshots in a folder with that exact name:

   ```
   src/assets/projects/<project-id>/
   ```

   e.g. `src/assets/projects/enterprise-erp-system/`

3. Name the files so they sort in the order you want them shown. A numeric
   prefix is the easiest way:

   ```
   01-dashboard.png
   02-ai-assistant.png
   03-inventory.png
   04-reports.png
   ```

   The prefix (`01-`) is stripped from the on-page caption, so
   `02-ai-assistant.png` shows as **"Ai assistant"**.

4. Save. Vite picks them up and the project page scrolls through all of them.

## Notes

- Supported formats: `png`, `jpg`, `jpeg`, `webp`, `avif`, `gif`, `svg`.
- Folder name **must** match the project `id` exactly.
- A project with no folder here falls back to its single placeholder mockup.
- The loader lives in [`src/data/projectGallery.ts`](../../data/projectGallery.ts).
