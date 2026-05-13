# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Benhub** is a B2B construction materials (VLXD) logistics platform in Vietnam. This repository builds the marketing website: landing page, service pages, partner/driver registration, blog, and job listings. The site's primary goal is lead conversion — get businesses to request a consultation and drivers to register as partners.

Full-stack with two separate applications:
- **Backend**: `src/backend/` — NestJS 11 + Prisma 7 + PostgreSQL + Redis (port **4000**)
- **Frontend**: `src/frontend/` — Next.js 16 + NextAuth v5 + Tailwind v4 + shadcn/ui (port **3000**)

Target audiences: B2B clients (VLXD dealers, contractors), driver partners, job applicants.

## Commands

### Infrastructure (at repo root)
```bash
docker compose up -d   # Start PostgreSQL (5432) + Redis (6379)
docker compose down    # Stop services
```

Docker DB credentials: `postgresql://admin@localhost:5432/nest_boilerplate` (no password, trust auth).

### Backend (`src/backend/`) — package manager: npm
```bash
npm run start:dev                            # Hot reload (port 4000)
npm run build && npm run start:prod
npm test                                     # All unit tests
npm test -- --testPathPattern=users          # Single module tests
npm run test:e2e
npm run test:cov                             # Coverage report
npx prisma migrate dev --name <description>  # After schema change
npx prisma db seed                           # Seed admin + editor users
npx prisma studio
npm run lint                                 # ESLint --fix
```

### Frontend (`src/frontend/`) — package manager: pnpm
```bash
pnpm dev     # Start dev server (port 3000)
pnpm build
pnpm lint
```

## Architecture

### Backend — Clean Architecture per module

Every feature lives under `src/modules/<name>/` with four layers:
```
src/modules/<name>/
├── <name>.module.ts
├── application/<name>.service.ts       ← business logic only
├── infrastructure/<name>.repository.ts ← extends BaseRepository
└── interface/
    ├── <name>.controller.ts
    └── dto/
        ├── create-<name>.dto.ts
        ├── update-<name>.dto.ts         ← PartialType(Create...)
        └── <name>-query.dto.ts          ← extends PaginationDto
```

Never put DB calls in services directly or business logic in controllers.

**Global setup (applied to every route automatically):**
- `JwtAuthGuard` — JWT required by default; use `@Public()` to opt out (login, register, refresh, public GETs)
- `RolesGuard` — use `@Roles(Role.ADMIN)` for admin-only endpoints
- `ThrottlerGuard` — rate limiting via `THROTTLE_TTL` / `THROTTLE_LIMIT` env vars
- `TransformInterceptor` — wraps every response: `{ success, statusCode, timestamp, path, message, data, errors }`
- `AllExceptionsFilter` + `PrismaClientExceptionFilter` — normalizes errors

Controllers return `{ message: '...', data }` — the interceptor adds the wrapper. Do not replicate the wrapper in services.

**`BaseRepository` pattern:**
```typescript
constructor(prisma: PrismaService) {
  super(prisma, prisma.user as any); // inject typed delegate, not a string
}
```
- `findAll()` returns `[T[], number]` (items + total count)
- Use `softRemove({ id })` for user-facing deletes — sets `deletedAt: new Date()`
- Always filter `deletedAt: null` in service `findAll`/`findOne` queries

**Prisma schema conventions:**
- Every model: `id String @id @default(uuid())`, `createdAt`, `updatedAt`, `deletedAt DateTime?`
- Enums go above the models that use them

**Cache key conventions (`@nestjs/cache-manager` via Redis):**
- Single entity: `<model>_<id>` (e.g. `product_abc123`)
- List queries: `<model>s_list_<JSON.stringify(query)>` (e.g. `products_list_{"page":1}`)
- Invalidate on every write: delete the individual key + all tracked list keys
- See `ProductsService` for the reference cache implementation pattern

**Modules:** `AuthModule`, `UsersModule`, `ProductsModule`

**API:** `http://localhost:4000/api/v1` | Swagger: `http://localhost:4000/api/docs`

**Auth tokens:**
- Access: 15m TTL signed with `JWT_SECRET`
- Refresh: 7d TTL signed with `JWT_REFRESH_SECRET` — `POST /api/v1/auth/refresh`
- Refresh token payload includes `{ type: 'refresh' }` — validated on refresh

### Frontend — Next.js App Router

**Route groups:**
- `(marketing)/` — public pages (home, about, contact)
- `(auth)/` — login / register
- `cms/` — protected admin dashboard

**HTTP client:** Use `src/lib/api.ts` for all backend calls. It handles `Authorization: Bearer` headers and throws `ApiError` on non-2xx.

**Forms:** `react-hook-form` + `zod` + `@hookform/resolvers/zod`. See `PostForm.tsx` for the reference pattern.

**Posts:** `src/app/api/posts/` is a local Next.js API route backed by `src/lib/posts-store.ts` (in-memory) until the backend PostsModule is implemented.

