# design.md: dark streaming-discovery UI

Reference: https://reelix.ac (reviewed October 2026). This file tells OpenCode what to build and how it should look and behave. Read the whole thing before writing code.

---

## 0. Read this first

### What is verified and what is not

I read the reference site's rendered text, link structure, page titles and meta tags across 19 page types. I could not read its stylesheet or see a rendered screenshot. So:

- **[observed]** means it came straight from the site: routes, copy, page structure, section order, counts, meta tags.
- **[recommended]** means it is my design judgment for how to realise what was observed. Colors, type, spacing, radii and motion are almost entirely in this bucket.

Only two color values are verified: the page background `#15171c` (the `theme-color` meta tag) and `#d7dee2`, which the site passes to its video player as a theme color. Everything else in the palette is a considered recommendation in the same cool, near-black family.

If you have screenshots of the reference, put them next to this file and let them override any [recommended] value.

### Not inspected
- TV show detail pages (`/tv/...`) returned HTTP 500 during review. Design them by extension from the movie detail page (section 6.7).
- The TV watch page (episode picker), the sign-in dialog, the search results view and the language menu were not reachable. Specified by extension below.

### Scope and sourcing
This spec covers the visual and interaction layer only.

- Use your own product name, logo, tagline and copy. Placeholders look like `{{BRAND}}`. Do not reuse the reference's wordmark, share-image or hero line.
- Metadata and artwork come from the TMDB API under your own key. TMDB's terms require attribution: show "This product uses the TMDB API but is not endorsed or certified by TMDB." in the footer.
- The video player is a slot (section 6.8). Wire it to sources you have the right to show: your own catalog, trailers, or licensed partners.
- Streaming-provider tiles use provider logos. Check each provider's brand guidelines, or use plain text tiles.

---

## 1. Product feel

A quiet, content-first dark interface. Almost everything is neutral so the poster artwork supplies the color. No ads, no sign-up wall, no clutter: the promise is "find something and press play."

Principles:
1. Posters are the hero. Chrome stays low-contrast and out of the way.
2. One accent at most. The reference is effectively monochrome.
3. Dense but calm. Long rails and big grids, with generous gutters and no decorative borders or gradients.
4. Fast to scan. Every poster carries the same three facts (rating, year, type) in the same place.
5. Works on a phone first. Safe-area aware, thumb-reachable navigation.

Voice: short, plain, lower-key. Sentence case everywhere. Buttons say what they do ("Watch", "Details", "View more", "Sign in").

---

## 2. Sitemap [observed]

| Route | Purpose |
|---|---|
| `/` | Home: hero search, rails, spotlight, collections, providers |
| `/movies` `/tv` `/anime` | Listing pages with sort + genre filters + pagination |
| `/trending` | Listing, "Movies and shows trending this week." |
| `/genres` | Listing with all genres as filter chips (`?genre=slug`) |
| `/genre/:slug` | Single genre listing with a one-line description |
| `/collections` | Grid of franchise collections |
| `/collection/:slug-:id` | Collection detail with its films |
| `/provider/:slug` | Titles on one streaming service |
| `/movie/:slug-:id` and `/tv/:slug-:id` | Title detail |
| `/watch/movie/:slug-:id` and `/watch/tv/:slug-:id` | Player page |
| `/similar/:type/:slug-:id` | Full "More like this" grid |
| `/person/:id` | Cast or crew member with filmography |
| `/my-reelix` | Personal hub (continue watching, list, history, recommendations) |
| `/watchlist` | Saved titles |
| `/settings` | Account, language, playback, data |
| `/about` `/dmca` `/privacy` `/terms` | Short static pages |

URL conventions:
- Title slugs are `kebab-title-` plus a short opaque id (for example `spider-man-brand-new-day-zx4rBSnmm0vp`).
- Listing pages take `?sort=popular|newest|oldest|rating`, `?genre=`, `?page=`. Pagination stops at page 10.
- Home rail "View more" links go to the matching listing (Trending to `/trending`, New releases to `/movies?sort=newest`, Top rated to `/trending?sort=rating`, provider rail to `/provider/:slug`).

Page titles follow `Page name | {{BRAND}}`. Detail pages use the title and year.

---

## 3. Design tokens

All values [recommended] unless marked.

