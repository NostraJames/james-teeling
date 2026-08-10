# james-teeling.com

Personal portfolio, presented as a streaming-service catalogue rather than a résumé site.
Projects are "titles" on category shelves; each opens a skimmable case study, with a link
through to the full long-form write-up.

Built from the **Builder Portfolio** design handoff (Organic design system, inverted into
warm dark theatre mode). Vanilla HTML/CSS/JS — no build step, deployed straight from
`main` by GitHub Pages.

## Structure

```
index.html               the catalogue page (nav, hero, shelves, modal, toolbelt, about, contact)
styles.css               design tokens + every component
script.js                hero rotation, filters, shelves, modal, scroll-spy
data/portfolio-data.js   THE CONTENT MODEL — projects, skills, tools, timeline, facts
projects/                long-form case studies (light theme) + base-styles.css
assets/photos/           project imagery used by the case studies
files/                   resume PDF
```

## Editing content

Almost everything lives in `data/portfolio-data.js`. Adding a project means adding one
object to `PROJECTS`:

| Field | Notes |
| --- | --- |
| `id` | slug — also the deep link, `#/work/<id>` |
| `initial` | single character used as the ghosted poster glyph |
| `badge` | pill on the poster (`Shipped`, `0 → 1`, `Weekend`, `App Store`, `In build`) |
| `cat` | shelf key — must match a `CATEGORIES` entry |
| `bg` | `linear-gradient(155deg, A, B)` — pick a pair from the Organic ramps |
| `metrics` | exactly 3, rendered as tiles |
| `sections` | 1–4, in narrative order; `pull` is optional |
| `href` | link to the full case study page, or `null` |
| `extra` | optional second link (App Store, GitHub) |

`FEATURED` is the hero rotation pool (by id, in order). `CATEGORIES` drives both the
filter chips and the shelves.

## Local preview

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly works too — the data
file is a plain script, not an ES module.)