**Error/Loading boundaries:** Add `error.tsx` + `loading.tsx` to every new CMS route.

**UI components:** shadcn/ui in `src/components/ui/`, split into `cms/`, `marketing/`, `shared/`.

### Benhub Design System

Apply these tokens consistently across all marketing pages:

**Colors (defined in `globals.css` CSS variables — no `tailwind.config.js`):**
```
primary:   #E8521A  (orange-red — primary CTAs)
secondary: #1C2B3A  (dark navy — dark sections, navbar)
accent:    #F5A623  (amber — highlights, stats)
bg:        #F4F1EC  (cream — light section backgrounds)
muted:     #6B7280
border:    #E2DDD5
```

**Typography:**
- Headings: `Barlow Condensed` (Google Fonts, bold/semibold)
- Body: `DM Sans` (Google Fonts)
- Import both in `app/layout.tsx` via `next/font/google`

**Component patterns:**
| Element | Class pattern |
|---|---|
| H1 | `font-heading font-bold text-4xl lg:text-6xl` |
| H2 | `font-heading font-bold text-3xl lg:text-4xl` |
| CTA primary | `bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition` |
| CTA outline | `border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition` |
| Card | `bg-white rounded-2xl shadow-md border-l-4 border-primary p-6 hover:-translate-y-1 hover:shadow-lg transition-all` |
| Section light | `bg-bg py-16 lg:py-24` |
| Section dark | `bg-secondary py-16 lg:py-24 text-white` |

Style: **Industrial Modern B2B** — no purple, garish gradients, or playful fonts. Alternate dark (`bg-secondary`) and light (`bg-bg`) sections. No `<hr>` dividers — use padding/margin.

**Animation (Framer Motion):**
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
const stagger = { visible: { transition: { staggerChildren: 0.15 } } }
```
- Hero: slide-in from left (text) + fade-in from right (image)
- Cards: stagger `fadeUp` on scroll into viewport
- Stats: `useMotionValue` + `animate` countUp when in viewport
- Logo wall: CSS `animation: marquee 20s linear infinite`

### Benhub Pages to Build

| Route | Purpose |
|---|---|
| `/` | Home (HeroBanner, Services, 4-step Process, Stats countUp, Client logos, Contact CTA) |
| `/dich-vu` | Services — 4 services in alternating image/text rows |
| `/khach-hang` | Clients — logo wall, 3 case studies, testimonials |
| `/doi-tac` | Driver partner registration — benefits + `PartnerForm` |
| `/tin-tuc` | Blog list with category filter tabs |
| `/tin-tuc/[slug]` | Blog post detail with related posts |
| `/tuyen-dung` | Jobs list + `JobApplyForm` with CV upload |
| `/ve-chung-toi` | About — brand story, timeline, vision/mission, core values |

**Shared components to implement:**
- `<Navbar />` — transparent → `bg-secondary/95 backdrop-blur-md` on scroll >80px; mobile hamburger → Sheet
- `<Footer />` — 4-column, `bg-secondary`
- `<MiniHero />` — props: `{ title, subtitle?, breadcrumb?, bgImage? }`
- `<SectionHeader />` — props: `{ badge?, title, subtitle?, align? }`
- `<ScrollToTop />` — fixed bottom-right, visible after 300px scroll

### Benhub API Endpoints

These are the Benhub-specific endpoints to implement as NestJS modules (in addition to the existing Auth/Users/Products):

| Method | Endpoint | Module |
|---|---|---|
| POST | `/api/v1/contact` | ContactModule |
| POST | `/api/v1/partner` | PartnerModule |
| POST | `/api/v1/job-application` | JobApplicationModule |
| GET/POST | `/api/v1/jobs` | JobsModule |
| GET | `/api/v1/jobs/:id` | JobsModule |
| GET/POST | `/api/v1/posts` | PostsModule (replace in-memory store) |
| GET | `/api/v1/posts/:slug` | PostsModule |

Seed data includes: `admin@example.com / Admin@123` and `editor@example.com / Editor@123`.

## Environment

### Backend (`src/backend/.env`)
```
DATABASE_URL=postgresql://admin@localhost:5432/nest_boilerplate
JWT_SECRET=...
JWT_REFRESH_SECRET=...
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
PRODUCT_CACHE_TTL=60000
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

### Frontend (`src/frontend/.env`)
Required: `AUTH_SECRET`, `NEXT_PUBLIC_API_URL=http://localhost:4000`

## ⚠️ Breaking changes to be aware of
- **Next.js 16**: May differ from training data. Read `node_modules/next/dist/docs/` before writing Next.js-specific code.
- **Tailwind CSS v4**: Configured via `globals.css` — no `tailwind.config.js`. Colors and tokens go in CSS custom properties.
- **Prisma 7**: Uses `@prisma/adapter-pg` with connection pooling in `PrismaService`. Instantiate with `new PrismaPg(pool)` — see `prisma.service.ts` and `prisma/seed.ts` for the pattern.