```css
:root {
  color-scheme: dark;

  /* Surfaces */
  --bg:             #15171c;  /* [observed] theme-color */
  --surface:        #1c1f26;  /* header, panels, inputs */
  --surface-raised: #242830;  /* chips, menus, hovered inputs */
  --surface-hover:  #2d323c;
  --scrim:          rgba(21, 23, 28, 0.72);

  /* Lines */
  --line:           rgba(255, 255, 255, 0.08);
  --line-strong:    rgba(255, 255, 255, 0.16);

  /* Text */
  --text:           #eef0f3;
  --text-dim:       #a4abb7;
  --text-faint:     #6d7480;

  /* Accent: the only accent. Cool light grey-blue. */
  --accent:         #d7dee2;  /* [observed] the player theme color */
  --on-accent:      #15171c;

  /* Semantic */
  --rating:         #f5c451;  /* star icon only */
  --danger:         #ff6b6b;
  --focus-ring:     0 0 0 2px var(--bg), 0 0 0 4px var(--accent);

  /* Shape */
  --r-poster: 10px;
  --r-control: 10px;
  --r-input: 12px;
  --r-panel: 16px;
  --r-pill: 999px;

  /* Spacing scale (4px base) */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 72px;

  /* Layout */
  --container: 1440px;
  --gutter: 16px;            /* 24px at 768+, 40px at 1200+ */
  --header-h: 64px;          /* 56px on mobile */
  --tabbar-h: 64px;          /* mobile only, plus safe-area inset */

  /* Motion */
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --t-fast: 120ms;
  --t-base: 200ms;
}
```

The palette is deliberately monochrome. The accent is a pale, cool grey, so the primary button is a light fill with dark text, not a saturated brand color. If you add a brand color, add exactly one and use it only for the primary action and the selected state.

### Typography [recommended]

One sans-serif family. Pick a clean neutral sans with real weight range (Inter, Geist or similar) and load it as a variable font with `font-display: swap`. Fall back to `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Home hero H1 | `clamp(2rem, 5vw, 3.5rem)` | 700 | line-height 1.05, letter-spacing -0.02em, left aligned |
| Page H1 | 2rem | 700 | -0.01em |
| Rail / section H2 | 1.25rem | 600 | |
| Spotlight / detail title | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | |
| Body / synopsis | 1rem / 1.6 | 400 | max-width 68ch, `--text-dim` |
| Card title | 0.875rem / 1.3 | 500 | clamp to 2 lines |
| Meta line | 0.75rem | 400 | `--text-dim`, tabular numerals |
| Chip / tab | 0.875rem | 500 | |
| Button | 0.9375rem | 600 | |

Wordmark [observed]: the name is set in two parts, a regular-weight first half and a bold second half, with no icon. Recreate that weight contrast with your own name.

Arabic is one of the subtitle languages [observed], so make sure the layout holds up under `dir="rtl"` for any user-generated or localized text.

---

## 4. Layout system

- Page container: `max-width: var(--container)`, centered, horizontal padding `var(--gutter)`.
- Vertical rhythm: sections separated by `--s-7` (48px) on desktop, `--s-6` on mobile. Section heading to content: `--s-4`.
- Header is sticky. Content padding-top equals the header height.
- Mobile: add `padding-bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom))` so the tab bar never covers content.

Viewport meta to use [observed]:
`width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=overlays-content`

Also set `<meta name="theme-color" content="#15171c">` and `<meta name="color-scheme" content="dark">`.

### Poster grid
Posters are 2:3. Listing pages show **32 titles per page** [observed], which divides evenly into 8, 4 and 2 columns.

| Viewport | Columns |
|---|---|
| < 480px | 2 |
| 480 to 767px | 3 |
| 768 to 1023px | 4 |
| 1024 to 1439px | 6 |
| 1440px and up | 8 |

Gap: 12px on mobile, 16px on tablet, 20px on desktop.

### Rail (horizontal scroller)
- Home rails hold about 24 items [observed].
- Item width: 140px mobile, 160px tablet, 180px desktop. `scroll-snap-type: x proximity`, scrollbar hidden.
- Desktop: round arrow buttons appear at the edges on hover or focus. Mobile: swipe only.
- The right edge fades out with a short gradient mask so it is clear the row continues.

---

## 5. Global chrome

### 5.1 Header [observed structure]
Order, left to right: wordmark (links home), primary nav (Home, Movies, TV Shows, Anime, Trending, My Reelix), then on the right a language button showing the current code ("EN") and a "Sign in" button.

Styling [recommended]: sticky, `--bg` at 80% opacity with `backdrop-filter: blur(12px)`, 1px bottom border `--line`. Nav links are `--text-dim`, become `--text` on hover, and the current page gets `--text` plus a 2px `--accent` underline offset 8px below the label. "Sign in" is a small outlined button. On mobile the header shows only the wordmark, language and Sign in.

A "Skip to content" link is the first focusable element [observed]; it jumps to `#main-content` and is visible on focus.

