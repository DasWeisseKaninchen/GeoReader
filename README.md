<div align="center">

# 🌍 GeoReader

**Learn to read the world — one sign at a time.**

GeoReader teaches you to read **real-world signs** written in **Cyrillic, Greek, Hebrew and Georgian** using Python-generated signs, native audio and a built-in quiz — all in a single HTML file that runs offline in your browser.

![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue)
![Version](https://img.shields.io/badge/version-1.0-blueviolet)
![Platform: browser](https://img.shields.io/badge/platform-browser-4caf50)
![No build required](https://img.shields.io/badge/build-none-brightgreen)
![Works offline](https://img.shields.io/badge/offline-yes-success)

### [▶ Play Online — no download needed](https://dasweissekaninchen.github.io/GeoReader/)

**Free · Ad-free · No account · No installation · Your progress stays on your device**

[Features](#-features) · [Quick start](#-quick-start) · [Supported scripts](#-supported-scripts) · [Project layout](#-project-layout) · [Credits](#-credits--data-sources) · [License](#-license)

</div>

---

## ✨ What is GeoReader?

GeoReader is a free, ad-free tool that teaches you to read **non-Latin writing systems** the way you'll actually meet them in the real world: on **road signs, border signs and place names**.

Instead of drilling abstract flashcards, you learn with:

* 🧭 **Learn mode** — every letter of an alphabet, with its name, transliteration, IPA sound samples and examples taken from real cities and places (each with native pronunciation audio).
* 🚏 **Practice mode** — pick a country and read authentic-style road signs, transliterating the destinations written on them.
* 📝 **Quiz mode** — questions that mix letters, sounds, real sign photos, matching and typing.
* 🏅 **Progress system** — badges, per-script percentages and a full overview of what you've trained and mastered.

Everything is **saved locally** in your browser — no account, no tracking, no ads. The app interface is in English; the scripts you'll learn are, of course, not. 😉

---

## 🚀 Quick start

There are two ways to use GeoReader:

### Option 1 — Play online (fastest)

Just open **[dasweissekaninchen.github.io/GeoReader](https://dasweissekaninchen.github.io/GeoReader/)** — no download, no install, works straight in your browser. Progress is saved locally on that browser/device.

### Option 2 — Download and run offline

No install, no build, no server. Just:

1. Download the project (or clone the repo).
2. **Double-click `GeoReader.html`**.

That's it — the app opens straight in your browser and works fully offline from `file://`, with no internet connection needed.

> [!IMPORTANT]
> If running offline, `GeoReader.html` must stay in the same folder as the `assets/` folder — audio and images are loaded from there.
>
> **First-open delay (Windows):** HTML files with large `<script>` blocks, downloaded from a `.zip`, can trigger a one-time **Windows Defender / SmartScreen** scan. It is **not a block** — the first open just takes a few extra seconds. Subsequent opens are instant.

---

## 🧭 Features

### Learn mode

* Every letter with **upper/lowercase, name, transliteration and IPA**.
* **Native audio** for each letter, plus IPA-style sound samples ("a" as in *father*).
* **Real place-name examples with audio** — cities and countries you'll actually see on signs.
* Hebrew is fully **right-to-left** aware; scripts with a single case are handled too.
* Quick **letter-jump** navigation and tabs per alphabet and per language.

### Practice mode

* Choose a country and practice on **road signs** created in the local design style (Python-generated to resemble authentic signage).
* Every sign points to **real places** — actual cities, administrative units and points of interest from that country, not placeholder names.
* Read the sign and transliterate the **closest or furthest destination** shown on it.
* **Border signs** included — the tall ones you see when entering a country.

### Quiz mode

* Questions mix **multiple choice, matching pairs, typing the answer, listening exercises and reading real sign photos**.
* Live **accuracy, score and streak tracking** as you go.

### Progress & badges

* Letters move through **trained → mastered** as you practice.
* **Badges** for reaching milestones (Starter, Explorer, Master, Expert…).
* **Overall progress bar** and per-script percentages — saved automatically in your browser.

### 🔒 Privacy

No account, no server, no analytics. All progress lives in your browser's **local storage** and never leaves your device.

---

## 🌐 Supported scripts

|Script|Languages|Direction|
|-|-|-|
|**Cyrillic**|Russian, Ukrainian, Bulgarian, Serbian, Macedonian, Kyrgyz, Kazakh, Mongolian|LTR|
|**Greek**|Greek, Cypriot Greek|LTR|
|**Hebrew**|Hebrew|RTL (right-to-left)|
|**Georgian**|Georgian (Mkhedruli)|LTR|

Road and border signs are built for the **real places** of each country — actual cities, administrative units (regions, provinces, oblasts…) and points of interest, not made-up placeholders.

---

## 📁 Project layout

```
georeader/
├── GeoReader.html            ← The app — double-click to run
├── README.md
├── README_es.md
└── assets/
    ├── js/
    │   └── georeader-data.js ← All alphabet, place, sign and IPA data
    ├── audios/                ← Native pronunciation audio
    └── images/
        └── signs/             ← Road & border sign photos, by script
```

Everything the app needs — code, data and media — ships in this folder. There's nothing to build and nothing to install.

---

## 📷 Screenshots and media examples

<img width="662" height="652" alt="image" src="https://github.com/user-attachments/assets/68467fee-16c4-4726-bdbe-5aca2a82a99c" />
<img width="657" height="546" alt="image" src="https://github.com/user-attachments/assets/f01b61cd-e887-420f-a07f-39ed4e4d6002" />
<img width="527" height="473" alt="image" src="https://github.com/user-attachments/assets/34af42e7-10a6-4480-aa2c-f7ca66130f6d" />
<img width="532" height="483" alt="image" src="https://github.com/user-attachments/assets/feca4754-a9e1-42af-8ff1-4bd509c85e2a" />
<img width="507" height="462" alt="image" src="https://github.com/user-attachments/assets/a824213a-f484-44cf-be51-0f66db4d80c3" />
<img width="603" height="344" alt="image" src="https://github.com/user-attachments/assets/f3945468-658d-4e1e-92d7-3c07e2f7f8d7" />
<img width="613" height="336" alt="image" src="https://github.com/user-attachments/assets/87a9db44-9c67-46f1-a443-f072ef8d7ca2" />
<img width="858" height="536" alt="ky_kyrgyzstan_001" src="https://github.com/user-attachments/assets/482851d4-cbc6-4c0e-81a5-8dc36be5fec0" />

---

## 🙏 Credits & data sources

* **Letter & IPA audio samples:** Wikimedia Commons (CC BY-SA).
* **Place-name pronunciation:** Forvo (CC BY-NC-SA).
* **Road & border sign images:** created locally with Python to resemble real regional sign styles.

GeoReader is designed and maintained by **DasWeißeKaninchen**.

---

## ❤️ Support

If GeoReader helps you, tap the **❤️** button inside the app — there's also a **PIX** option (QR code) for direct support.

---

## 📄 License

GeoReader is **free software** released under the [**GNU Affero General Public License v3.0**](https://www.gnu.org/licenses/agpl-3.0.html) (AGPL-3.0).
