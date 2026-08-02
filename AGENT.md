# AGENT.md - Developer Rules & Guidelines

Guidelines and constraints for AI agents and developers working on the **Jangan Diam** portal.

For automated tools, project-scoped rules are also configured in [.agents/AGENTS.md](.agents/AGENTS.md).

---

## Technical Stack & Layout

- **Pages**:
  - [index.html](index.html) - Landing page & stats.
  - [archive.html](archive.html) - Filterable archives.
  - [detail.html](detail.html) - Individual Kamisan action details.
  - [timeline.html](timeline.html) - Timeline view.
  - [reference.html](reference.html) - Educational resources.
- **Technologies**: HTML5, Alpine.js, Tailwind CSS CDN (JIT configuration), Iconify-icon, AOS.
- **Styles**: Defined inside [main.css](assets/css/main.css) and inline classes.

---

## Local Development & Commands

- **Serve Website Locally**:
  ```bash
  python -m http.server 8000
  ```
- **Word Cloud Generation**:
  ```bash
  pip install -r process/requirements.txt
  python process/cloud.py
  ```

---

## Coding Rules & Workflows

### 1. Document Archive Maintenance
Refer to [process/PROMPT.md](process/PROMPT.md) for full instructions:
- Place materials in `process/[Nomor Aksi]/` with standard names: `selebaran.jpg`, `foto.jpg` or `refleksi.jpg`.
- Construct `input.json` and generate `result.json`.
- **Text Body**: Preserve verbatim as clean HTML (e.g., `<p>`, `<blockquote>`, `<ol>`, `<li>`, `<strong>`). Never summarize or truncate.
- **Insights**: Produce exactly 3 insights, each containing $\ge 150$ characters.
- **Categorization**: 
  - Identify whether it is a "Surat Terbuka" or standard "Selebaran".
  - Update `tags` and `casesReferred` by cross-checking with `data/tags.json` and `data/cases.json` to prevent duplicates.
- **Merge**: Append the final results to `data/archive.json` and update `data/statistics.json`.

### 2. Design System
- **Colors**: Sleek dark theme (`bg-pureblack`, `bg-offblack`, `bg-cardbg`, `border-darkborder`, `border-lightborder`, `text-subtext`).
- **Typography**: `Cormorant Garamond` (serif), `Inter` (sans), and `Space Mono` (mono).
- **Animations**: Maintain standard fade-in effects and smooth page transitions.
- **Signature Integrity**: Preserve comment-based signatures found at the top of main documents.

### 3. File Versioning & Cache Busting
- All HTML links to CSS (`main.css`), JS (`main.js`), and JS fetches to data files (`data/*.json`) must include a version query parameter to prevent browser caching (e.g. `?version=1`).
- When making modifications to `main.css`, `main.js`, or any JSON data files, **always increment** the `?version=X` query parameter in the files referencing them to ensure clients receive the latest changes.