### 5.2 Mobile tab bar [inferred]
The nav list appears more than once in the document, and the viewport uses `viewport-fit=cover`, which points to a bottom tab bar on phones. Build it: fixed to the bottom, six destinations (the same as the header nav), icon above a 10 to 11px label, `--surface` background, top border `--line`, padding-bottom from `env(safe-area-inset-bottom)`. The active tab uses `--accent`.

### 5.3 Footer [observed]
A single row of small text links: About, DMCA, Privacy, Terms of use, Settings. Place the TMDB attribution line under it. Keep it quiet: `--text-faint`, 0.8125rem.

---

## 6. Pages

### 6.1 Home `/` [observed order]

1. **Hero**
   - H1: one short, emotional line (the reference uses a sleep-themed line; write your own).
   - A prompt line under it, phrased as a question ("What do you want to watch?" in the reference), attached to a large search field.
   - Quick genre chips under the search: Action, Comedy, Anime, Crime, then a "More" chip linking to `/genres`.
   - Share strip: a short line ("Your friends need Reelix too"), four share icons (X, Facebook, Reddit, Telegram) and a running share count ("1282 shares"). Keep it compact and low-contrast; it is not a banner.
2. **My List** rail: heading, empty-state text "Save titles and they'll appear here.", and a "View more" link to `/watchlist`.
3. **Trending now** rail, "View more" to `/trending`.
4. **New releases** rail, "View more" to `/movies?sort=newest`.
5. **Popular anime** rail, "View more" to `/anime`.
6. **In the spotlight** (section 6.2).
7. **Collections** rail of collection tiles, "View more" to `/collections`.
8. **Streaming providers**: heading, one-line subtitle, then a row of logo tiles (section 7.8).
9. **Popular on {{provider}}** rail (the reference uses Netflix), "View more" to the provider page.
10. **Popular movies** rail, then **Popular TV shows** rail.
11. **Top rated** rail, "View more" to `/trending?sort=rating`.

The hero is flat: `--bg` with at most a very soft radial lift behind the search field. No hero image, no video, no gradient wash.

### 6.2 In the spotlight (featured block) [observed content, inferred behavior]
Heading "In the spotlight" with a subtitle ("The titles people are pressing play on right now") and an "Explore" link to `/trending`.

Holds four featured titles. Each has:
- a small status badge: Trending now, New Release, Most Watched, New Series
- the title (H3)
- meta: rating, year, type
- a synopsis, clamped to about 3 lines
- two buttons: "Details" (secondary, links to the detail page) and "Watch" (primary, links to the watch page)

Behavior [recommended]: one item visible at a time over its backdrop image, with a crossfade every ~8 seconds, pause on hover or focus, dots or a thin progress bar for position, and swipe on touch. Overlay a left-to-right gradient from `--bg` so text stays readable. This is the single place on the home page that gets a large image and motion; keep everything else still.

### 6.3 Listing pages `/movies /tv /anime /trending /genres /provider/:slug` [observed]
Top to bottom:
1. H1 (page name). Provider pages add a one-line subtitle ("Movies and shows streaming on X"). Trending adds "Movies and shows trending this week."
2. **Sort tabs**: Popular, Newest, Oldest, Top rated. One selected at a time, selection reflected in `?sort=`.
3. **Genre chips** (not on Trending or provider pages): "All" first, then the genres for that type. Wrap onto multiple lines on desktop; horizontal scroll on mobile.
   - Movies: Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Family, Fantasy, History, Horror, Music, Mystery, Romance, Science Fiction, Thriller, TV Movie, War, Western.
   - TV: Action & Adventure, Animation, Comedy, Crime, Documentary, Drama, Family, Kids, Mystery, News, Reality, Sci-Fi & Fantasy, Soap, Talk, War & Politics, Western.
   - Anime: Action, Action & Adventure, Adventure, Comedy, Crime, Drama, Family, Fantasy, Horror, Kids, Mystery, Romance, Sci-Fi & Fantasy, Science Fiction, Thriller.
