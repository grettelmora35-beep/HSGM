# The Woods 🌳

Sitio de **The Woods**, distribuidora de materiales de madera y tipo madera en **Puebla, México**.

Construido con **Astro + React**, desplegable en **Cloudflare Pages**.

## ¿Qué hace?

1. **Test de estilo** (`/test`): 7 preguntas que identifican el estilo de decoración (interior y exterior) de cada persona.
2. **Resultados**: muestra el estilo con el que se identifica el usuario, con una **galería en grid** estilo editorial.
3. **CTA / Lead**: formulario que pide **WhatsApp** (obligatorio) y **presupuesto** (opcional). Al enviar, se manda un correo con los datos del lead a `gimrgc@gmail.com` usando **Resend**.

---

## Requisitos

- Node.js 18+ (probado con Node 24)
- Una cuenta de [Resend](https://resend.com) y su **API Key**

## Instalación

```bash
npm install
```

## Configuración (variables de entorno)

Crea un archivo `.env` (para `astro dev`) a partir de `.env.example`:

```bash
RESEND_API_KEY=re_tu_api_key_aqui
LEAD_TO_EMAIL=gimrgc@gmail.com
LEAD_FROM_EMAIL=The Woods <onboarding@resend.dev>
```

> **Remitente (`LEAD_FROM_EMAIL`):** para pruebas puedes usar `onboarding@resend.dev`.
> En producción usa un **dominio verificado** en Resend (ej. `leads@thewoods.mx`),
> de lo contrario Resend rechazará el envío.

Para probar con el runtime real de Cloudflare en local (`wrangler pages dev`), usa `.dev.vars`
(copia `.dev.vars.example`).

## Desarrollo

```bash
npm run dev        # http://localhost:4321
```

## Build y preview

```bash
npm run build      # genera ./dist
npm run preview    # sirve el build con el runtime de Cloudflare (wrangler)
```

---

## Despliegue en Cloudflare Pages

### Opción A — Git (recomendada)

1. Sube este repo a GitHub/GitLab.
2. En el dashboard de Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
3. Configura el build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. En **Settings → Environment variables** añade:
   - `RESEND_API_KEY`
   - `LEAD_TO_EMAIL` = `gimrgc@gmail.com`
   - `LEAD_FROM_EMAIL` = `The Woods <leads@tudominio.com>`
5. Deploy. La API route (`/api/lead`) corre automáticamente como Cloudflare Function.

### Opción B — Wrangler (CLI)

```bash
npm run build
npx wrangler pages deploy ./dist --project-name the-woods
```

Luego añade las variables de entorno:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name the-woods
```

(y `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` desde el dashboard o como secrets).

---

## Estructura

```
src/
  components/
    Nav.astro          Footer.astro
    StyleQuiz.tsx      ← test + resultados + formulario (React island)
    quiz.css
  data/
    quiz.ts            ← estilos, imágenes, preguntas y scoring
  layouts/Base.astro
  pages/
    index.astro        ← landing (hero estilo editorial)
    test.astro         ← el test
    api/lead.ts        ← envío del correo con Resend
  styles/global.css    ← sistema de diseño
```

## Personalización rápida

- **Imágenes de cada estilo:** edita los arrays `images` en `src/data/quiz.ts`
  (cámbialas por fotos reales del catálogo de The Woods).
- **Preguntas / scoring:** `QUESTIONS` y `scoreAnswers` en el mismo archivo.
- **Colores y tipografía:** variables CSS en `src/styles/global.css`.
- **Correo destino:** variable `LEAD_TO_EMAIL`.
