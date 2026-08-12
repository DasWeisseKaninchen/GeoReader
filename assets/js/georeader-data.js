/* GeoReader data layer.
 * Loads the canonical JSON indexes (or their embedded copy) and exposes them in
 * the shapes the GeoReader engine consumes.
 *
 * Two load paths:
 *   A) EMBEDDED  -> a <script type="application/json" id="georeader-data"> block
 *                   in the HTML. JSON.parse is used (not a JS literal) so the
 *                   data survives any special characters safely. Works with the
 *                   file opened via double-click (file://) with no server.
 *   B) FETCH     -> assets/codex/output/*.json via fetch(). Used when the HTML is
 *                   served over HTTP and no embedded block is present (dev mode).
 */
(function (global) {
  'use strict';

  const DATA = {
    alphabets: null,   // alphabets.json   {lang: doc}
    places: null,      // places_audio.json
    signs: null,       // signs_images.json
    border: null,      // border_signs.json
    ipa: null,         // ipa_audio.json
    letters: null,     // letters_audio.json (native letter audio)
  };

  const UI_TO_JSON = {
    russian: 'ru',
    ukrainian: 'uk',
    serbian: 'sr',
    kazakh: 'kk',
    mongolian: 'mn',
    macedonian: 'mk',
    kyrgyz: 'ky',
    greek: 'el',
    hebrew: 'he',
    georgian: 'ka',
    bulgarian: 'bg',
  };

  // engine looks up a letter's examples via item.examples[primaryLangKey].
  const UI_TO_PRIMARY = {
    russian: 'ru',
    ukrainian: 'uk',
    serbian: 'sr',
    kazakh: 'kk',
    mongolian: 'mn',
        macedonian: 'mk',
    kyrgyz: 'ky',
    greek: 'gr',
    hebrew: 'he',
    georgian: 'ge',
    bulgarian: 'bg',
  };

  // Which JSON "place" datasets feed each UI language's example words. Cyprus
  // (cy) shares the Greek alphabet, so it is merged into the Greek pool.
  const UI_PLACE_LANGS = {
    russian: ['ru'],
    ukrainian: ['uk'],
    serbian: ['sr'],
    kazakh: ['kk'],
    mongolian: ['mn'],
    macedonian: ['mk'],
    kyrgyz: ['ky'],
    bulgarian: ['bg'],
    greek: ['el', 'cy'],
    hebrew: ['he'],
        georgian: ['ka'],
  };

  // ISO country code for each JSON place-dataset language. Used to decorate
  // example signs with a small country badge whenever a place comes from a
  // different country than the current UI language (e.g. Cyprus places shown
  // inside the Greek alphabet, or a Mongolian city with no learn-mode entry).
    const PLACE_COUNTRY = {
    ru: 'RU', uk: 'UA', sr: 'RS', kk: 'KZ', mn: 'MN',
    mk: 'MK', ky: 'KG', bg: 'BG', el: 'GR', cy: 'CY',
    he: 'IL', ka: 'GE',
  };

  // Places to never surface as an example word. `ellas` is the archaic Greek
  // spelling of "Greece" (we surface only Ελλάδα); `engomi` no longer has audio

  // Slugs that name the SAME real place but exist as separate entries in the
  // data. We merge them so the pool shows a single example: a shared sign and
  // every audio recording of the place. e.g. Θήρα and Σαντορίνη are one island
  // with one combined "santorini-thira" sign but two separate recordings.
  const ALIAS_GROUPS = {
    santorini: { group: 'santorini', signSlug: 'santorini-thira' },
    thira:     { group: 'santorini', signSlug: 'santorini-thira' },
  };

  const TAG_SIGN_TYPE = [
    { match: /(city|capital|town|village)/i, type: 'city' },
    { match: /(island)/i, type: 'island' },
    { match: /(river|gulf|sea|lake|bay|reservoir)/i, type: 'river' },
    { match: /(mountain|range|peak)/i, type: 'mountain' },
    { match: /(regio|province|republic|district)/i, type: 'region' },
    { match: /(neighborhood|suburb)/i, type: 'neighborhood' },
    { match: /(monastery|temple|fortress|church|palace|park|valley|desert|archaeological|landmark|site|canyon|pass)/i, type: 'landmark' },
  ];

  function signTypeForTag(tag) {
    if (!tag) return 'generic';
    for (const rule of TAG_SIGN_TYPE) {
      if (rule.match.test(tag)) return rule.type;
    }
    return 'generic';
  }

  // Transliteration of a place comes from its filename slug (e.g. "bg_balgariya"
  // -> "Balgariya"). Underscores/dashes normally become separators; when the
  // real native name contains a hyphen (Santorini-Thira, Yuzhno-Sakhalinsk) the
  // hyphen is kept so the transliteration mirrors the actual name.
  function transliterateSlug(slug, native) {
    const sep = (native && String(native).indexOf('-') !== -1) ? '-' : ' ';
    return slug
      .split(/[_-]+/)
      .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
      .join(sep);
  }

    function buildPool(uiKey, jsonLang, primary) {
    const alpha = DATA.alphabets[jsonLang];
    if (!alpha) return {};
    // Some UI languages pull their example words (places) from more than one
    // JSON dataset — e.g. Greek merges Cyprus (cy) into its pool.
        const placeLangs = UI_PLACE_LANGS[uiKey] || [jsonLang];
    const places = {};
    const slugs = [];
    const slugSrc = {}; // slug -> source JSON lang (e.g. 'el' vs 'cy')
    const signEntries = [];
    for (const plAng of placeLangs) {
      const plSet = DATA.places[plAng] || {};
      const plSlugs = Object.keys(plSet);
      for (const s of plSlugs) { places[s] = plSet[s]; slugs.push(s); slugSrc[s] = plAng; }
      const slist = (DATA.signs && DATA.signs[plAng]) || [];
      for (const e of slist) signEntries.push(e);
    }
    const pool = {};
    // slug -> sign photo path. Prefer SINGLE signs (learning mode shows only
    // single-plate signs; double/triple are used only as fallback when no
    // single plate exists for a place).
    const signBySlug = {};
    const recordSign = (entry) => {
      if (!entry || !entry.places || !entry.path) return;
      for (const pl of entry.places) if (!signBySlug[pl]) signBySlug[pl] = entry.path;
    };
    signEntries.filter((e) => e && e.type === 'single').forEach(recordSign); // singles first
    signEntries.filter((e) => e && e.type !== 'single').forEach(recordSign); // multi as fallback




    for (const upper of alpha.full_alphabet) {
      const letter = alpha.letters[upper];
      if (!letter) continue;

      const translitS = letter.translit || '';
      // Hebrew-style final forms live in 'variants' (e.g. כ -> ך). When the last
      // variant is a distinct glyph, use it as the "final form" for display and
      // for example-word matching (e.g. ירושלים ends in final ם).
      let lower = letter.lower || letter.upper;
      if (letter.variants && letter.variants.length > 1 && letter.variants[letter.variants.length - 1] !== letter.upper) {
        lower = letter.variants[letter.variants.length - 1];
      }
            const item = {
        native: letter.upper,
        lower: lower,
        latin: translitS,
        speakable: translitS,
        name: letter.name || '',
        ipa: letter.ipa || '',
        desc: (translitS ? 'Reads as "' + translitS + '". ' : '') + 'Tap the audio button for a native sample.',
      };

            // Native letter audio (per-language), when available. Keep the full list
      // so the engine can cycle through every recording of a letter.
      if (DATA.letters && DATA.letters[jsonLang] && DATA.letters[jsonLang][letter.upper]) {
        const na = DATA.letters[jsonLang][letter.upper].audio || [];
        if (na.length) {
          item.letterAudio = na[0];
          item.letterAudios = na;
        }
      }

      // Dedicated IPA panel data: per-letter IPA audio + spoken approximations
      // from alphabets.json ("a" as in "father" / "casa").
      if (letter.ipa_audio && letter.ipa_audio.length) item.ipaAudio = letter.ipa_audio[0];
      if (letter.examples && letter.examples.length) {
        item.ipaExamples = letter.examples.map((e) => (e.lang ? e.lang + ': ' : '') + e.text);
      }

            const examples = [];
            const chars = [letter.upper];
            if (lower && lower !== letter.upper) chars.push(lower);
            let signTypeSet = null;
            let signImage = null;
            // Match places for this letter, grouping them by source language so a
            // multi-source pool (e.g. Greek: el + cy) shows diverse examples rather
            // than three from only the first dataset.
            const bySrc = {};
            for (const slug of slugs) {
              const pl = places[slug];
              const native = pl.native || slug;
              if (!chars.some((c) => native.includes(c))) continue;
              if (signTypeSet === null) {
                signTypeSet = signTypeForTag(pl.tag);
                if (signTypeSet !== 'generic') item.signType = signTypeSet;
              }
              const src = slugSrc[slug] || jsonLang;
              // Resolve the sign, merging aliases (e.g. Θήρα/Σαντορίνη) so the
              // example uses the shared combined "santorini-thira" sign.
              const alias = ALIAS_GROUPS[slug];
              let exSign = signBySlug[slug] || (alias && signBySlug[alias.signSlug]) || null;
              // Country names have no road sign photo -> use the border sign.
              if (!exSign && pl.tag && /country/i.test(pl.tag) && DATA.border) {
                const b = DATA.border[src];
                if (b && b.path) exSign = b.path;
              }
              if (!signImage && exSign) signImage = exSign;
              if (!bySrc[src]) bySrc[src] = [];
              // Collect every audio of the place (plus any alias recordings) so a
              // merged place (Θήρα/Σαντορίνη) plays both its native recordings.
              let audio = (pl.audio && pl.audio.length) ? pl.audio.slice() : null;
              if (alias) {
                for (const otherKey of Object.keys(places)) {
                  const other = ALIAS_GROUPS[otherKey];
                  if (other && other.group === alias.group && otherKey !== slug) {
                    const op = places[otherKey];
                    const oa = (op && op.audio) ? op.audio : [];
                    audio = (audio || []).concat(oa);
                    if (!exSign && signBySlug[otherKey]) exSign = signBySlug[otherKey];
                  }
                }
              }
              // Prefer places whose native name STARTS with the letter; places that
              // merely contain it fill in later (flagged so the selection tips the
              // starts-with entries first).
              const starts = chars.some((c) => native.charAt(0) === c);
              bySrc[src].push({
                word: native,
                lat: transliterateSlug(slug, native) + (pl.tag ? ' (' + pl.tag + ')' : ''),
                slug: slug,
                audio: (audio && audio.length) ? audio : null,
                signImage: exSign,
                starts: starts,
                country: PLACE_COUNTRY[src] || null,
              });
            }
            // Order each source list so starts-with entries come first, then
            // interleave across sources in rotation until we have up to 3 examples.
            // This keeps the examples diverse (el + cy) while still tipping the
            // pick towards words that actually begin with the letter.
            const srcKeys = Object.keys(bySrc);
            srcKeys.forEach((key) => {
              const s = bySrc[key];
              s.sort((a, b) => (b.starts ? 1 : 0) - (a.starts ? 1 : 0));
            });
            while (examples.length < 3 && examples.length < slugs.length) {
              let added = 0;
              for (const key of srcKeys) {
                const arr = bySrc[key];
                if (arr.length) { examples.push(arr.shift()); added++; }
                if (examples.length >= 3) break;
              }
              if (added === 0) break; // nothing left to add
            }
      if (examples.length) item.examples = { [primary]: examples };
      if (signImage) item.signImage = signImage;

      if (!item.signType) item.signType = 'generic';

      const norm = letter.ipa_normalized && letter.ipa_normalized[0];
      if (norm && DATA.ipa && DATA.ipa[norm]) {
        item.audioUrl = DATA.ipa[norm];
      }

      pool[upper] = item;
    }
    return pool;
  }

  const pools = {};
  function buildAllPools() {
    for (const uiKey of Object.keys(UI_TO_JSON)) {
      const jsonLang = UI_TO_JSON[uiKey];
      if (DATA.alphabets[jsonLang]) {
        pools[uiKey] = buildPool(uiKey, jsonLang, UI_TO_PRIMARY[uiKey] || jsonLang);
      }
    }
  }

  let loadMode = 'unknown';

  function snapshot() {
    return {
      alphabets: DATA.alphabets,
      places: DATA.places,
      signs: DATA.signs,
      border: DATA.border,
      ipa: DATA.ipa,
      letters: DATA.letters,
            pools,
      UI_TO_JSON,
      UI_TO_PRIMARY,
      signTypeForTag,
      PLACE_COUNTRY,
      loadMode,
    };
  }

  // Path A: embedded JSON block. Returns a plain dataset or null.
  function readEmbedded() {
    if (typeof document === 'undefined') return null;
    const el = document.getElementById('georeader-data');
    if (!el) return null;
    try {
      const parsed = JSON.parse(el.textContent);
      if (parsed && parsed.alphabets && parsed.places) return parsed;
      console.warn('GeoReader: embedded block present but malformed.');
      return null;
    } catch (e) {
      console.error('GeoReader: embedded data JSON.parse failed:', e);
      return null;
    }
  }

  function ingestDataSet(d) {
    DATA.alphabets = d.alphabets;
    DATA.places = d.places || {};
    DATA.signs = d.signs || {};
    DATA.ipa = d.ipa || {};
    DATA.border = d.border || {};
    DATA.letters = d.letters || {};
    buildAllPools();
  }

  // Path B: fetch the JSONs over HTTP (works only when served, not file://).
  async function fetchDataSet() {
    const base = 'assets/codex/output/';
    const [a, p, s, ib, bg, L] = await Promise.all([
      fetch(base + 'alphabets.json').then((r) => r.json()),
      fetch(base + 'places_audio.json').then((r) => r.json()),
      fetch(base + 'signs_images.json').then((r) => r.json()),
      fetch(base + 'ipa_audio.json').then((r) => r.json()),
      fetch(base + 'border_signs.json').then((r) => r.json()),
      fetch(base + 'letters_audio.json').then((r) => r.json()),
    ]);
    return { alphabets: a, places: p, signs: s, ipa: ib, border: bg, letters: L };
  }

  let loadedPromise = null;
  const api = {
    hasEmbedded() {
      return !!readEmbedded();
    },
    load() {
      if (!loadedPromise) {
        loadedPromise = (async () => {
          const embedded = readEmbedded();
          if (embedded) {
            loadMode = 'embedded';
            ingestDataSet(embedded);
            return snapshot();
          }
          loadMode = 'fetch';
          ingestDataSet(await fetchDataSet());
          return snapshot();
        })();
      }
      return loadedPromise;
    },
  };

  global.GeoReaderData = api;
})(window);