4. Poster grid, 32 per page.
5. Pagination: `1 2 3 4 5 … 10`, current page filled. Previous and next arrows on mobile. Capped at 10 pages.

`/genres` is the combined version: sort tabs, a chip row with every genre, mixed movies and TV in the grid. `/genre/:slug` is a single genre with a one-line description ("Science Fiction movies.").

Sticky behavior [recommended]: the sort tabs and chips scroll away with the page. Keep it simple.

### 6.4 Collections `/collections` and `/collection/:slug` [observed]
- Index: "Back" link, H1 "Collections", a grid of 22 tiles. Each tile has the collection's artwork, its name, and a count ("4 films").
- Detail: "Back", a poster at left (stacked above the text on mobile), H1, a small "Movie collection" label, film count, a description paragraph, then an H2 "Collection parts" with a standard poster grid ordered by release.

### 6.5 Person `/person/:id` [observed]
"Back", portrait image, H1 name, department label ("Acting"), "Born" with date and birthplace, a biography (long, collapsible after ~6 lines on mobile), an attribution line under the bio when the text is from Wikipedia (CC-BY-SA), then an H2 for the department ("Acting") with a poster grid. The grid can be 50+ items, so paginate or lazy-load.

### 6.6 My Reelix `/my-reelix` and Watchlist `/watchlist` [observed]
- My Reelix: H1, then sections that fill as the user acts: Continue watching, My list, History, Recommendations. Signed-out and brand-new users see an explanatory empty state: "Press play, save a title, or like one. It shows up here." Do not show four empty rails; show one friendly empty block with a link to Trending.
- Watchlist: "Back", H1 "My Watchlist", poster grid, a "Clear" action at the top right. Empty state text: "Save titles and they'll appear here."

### 6.7 Title detail `/movie/:slug` (TV by extension) [observed for movies]
1. **Backdrop**: a full-width, large backdrop image behind the top section, darkened toward the bottom with a gradient into `--bg`.
2. A "Watch now" button, and a trailer area with a "Close trailer" control. The trailer plays inline in the backdrop area when requested; closing it returns to the still image.
3. Title (H2 in the reference; use a proper H1).
4. Action row: a prominent **Play** button, then a small numeric counter (probably likes) with an icon. Add a Save-to-list button here.
5. Meta row: rating (with star), year, runtime (`145m`), certification (`PG-13`).
6. Synopsis.
7. Facts list:
   - **Cast**: first ~12 names as links to person pages, then "and more…" which expands the full list.
   - **Director**: link.
   - **Genres**: comma-separated links to `/genre/:slug`.
   - **Country**.
8. **More like this** rail with "View more" to `/similar/...`.

TV detail by extension [recommended]: same layout, with Seasons count in the meta row, a season dropdown and an episode list (thumbnail, number, title, runtime, one-line description) between the facts and "More like this". Mark an episode as watched with a thin progress bar on its thumbnail.

### 6.8 Watch page `/watch/:type/:slug` [observed]
Top to bottom:
1. **Player slot**, 16:9, full container width, `--r-panel` corners, black background. Shows "Loading player" text while it initializes. The poster can show before playback when the "Show poster" setting is on.
2. A small **mode switch** under the player with two options. The reference calls them "Direct" and "Embed", with helper text explaining that if a title or subtitles are not available the user can try another player, and that subtitle, title and poster settings only apply to the direct mode. You can keep the idea (a segmented control to switch playback source) or drop it if you have a single source.
3. **Share strip** with count (same component as the home hero).
4. **Title (H1)** and synopsis.
5. **Facts**: Genres, Cast (links, with "and more…"), Director, Country, Duration (`2h 25m`), Rated, Release year, Rating.
6. **Player preferences**, as inline toggles: Automatic next episode, Show title in player, Show poster in player, Chromecast button, and a Subtitle language select. The reference lists 15 languages: English, Español, Français, Deutsch, Italiano, Português, العربية, Türkçe, Русский, 日本語, 한국어, 中文, हिन्दी, Nederlands, Polski. Show each in its own script.
7. **Comments**: H2 "Comments (0)", a textarea with helper text ("Keep it about the title. Hate speech and links aren't allowed."), a live counter `0 / 500`, a "Sign in to post" action for signed-out users, and a "Loading comments…" state.
8. **More like this** rail, about 20 items.

