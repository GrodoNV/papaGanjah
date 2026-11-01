# Papá Ganjah

Sitio del colectivo ciudadano pro-cannabis legal Papá Ganjah. Incluye información institucional, transparencia documental, impacto comunitario, vista previa del libro, eventos, afiliación y donativos.

## Stack

- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS v4 mediante `@tailwindcss/vite`
- React Hook Form + Zod para el formulario de afiliación
- React PDF para la vista previa del libro
- Manrope y Fraunces como tipografías locales
- API REST con Express 5, TypeORM, PostgreSQL, JWT y Nodemailer/Resend

## Desarrollo

```bash
npm install --legacy-peer-deps
npm run dev
```

El flag `--legacy-peer-deps` es necesario por un conflicto de peers opcional entre `@hookform/resolvers` y `effect`.

## Scripts

```bash
npm run dev           # servidor de desarrollo
npm run build         # typecheck + build de producción
npm run preview       # servir dist/
npm run lint          # oxlint
npm run docs          # regenerar los PDFs de public/docs
npm run api:dev       # API en modo desarrollo
npm run api:build     # compilar la API
npm run api:start     # ejecutar la API compilada
npm run api:typecheck # typecheck de la API
npm run api:migrate   # correr migraciones de TypeORM
npm run api:seed      # crear el administrador inicial
```

## Contenido y datos

- El contenido editable vive en `src/data/`.
- Los documentos de transparencia y la muestra del libro están en `public/docs/`.
- `scripts/generate-docs.mjs` genera los PDFs. La muestra del libro contiene únicamente las 5 páginas de acceso libre; el libro completo no está incluido.
- Los datos de donativos, redes y correos son marcadores de posición y deben sustituirse por los oficiales antes de publicar.
- Las compras del libro abren un correo mediante `mailto:`.
- El formulario de afiliación ya tiene una API que persiste la solicitud y envía los correos de confirmación y alerta; la landing aún conserva el envío simulado en el cliente hasta conectarla.

## API

La API vive en `server/` y requiere PostgreSQL. Para levantarla:

```bash
cd server
cp .env.example .env
npm install
npm run migration:run
npm run seed:admin
npm run dev
```

Endpoints públicos:

- `GET /api/documents` y filtros `?category=LEGAL|OFICIO_GOBIERNO|INFORME&q=texto`
- `GET /api/events` y `?includePast=true`
- `POST /api/affiliates`
- `GET /api/projects`
- `GET /api/book/preview`
- `GET /api/donations/active-qr`

Endpoints de administración (requieren `Authorization: Bearer <token>`):

- `POST /api/auth/login` y `GET /api/auth/me`
- `GET|POST|PATCH|DELETE /api/admin/documents`
- `GET|POST|PATCH|DELETE /api/admin/events`
- `GET /api/admin/affiliates` y `PATCH /api/admin/affiliates/:id/status`
- `GET|POST|PATCH|DELETE /api/admin/projects`
- `GET|POST|PATCH /api/admin/book`
- `GET|POST|PATCH|DELETE /api/admin/donations` y `PATCH /api/admin/donations/:id/activate`
- `POST /api/admin/uploads` con `multipart/form-data` y campo `file` (PDF, JPG, PNG o WEBP)

La respuesta de `GET /api/book/preview` nunca incluye `fullPdfUrl`. El PDF completo debe almacenarse en un medio privado o entregarse por correo tras la compra.

## Estructura

```text
src/
  components/
    book/         visor PDF y paywall
    impact/       comparador y métricas
    layout/       navbar, footer y modales legales
    sections/     secciones de la landing
    transparency/ tarjetas y visor de documentos
    ui/           primitivas y contenedores
  data/           contenido del sitio
  hooks/          hooks de navegación y medidas
  lib/            utilidades y enlaces de compra
  types/          tipos compartidos
public/
  docs/           PDFs de transparencia y muestra del libro
  img/            ilustraciones SVG
server/
  src/
    common/       errores, validación, middlewares y utilidades
    config/       entorno y DataSource de TypeORM
    database/     migraciones y semilla del administrador
    modules/      auth, documents, events, affiliates, projects, book, donations, email, uploads
    app.ts        composición de Express
    server.ts     arranque y apagado ordenado
```
