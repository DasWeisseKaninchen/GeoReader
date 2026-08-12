<div align="center">

# 🌍 GeoReader

**Aprende a leer el mundo — letrero a letrero.**

GeoReader te enseña a leer **carteles reales** escritos en **cirílico, griego, hebreo y georgiano** con letreros generados en Python, audio nativo y un cuestionario integrado — todo en un único archivo HTML que funciona sin conexión en tu navegador.

![Licencia: AGPL-3.0](https://img.shields.io/badge/Licencia-AGPL--3.0-blue)
![Versión](https://img.shields.io/badge/versión-1.0-blueviolet)
![Plataforma: navegador](https://img.shields.io/badge/plataforma-navegador-4caf50)
![Sin compilación](https://img.shields.io/badge/compilación-nula-brightgreen)
![Funciona sin conexión](https://img.shields.io/badge/sin--conexión-sí-success)

### [▶ Jugar en línea — sin descargas](https://dasweissekaninchen.github.io/GeoReader/)

**Gratis · Sin anuncios · Sin cuenta · Sin instalación · Tu progreso se guarda en tu dispositivo**

[Funciones](#-funciones) · [Inicio rápido](#-inicio-rápido) · [Alfabetos compatibles](#-alfabetos-compatibles) · [Estructura del proyecto](#-estructura-del-proyecto) · [Créditos](#-créditos-y-fuentes-de-datos) · [Licencia](#-licencia)

</div>

---

## ✨ ¿Qué es GeoReader?

GeoReader es una herramienta gratuita y sin anuncios que te enseña a leer **sistemas de escritura no latinos** tal como los encontrarás en la vida real: en **carteles de carretera, carteles de frontera y nombres de lugares**.

En lugar de memorizar tarjetas abstractas, aprendes con:

* 🧭 **Modo Aprender** — cada letra de un alfabeto, con su nombre, transliteración, muestras de sonido IPA y ejemplos tomados de ciudades y lugares reales (cada uno con audio de pronunciación nativa).
* 🚏 **Modo Practicar** — elige un país y lee carteles de carretera de estilo auténtico, transliterando los destinos que aparecen en ellos.
* 📝 **Modo Cuestionario** — preguntas que combinan letras, sonidos, fotos de carteles reales, emparejar y escribir.
* 🏅 **Sistema de progreso** — insignias, porcentajes por alfabeto y un resumen completo de lo que has entrenado y dominado.

Todo se **guarda localmente** en tu navegador — sin cuenta, sin seguimiento, sin anuncios. La interfaz de la app está en inglés; los alfabetos que aprenderás, por supuesto, no. 😉

---

## 🚀 Inicio rápido

Hay dos formas de usar GeoReader:

### Opción 1 — Jugar en línea (más rápido)

Solo abre **[dasweissekaninchen.github.io/GeoReader](https://dasweissekaninchen.github.io/GeoReader/)** — sin descargas, sin instalación, funciona directamente en tu navegador. El progreso se guarda localmente en ese navegador/dispositivo.

### Opción 2 — Descargar y ejecutar sin conexión

Sin instalación, sin compilación, sin servidor. Solo:

1. Descarga el proyecto (o clona el repositorio).
2. **Haz doble clic en `GeoReader.html`**.

Eso es todo — la app se abre directamente en tu navegador y funciona completamente sin conexión desde `file://`, sin necesidad de internet.

> [!IMPORTANT]
> Si lo ejecutas sin conexión, `GeoReader.html` debe permanecer en la misma carpeta que la carpeta `assets/` — el audio y las imágenes se cargan desde ahí.
>
> **Demora en la primera apertura (Windows):** los archivos HTML con bloques `<script>` grandes, descargados desde un `.zip`, pueden activar un escaneo único de **Windows Defender / SmartScreen**. **No es un bloqueo** — la primera apertura solo tarda unos segundos más. Las siguientes aperturas son instantáneas.

---

## 🧭 Funciones

### Modo Aprender

* Cada letra con **mayúscula/minúscula, nombre, transliteración e IPA**.
* **Audio nativo** para cada letra, más muestras de sonido estilo IPA ("a" como en *padre*).
* **Ejemplos reales de nombres de lugares con audio** — ciudades y países que verás de verdad en los carteles.
* El hebreo se maneja completamente de **derecha a izquierda** (RTL); los alfabetos de una sola caja también se manejan.
* **Navegación rápida entre letras** y pestañas por alfabeto y por idioma.

### Modo Practicar

* Elige un país y practica con **carteles de carretera** creados con el estilo de señalización local (generados con Python para parecerse a la señalética auténtica).
* Cada cartel señala **lugares reales** — ciudades, unidades administrativas y puntos de interés auténticos de ese país, no nombres inventados.
* Lee el cartel y translitera el **destino más cercano o más lejano** que aparece en él.
* **Carteles de frontera** incluidos — los altos que ves al entrar a un país.

### Modo Cuestionario

* Las preguntas combinan **opción múltiple, emparejar pares, escribir la respuesta, ejercicios de escucha y lectura de fotos de carteles reales**.
* Seguimiento en vivo de **precisión, puntuación y rachas**.

### Progreso e insignias

* Las letras pasan por **entrenada → dominada** mientras practicas.
* **Insignias** por alcanzar hitos (Starter, Explorer, Master, Expert…).
* **Barra de progreso general** y porcentajes por alfabeto — guardados automáticamente en tu navegador.

### 🔒 Privacidad

Sin cuenta, sin servidor, sin analíticas. Todo el progreso vive en el **almacenamiento local** de tu navegador y nunca sale de tu dispositivo.

---

## 🌐 Alfabetos compatibles

|Alfabeto|Idiomas|Dirección|
|-|-|-|
|**Cirílico**|Ruso, ucraniano, búlgaro, serbio, macedonio, kirguís, kazajo, mongol|LTR|
|**Griego**|Griego, griego chipriota|LTR|
|**Hebreo**|Hebreo|RTL (derecha a izquierda)|
|**Georgiano**|Georgiano (Mkhedruli)|LTR|

Los carteles de carretera y frontera se construyen con **lugares reales** de cada país — ciudades, unidades administrativas (regiones, provincias, óblasts…) y puntos de interés reales, no marcadores inventados.

---

## 📁 Estructura del proyecto

```
georeader/
├── GeoReader.html            ← La app — haz doble clic para ejecutarla
├── README.md
├── README_es.md
└── assets/
    ├── js/
    │   └── georeader-data.js ← Todos los datos de alfabetos, lugares, carteles e IPA
    ├── audios/                ← Audio de pronunciación nativa
    └── images/
        └── signs/             ← Fotos de carteles de carretera y frontera, por alfabeto
```

Todo lo que la app necesita —código, datos y multimedia— viene en esta carpeta. No hay nada que compilar ni que instalar.

---

## 🙏 Créditos y fuentes de datos

* **Muestras de audio de letras e IPA:** Wikimedia Commons (CC BY-SA).
* **Pronunciación de nombres de lugares:** Forvo (CC BY-NC-SA).
* **Imágenes de carteles de carretera y frontera:** creadas localmente con Python para parecerse a los estilos regionales reales.

GeoReader está diseñado y mantenido por **DasWeißeKaninchen**.

---

## ❤️ Apoyo

Si GeoReader te resulta útil, toca el botón **❤️** dentro de la app — también hay una opción **PIX** (código QR) para apoyo directo.

---

## 📄 Licencia

GeoReader es **software libre** distribuido bajo la [**GNU Affero General Public License v3.0**](https://www.gnu.org/licenses/agpl-3.0.html) (AGPL-3.0).