TV watch by extension: add an episode picker (season select plus a scrollable episode list) beside the player on desktop and below it on mobile, and honor "Automatic next episode" at the end of an episode.

### 6.9 Settings `/settings` [observed]
"Back", H1. Grouped sections, each a `--surface` panel with a small heading:
- **Account**: explainer ("Watchlist, history, and username load on any device when you sign in with this email"), Sign in or Logout, Username field with helper text "Shown on comments".
- **Language**: how the interface talks to the user; a select, currently English.
- **Playback**: Subtitles language select ("Language when a stream starts"); On/Off toggles with a one-line description each for Autoplay, Auto-next, Title, Poster, Chromecast.
- **Add to Home Screen**: two short instructions, one for phones (share, then add to home screen) and one for desktop (use the browser menu to install or pin).
- **Clear history**: explains it clears watchlist, watch history and search history. Secondary button.
- **Delete account**: "Permanently deletes your account. This cannot be undone." Destructive button in `--danger` outline; confirm in a dialog.

### 6.10 Static pages `/about /dmca /privacy /terms` [observed]
"Back to home" link, H1, a one-sentence intro, then a plain bulleted list or short paragraphs. Narrow reading column (max 68ch), generous line height. No imagery. Keep the legal text short and factual: what the service is, what data is kept, how to contact for takedowns, and what users agree to. Write your own, based on how your product actually works.

### 6.11 Sign in [not inspected]
Account is email-based with no password mentioned. Recommend a small modal: email field, "Send code" button, then a code field. Explain in one line what signing in gives (list, history and username on every device).

---

## 7. Components

### 7.1 Poster card (the core component) [observed content]
Anatomy: a 2:3 image, and beneath it the title and a meta line, all inside a single link.
- Alt text pattern: `"{title} poster"`.
- Title: 0.875rem, two-line clamp, `--text`.
- Meta line: `{rating} • {year} • {Movie|TV}`. Rating with one decimal and a small star in `--rating`. If rating is missing, show an en dash [observed]. A perfect `10.0` exists, so reserve room for four characters.
- Image: `--r-poster`, `--surface` placeholder while loading, `object-fit: cover`, `loading="lazy"` except the first row.
- Hover and focus [recommended]: image lifts 2px, a 1px `--line-strong` ring appears, title brightens. No zoom beyond 1.02, no overlay buttons. Focus uses `--focus-ring`.
- Missing artwork: a `--surface` tile with the title centered in `--text-dim`.

### 7.2 Buttons
- Primary: `--accent` fill, `--on-accent` text, `--r-control`, 44px tall (48px in the spotlight). Hover lightens slightly; active scales to 0.98.
- Secondary: transparent, 1px `--line-strong` border, `--text`. Hover fills `--surface-raised`.
- Ghost / text: no border, `--text-dim`, underline on hover.
- Destructive: 1px `--danger` border and text; fills on hover.
- Icon button: 40px circle, `--surface-raised`.

### 7.3 Chips and tabs
- Genre chip: `--surface-raised`, `--r-pill`, 36px tall, 14px horizontal padding. Selected: `--accent` fill, `--on-accent` text.
- Sort tab: text-only with a 2px underline on the selected one (or the same pill style, but pick one and use it everywhere).

### 7.4 Search
A large field in the hero (56px tall, `--surface`, `--r-input`, search icon at left, placeholder text as a question). On focus, open a panel with recent searches (stored only in this browser [observed from privacy page]) and, once typing, live results as small rows (thumbnail, title, year, type). Enter goes to a results page. A compact search icon opens the same panel from the header on inner pages.

### 7.5 Share strip
Label text, four icon buttons (X, Facebook, Reddit, Telegram) at 36px, and a count with the word "shares". Icon buttons use `--surface-raised`; the count uses tabular numerals.

### 7.6 Toggle (On / Off)
Segmented two-state control reading "On" and "Off" (observed wording), not an iOS-style switch. Selected state uses `--accent` fill.

### 7.7 Rail header
H2 left, "View more" text link right (`--text-dim`, brightens on hover). Same component for every rail.

### 7.8 Provider tile
A rounded `--surface` tile, about 120 by 64px, with the provider's logo mark centered in monochrome white. One provider (Crunchyroll in the reference) also shows its name as text. Links to `/provider/:slug`. The reference lists Netflix, Disney+, Crunchyroll, Apple TV, Prime, Max and Hulu.

### 7.9 Collection tile
Wider than a poster (about 2:1), artwork behind a bottom gradient, the collection name over it and "N films" beneath in `--text-dim`.

### 7.10 Status badge
Small pill on spotlight items. `--surface-raised` background, `--text`, 0.75rem, 600 weight. Not color-coded; the text carries the meaning.

### 7.11 Skeletons, empty and error states
- Loading: poster-shaped `--surface` blocks with a slow shimmer (1.6s). Rails show 8 skeletons.
- Empty: one sentence of what goes here plus one action. Example: "Save titles and they'll appear here."
- Error: say what failed and offer "Try again" plus a link home. The reference's TV detail pages return a server error, so build a real error page and never expose a raw 500.

---

## 8. Motion

Keep it restrained [recommended].
- Hover and focus transitions: `--t-fast`, `--ease`.
- Menus, dialogs, tab changes: `--t-base`.
- The spotlight crossfade (400ms) is the one ambient animation on the site. Pause it on hover, focus, and when the tab is hidden.
- No scroll-triggered entrances, no parallax, no animated gradients.
- Respect `prefers-reduced-motion: reduce`: disable the spotlight auto-advance, remove lifts, keep opacity changes only.

---

## 9. Accessibility

- Skip link first in tab order.
- Every poster link has a clear accessible name: title, year and type.
- Visible focus ring on every interactive element (`--focus-ring`).
- Text contrast: `--text-dim` on `--bg` must stay at or above 4.5:1; check `--text-faint` and use it only for non-essential text.
- Tap targets are at least 44px.
- Toggles, tabs, dialogs and the search panel follow the standard ARIA patterns.
- Support `dir="rtl"` for Arabic subtitle labels and user comments.

---

## 10. Data and images

- Source: TMDB. Posters `w500`, spotlight and detail backdrops `w1920`, collection backdrops `w1280`, person portraits `w500`. Serve through your own image proxy or CDN for resizing and caching, and use `srcset` and `sizes`.
- Title identity: store the TMDB id, build the URL slug from the title, and append a short opaque id.
- Anime is a derived category (animation titles with a Japanese origin), shown as its own section in navigation.
- Pages are server-rendered with real titles, descriptions and Open Graph tags; the reference does this for every route, so use SSR or static generation (Next.js, Astro or similar) rather than a client-only SPA.
- Per-user data (list, history, comments, settings) is tied to an email sign-in; language, playback preferences and search history stay in the browser.

---

## 11. Suggested stack

Next.js (App Router) or Astro, Tailwind CSS with the tokens above mapped into the theme, a typed TMDB client, a small database for accounts, lists, history and comments, and Postgres or SQLite. Use `next/image` or an equivalent loader. Put every token in CSS variables first, then map to Tailwind, so the palette can be swapped in one place.

---

## 12. Build order

1. Tokens, global CSS, fonts, header, mobile tab bar, footer.
2. Poster card, grid, rail, chips, tabs, pagination.
3. `/movies`, `/tv`, `/anime`, `/trending`, `/genres`, `/genre/:slug`.
4. Home page with all rails, then the spotlight.
5. Detail page, then the watch page with the player slot.
6. Collections, person, provider, similar.
7. Sign-in, watchlist, My page, settings.
8. Static pages, error pages, empty and loading states.
9. Accessibility and performance pass.

## 13. Acceptance checklist

- [ ] Background is `#15171c` on every page; no pure black or pure white surfaces other than the player.
- [ ] Every poster card shows rating, year and type in the same format, with an en dash when the rating is missing.
- [ ] Listing pages show 32 items per page, with sort tabs, genre chips and pagination capped at 10.
- [ ] Home page sections appear in the order in section 6.1.
- [ ] Spotlight shows exactly one item at a time with Details and Watch buttons.
- [ ] Watch page has the player slot, source switch (if used), share strip, facts, preferences, comments (500-character limit) and similar titles.
- [ ] Settings includes Account, Language, Playback, Add to Home Screen, Clear history and Delete account.
- [ ] Mobile has a bottom tab bar and respects safe-area insets; nothing hides behind it.
- [ ] Keyboard-only navigation works end to end; `prefers-reduced-motion` is honored.
- [ ] Lighthouse accessibility score is 95 or higher, and LCP is under 2.5s on a mid-range phone.
- [ ] Own brand name, logo and copy everywhere; TMDB attribution in the footer.
