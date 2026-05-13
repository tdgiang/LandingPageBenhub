# BENHUB WEBSITE — CLAUDE.md

> Tài liệu hướng dẫn cho Claude Code CLI build dự án Benhub Website từ đầu đến cuối.

---

## 1. TỔNG QUAN DỰ ÁN

**Benhub** là nền tảng vận chuyển vật liệu xây dựng (VLXD) B2B tại Việt Nam.
Website này là điểm chuyển đổi lead chính: thuyết phục doanh nghiệp đăng ký tư vấn và thu hút tài xế hợp tác.

**Đối tượng người dùng:**
- Khách hàng B2B: Đại lý VLXD, nhà thầu, cửa hàng vật liệu xây dựng
- Đối tác tài xế: Tài xế xe tải, chủ xe
- Ứng viên tuyển dụng: Ops, Sales, Điều phối vận hành

**Phạm vi MVP:**
- Website giới thiệu doanh nghiệp + landing page dịch vụ
- Form liên hệ / đăng ký lưu vào DB
- Tin tức / blog
- Tuyển dụng
- Responsive mobile/tablet/desktop

**Ngoài phạm vi MVP:** Customer portal, Driver portal, Online payment, Tracking realtime

---

## 2. TECH STACK

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (base), custom components
- **Fonts**: Google Fonts — `Barlow Condensed` (heading) + `DM Sans` (body)
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Form**: React Hook Form + Zod validation
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: class-validator + class-transformer
- **Auth**: JWT (nếu có admin panel sau)
- **File Upload**: Multer (cho CV upload)

### DevOps / Tooling
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Environment**: `.env.local` (frontend), `.env` (backend)

---

## 3. CẤU TRÚC DỰ ÁN

```
benhub/
├── apps/
│   ├── web/                        # Next.js frontend
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout (Navbar + Footer)
│   │   │   ├── page.tsx            # Trang chủ /
│   │   │   ├── dich-vu/
│   │   │   │   └── page.tsx        # /dich-vu
│   │   │   ├── khach-hang/
│   │   │   │   └── page.tsx        # /khach-hang
│   │   │   ├── doi-tac/
│   │   │   │   └── page.tsx        # /doi-tac
│   │   │   ├── tin-tuc/
│   │   │   │   ├── page.tsx        # /tin-tuc (danh sách)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # /tin-tuc/[slug] (chi tiết)
│   │   │   ├── tuyen-dung/
│   │   │   │   └── page.tsx        # /tuyen-dung
│   │   │   └── ve-chung-toi/
│   │   │       └── page.tsx        # /ve-chung-toi
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── home/
│   │   │   │   ├── HeroBanner.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── ProcessSection.tsx
│   │   │   │   ├── StatsSection.tsx
│   │   │   │   ├── ClientsSection.tsx
│   │   │   │   └── ContactCTA.tsx
│   │   │   ├── shared/
│   │   │   │   ├── SectionHeader.tsx
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── TestimonialCard.tsx
│   │   │   │   ├── ContactForm.tsx
│   │   │   │   ├── ScrollToTop.tsx
│   │   │   │   └── MiniHero.tsx
│   │   │   └── forms/
│   │   │       ├── ContactForm.tsx
│   │   │       ├── PartnerForm.tsx
│   │   │       └── JobApplyForm.tsx
│   │   ├── lib/
│   │   │   ├── api.ts              # Axios instance
│   │   │   └── utils.ts
│   │   ├── public/
│   │   ├── tailwind.config.ts
│   │   └── next.config.ts
│   │
│   └── api/                        # NestJS backend
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── prisma/
│       │   │   └── prisma.service.ts
│       │   ├── contact/
│       │   │   ├── contact.module.ts
│       │   │   ├── contact.controller.ts
│       │   │   ├── contact.service.ts
│       │   │   └── dto/create-contact.dto.ts
│       │   ├── partner/
│       │   │   ├── partner.module.ts
│       │   │   ├── partner.controller.ts
│       │   │   ├── partner.service.ts
│       │   │   └── dto/create-partner.dto.ts
│       │   ├── job-application/
│       │   │   ├── job-application.module.ts
│       │   │   ├── job-application.controller.ts
│       │   │   ├── job-application.service.ts
│       │   │   └── dto/create-job-application.dto.ts
│       │   ├── post/               # Blog / Tin tức
│       │   │   ├── post.module.ts
│       │   │   ├── post.controller.ts
│       │   │   ├── post.service.ts
│       │   │   └── dto/
│       │   └── job/                # Vị trí tuyển dụng
│       │       ├── job.module.ts
│       │       ├── job.controller.ts
│       │       ├── job.service.ts
│       │       └── dto/
│       ├── prisma/
│       │   └── schema.prisma
│       └── .env
│
├── package.json                    # root (monorepo nếu dùng pnpm workspace)
└── CLAUDE.md
```

---

## 4. DESIGN SYSTEM

### Màu sắc (định nghĩa trong tailwind.config.ts)

```ts
// tailwind.config.ts
colors: {
  primary:   '#E8521A',   // Cam đất – CTA chính
  secondary: '#1C2B3A',   // Navy xanh đen – nền tối
  accent:    '#F5A623',   // Vàng công trình – highlight
  bg:        '#F4F1EC',   // Nền kem công nghiệp
  muted:     '#6B7280',
  border:    '#E2DDD5',
}
```

### Typography

```ts
// tailwind.config.ts — fontFamily
fontFamily: {
  heading: ['Barlow Condensed', 'sans-serif'],
  body:    ['DM Sans', 'sans-serif'],
}
```

Import trong `app/layout.tsx`:
```ts
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
```

### Design Tokens — quy tắc áp dụng

| Element | Class |
|---|---|
| Heading H1 | `font-heading font-bold text-4xl lg:text-6xl` |
| Heading H2 | `font-heading font-bold text-3xl lg:text-4xl` |
| Heading H3 | `font-heading font-semibold text-xl lg:text-2xl` |
| Body text | `font-body text-base text-secondary` |
| Muted text | `text-muted text-sm` |
| CTA primary | `bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition` |
| CTA outline | `border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition` |
| Card | `bg-white rounded-2xl shadow-md border-l-4 border-primary p-6 hover:-translate-y-1 hover:shadow-lg transition-all` |
| Section light | `bg-bg py-16 lg:py-24` |
| Section dark | `bg-secondary py-16 lg:py-24 text-white` |

### Phong cách: Industrial Modern B2B
- Không dùng màu tím, gradient loè loẹt, font chữ vui nhộn
- Các section tối (`bg-secondary`) xen kẽ với section sáng (`bg-bg`, `bg-white`)
- Texture: subtle grain overlay bằng CSS `::before` pseudo-element
- Divider giữa sections: không dùng `<hr>` – dùng padding/margin

---

## 5. DATABASE SCHEMA (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Liên hệ từ form trang chủ / dịch vụ
model Contact {
  id        String   @id @default(cuid())
  fullName  String
  company   String?
  phone     String
  content   String
  createdAt DateTime @default(now())
}

// Đăng ký đối tác tài xế
model PartnerApplication {
  id           String   @id @default(cuid())
  fullName     String
  phone        String
  vehicleType  String   // "500kg" | "1T" | "2.5T" | "5T" | "10T" | "15T"
  area         String
  note         String?
  status       String   @default("pending") // pending | approved | rejected
  createdAt    DateTime @default(now())
}

// Ứng tuyển việc làm
model JobApplication {
  id         String   @id @default(cuid())
  fullName   String
  email      String
  phone      String
  jobTitle   String
  cvUrl      String?  // URL file CV sau khi upload
  coverLetter String?
  status     String   @default("pending")
  createdAt  DateTime @default(now())
}

// Vị trí tuyển dụng (seed data hoặc CMS sau)
model Job {
  id           String   @id @default(cuid())
  title        String
  location     String
  salary       String?
  type         String   @default("full-time")
  description  String
  requirements String
  benefits     String
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
}

// Bài viết tin tức
model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  thumbnail   String?
  excerpt     String?
  content     String
  category    String   // "company" | "market" | "logistics"
  publishedAt DateTime @default(now())
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

---

## 6. API ENDPOINTS (NestJS)

### Base URL: `http://localhost:4000/api`

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/contact` | Gửi form liên hệ |
| POST | `/partner` | Đăng ký đối tác tài xế |
| POST | `/job-application` | Nộp hồ sơ ứng tuyển |
| POST | `/job-application/upload-cv` | Upload file CV |
| GET | `/jobs` | Danh sách vị trí tuyển dụng |
| GET | `/jobs/:id` | Chi tiết vị trí |
| GET | `/posts` | Danh sách bài viết (có filter `?category=`) |
| GET | `/posts/:slug` | Chi tiết bài viết theo slug |

### DTOs

```ts
// create-contact.dto.ts
export class CreateContactDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsOptional() company?: string;
  @IsPhoneNumber('VN') phone: string;
  @IsString() @IsNotEmpty() content: string;
}

// create-partner.dto.ts
export class CreatePartnerDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsPhoneNumber('VN') phone: string;
  @IsIn(['500kg','1T','2.5T','5T','10T','15T']) vehicleType: string;
  @IsString() @IsNotEmpty() area: string;
  @IsString() @IsOptional() note?: string;
}

// create-job-application.dto.ts
export class CreateJobApplicationDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsEmail() email: string;
  @IsPhoneNumber('VN') phone: string;
  @IsString() @IsNotEmpty() jobTitle: string;
  @IsString() @IsOptional() cvUrl?: string;
  @IsString() @IsOptional() coverLetter?: string;
}
```

---

## 7. PAGES — CHI TIẾT TỪNG TRANG

---

### 7.1 TRANG CHỦ (`app/page.tsx`)

Bao gồm các section theo thứ tự:

#### [S1] HeroBanner
```
Layout: 2 cột (60/40) desktop, stack mobile
Background: bg-secondary với grain texture
```
- **Left:**
  - Badge: `🏗️ Chuyên giao vật liệu xây dựng`
  - H1: `"Vận chuyển VLXD / Nhanh – Đúng – Chắc"` (font-heading, 72px desktop)
  - Sub: mô tả ngắn về Benhub kết nối đại lý, nhà thầu với đội xe
  - CTA: `[Liên hệ tư vấn ngay]` (primary) + `[Trở thành đối tác tài xế]` (outline-white)
  - Stats bar: `500+ Khách hàng B2B | 50+ Tỉnh thành | 98% Đúng hạn`

- **Right:**
  - `next/image` placeholder (xe tải tại công trình từ Unsplash)
  - Floating card nhỏ: `"✓ Đơn hàng vừa giao – Đại lý Phú Thọ"`

#### [S2] ServicesSection (`bg-bg`)
- H2: `"Giải pháp vận chuyển toàn diện cho ngành VLXD"`
- Grid 4 cards (2x2 mobile / 4 cột desktop):

| Icon | Tên | Mô tả |
|---|---|---|
| 🧱 | Giao hàng VLXD | Xi măng, sắt thép, gạch, cát đá – giao tận công trình |
| 🚛 | Điều phối xe tải | Fleet 500kg → 15 tấn, xe bạt/kín, GPS realtime |
| 💪 | Dịch vụ bốc xếp | Đội bốc xếp chuyên nghiệp, bảo hiểm hàng hoá |
| 🌙 | Giao ngoài giờ | Ca đêm & cuối tuần theo tiến độ công trình |

- Card style: `border-l-4 border-primary`, hover lift, link "Xem chi tiết →"

#### [S3] ProcessSection (`bg-secondary text-white`)
- H2: `"Quy trình 4 bước – Đơn giản, Minh bạch"`
- Timeline ngang (desktop) / dọc (mobile):
  1. Tạo yêu cầu → 2. Điều phối xe → 3. Giao hàng → 4. Hoàn tất
- Mỗi bước: số lớn màu `accent`, icon, tiêu đề, mô tả ngắn

#### [S4] StatsSection (`bg-primary text-white`)
- 4 chỉ số với **countUp animation** khi scroll vào viewport:
  - `500+` Khách hàng B2B
  - `50+` Đối tác tài xế
  - `10,000+` Chuyến/tháng
  - `98%` Tỷ lệ đúng hạn
- Dùng Framer Motion `useInView` + `useMotionValue` để animate số

#### [S5] ClientsSection (`bg-bg`)
- H2: `"Được tin dùng bởi các doanh nghiệp hàng đầu"`
- Logo grid: 6–8 logo placeholder (grayscale, hover → màu + scale)
- Testimonial 1 quote lớn phía dưới

#### [S6] ContactCTA (`bg-secondary`)
- Layout split: text trái / form phải
- Trái: Headline, hotline, email
- Phải: `ContactForm` component (xem section Forms)

---

### 7.2 TRANG DỊCH VỤ (`app/dich-vu/page.tsx`)

- `MiniHero`: breadcrumb + headline
- 4 dịch vụ dạng **row xen kẽ** (image + text, text + image):

Mỗi dịch vụ bao gồm:
```
Tên dịch vụ
Mô tả chi tiết (2–3 đoạn)
Specs:
  - Phạm vi phục vụ
  - Loại xe hỗ trợ
  - Khả năng tải trọng
  - SLA vận hành
CTA: [Yêu cầu tư vấn]
```

**4 dịch vụ:**

1. **Giao hàng VLXD** — Phạm vi: HN + các tỉnh | Xe: 500kg–15T | SLA: nội thành 4h, ngoại thành 24h
2. **Điều phối xe tải** — Fleet đa dạng, xe 24/7, GPS tracking, tài xế được đào tạo
3. **Bốc xếp** — Đội chuyên nghiệp, BH hàng hoá, hỗ trợ máy móc, phụ phí minh bạch
4. **Giao ngoài giờ** — Ca đêm 22:00–06:00, cuối tuần/lễ, phụ thu 20% minh bạch

- CTA Banner cuối: `"Chưa chắc dịch vụ nào phù hợp? Chat với chuyên gia →"`

---

### 7.3 TRANG KHÁCH HÀNG (`app/khach-hang/page.tsx`)

- `MiniHero`
- **Logo wall**: 12–16 logo placeholder — grayscale grid, hover → màu
- **Case Studies** (3 cards lớn):
  ```
  Khách hàng | Bài toán | Giải pháp | Kết quả (3 bullet ✅)
  ```
- **Testimonials**: 3 quote cards — avatar, tên, chức vụ, rating sao

---

### 7.4 TRANG ĐỐI TÁC (`app/doi-tac/page.tsx`)

- `MiniHero` dark: Headline `"Kiếm thu nhập ổn định cùng Benhub"`
- **Benefits**: 3 cards nổi bật
  - 💰 Thu nhập 5–20 triệu/tháng
  - 📦 Đơn B2B ổn định, lặp lại
  - 🛡️ Đăng ký online, duyệt 24h
- **Điều kiện**: 2 cột — Loại xe / Hồ sơ cần có
- **PartnerForm**: form đăng ký đối tác (xem section Forms)

---

### 7.5 TRANG TIN TỨC (`app/tin-tuc/page.tsx`)

- `MiniHero`
- **Filter tabs**: Tất cả | Tin công ty | Tin thị trường | Logistics
- **Post grid**: 3 cột desktop / 1 cột mobile
  - Thumbnail, badge category, tiêu đề, ngày đăng, `[Đọc thêm →]`
- **Fetch**: `GET /api/posts?category=xxx`

**Chi tiết bài viết** (`app/tin-tuc/[slug]/page.tsx`):
- Breadcrumb
- H1 tiêu đề, meta (ngày, tác giả, thời gian đọc)
- Rich content (render từ string, dùng `dangerouslySetInnerHTML` hoặc markdown parser)
- Related posts (3 bài cùng category)
- CTA sidebar: `"Cần tư vấn? Liên hệ ngay"`
- **Fetch**: `GET /api/posts/:slug`

---

### 7.6 TRANG TUYỂN DỤNG (`app/tuyen-dung/page.tsx`)

- `MiniHero`: `"Gia nhập đội ngũ Benhub"`
- **Job cards** (fetch từ `GET /api/jobs`):
  ```
  [Icon] Tên vị trí
  📍 Hà Nội • Full-time • 8–12 triệu
  [Xem chi tiết →]
  ```
- **Job Detail**: Accordion hoặc Modal
  - Mô tả, Yêu cầu, Quyền lợi
  - Gắn `JobApplyForm` bên dưới
- **JobApplyForm**: Họ tên, Email, SĐT, Upload CV, Thư giới thiệu

---

### 7.7 TRANG VỀ CHÚNG TÔI (`app/ve-chung-toi/page.tsx`)

- `MiniHero`: hình đội ngũ/nhà xưởng overlay
- **Brand Story**: 2 cột — text + ảnh — 2–3 đoạn về hành trình Benhub
- **Timeline**: dạng dọc
  ```
  2022 – Thành lập, 10 xe đầu tiên tại Hà Nội
  2023 – 100+ xe, phủ 10 tỉnh
  2024 – Ra mắt nền tảng điều phối tự động
  2025 – 500+ khách hàng B2B, 50+ tỉnh thành
  ```
- **Vision & Mission**: 2 cards nổi bật (icon + tiêu đề + text)
- **Core Values**: grid 2x2
  - ⚡ Nhanh chóng | 🤝 Tin cậy | 🔍 Minh bạch | 💡 Đột phá

---

## 8. FORMS — CHI TIẾT

### Thư viện: React Hook Form + Zod

```ts
// lib/validations.ts

import { z } from 'zod'

const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  company:  z.string().optional(),
  phone:    z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  content:  z.string().min(10, 'Vui lòng nhập nội dung (tối thiểu 10 ký tự)'),
})

export const partnerSchema = z.object({
  fullName:    z.string().min(2, 'Vui lòng nhập họ tên'),
  phone:       z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  vehicleType: z.enum(['500kg','1T','2.5T','5T','10T','15T']),
  area:        z.string().min(2, 'Vui lòng nhập khu vực hoạt động'),
  note:        z.string().optional(),
})

export const jobApplicationSchema = z.object({
  fullName:    z.string().min(2, 'Vui lòng nhập họ tên'),
  email:       z.string().email('Email không hợp lệ'),
  phone:       z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  jobTitle:    z.string().min(1, 'Vui lòng chọn vị trí'),
  coverLetter: z.string().optional(),
})
```

### Success State
```tsx
// Hiện toast hoặc inline message
<div className="bg-green-50 border border-green-200 rounded-lg p-4">
  <p className="text-green-700 font-medium">
    ✅ Gửi thành công! Chúng tôi sẽ liên hệ trong 24h.
  </p>
</div>
```

### Error State
- Viền đỏ field lỗi: `border-red-400`
- Message lỗi nhỏ dưới field: `<p className="text-red-500 text-sm mt-1">{error.message}</p>`

---

## 9. SHARED COMPONENTS

### `<Navbar />`
- Logo trái: "BENHUB" (Barlow Condensed, bold) + SVG truck icon nhỏ
- Menu desktop: Dịch vụ | Khách hàng | Đối tác | Tin tức | Về chúng tôi
- CTA phải: `[Đăng ký đối tác]` (ghost) + `[Liên hệ tư vấn]` (primary)
- Mobile: hamburger → `<Sheet>` overlay full-width từ trái
- Scroll behavior: `bg-transparent` → `bg-secondary/95 backdrop-blur-md` khi scroll > 80px
- Active link: underline màu primary

### `<Footer />`
- Nền `bg-secondary`, text trắng/xám
- 4 cột: Benhub info | Dịch vụ | Công ty | Đối tác
- Bottom: copyright + badge Bộ Công Thương + social icons (Facebook, LinkedIn, Zalo)

### `<MiniHero />`
Props: `{ title, subtitle?, breadcrumb?, bgImage? }`
- Nền: `bg-secondary` hoặc ảnh overlay với `opacity-40`
- Breadcrumb dạng: `Trang chủ > Dịch vụ`
- Padding: `py-20 lg:py-28`

### `<SectionHeader />`
Props: `{ badge?, title, subtitle?, align?: 'left' | 'center' }`
- Badge nhỏ màu cam phía trên title
- H2 bold, subtitle muted

### `<ScrollToTop />`
- Button tròn, cố định bottom-right
- Hiện sau khi scroll > 300px
- Framer Motion: fade in/out

---

## 10. ANIMATION GUIDELINES

```tsx
// Dùng pattern này cho section reveal:
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Staggered children:
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}
```

- **Hero**: slide-in từ trái (text) + fade-in từ phải (image)
- **Cards**: stagger fade-up khi scroll vào viewport
- **Stats**: countUp khi vào viewport (`useMotionValue` + `animate`)
- **Hover cards**: `whileHover={{ y: -4, boxShadow: '...' }}`
- **Logo wall**: marquee tự động chạy (CSS `animation: marquee 20s linear infinite`)

---

## 11. SEO

Mỗi page cần có `generateMetadata()`:

```tsx
// app/dich-vu/page.tsx
export const metadata: Metadata = {
  title: 'Dịch vụ vận chuyển VLXD | Benhub',
  description: 'Giao hàng vật liệu xây dựng nhanh, đúng hạn. Xe tải đa dạng 500kg–15 tấn. Phủ khắp toàn quốc.',
  openGraph: {
    title: 'Dịch vụ vận chuyển VLXD | Benhub',
    description: '...',
    images: [{ url: '/og/dich-vu.jpg' }],
  },
}
```

**Cấu trúc heading đúng thứ tự:** H1 (duy nhất/trang) → H2 (section) → H3 (sub-item)

**Blog:** Dynamic metadata từ `post.title` và `post.excerpt`

---

## 12. ENVIRONMENT VARIABLES

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# apps/api/.env
DATABASE_URL=postgresql://user:password@localhost:5432/benhub
PORT=4000
```

---

## 13. COMMANDS

```bash
# Cài dependencies
pnpm install

# Chạy frontend (dev)
cd apps/web && pnpm dev        # http://localhost:3000

# Chạy backend (dev)
cd apps/api && pnpm start:dev  # http://localhost:4000

# Prisma
cd apps/api
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm prisma db seed            # seed jobs & posts mẫu

# Build production
cd apps/web && pnpm build
cd apps/api && pnpm build
```

---

## 14. SEED DATA

Tạo file `apps/api/prisma/seed.ts` với dữ liệu mẫu:

**3 Jobs:**
- Sales B2B – Hà Nội – Full-time – Thỏa thuận
- Điều phối vận hành – Hà Nội – Full-time – 8–12 triệu
- Operations Specialist – Hà Nội – Full-time – 10–15 triệu

**3 Posts:**
- "Xu hướng vận tải VLXD năm 2025" – category: market
- "Benhub mở rộng hoạt động ra 20 tỉnh thành" – category: company
- "Tối ưu chi phí giao nhận cho đại lý vật liệu xây dựng" – category: logistics

---

## 15. CHECKLIST HOÀN THIỆN

### Frontend
- [ ] Navbar sticky + mobile menu
- [ ] Footer multi-column
- [ ] Trang chủ: 6 sections
- [ ] Trang Dịch vụ: 4 dịch vụ xen kẽ
- [ ] Trang Khách hàng: logos + case study + testimonials
- [ ] Trang Đối tác: benefits + form
- [ ] Trang Tin tức: danh sách + chi tiết [slug]
- [ ] Trang Tuyển dụng: jobs list + form ứng tuyển
- [ ] Trang Về chúng tôi: story + timeline + values
- [ ] ContactForm với validation
- [ ] PartnerForm với validation
- [ ] JobApplyForm với file upload
- [ ] ScrollToTop button
- [ ] Animation (hero, cards, stats countUp)
- [ ] Responsive mobile/tablet/desktop
- [ ] SEO metadata mỗi page

### Backend
- [ ] NestJS project setup
- [ ] Prisma + PostgreSQL kết nối
- [ ] Schema migration
- [ ] `POST /contact`
- [ ] `POST /partner`
- [ ] `POST /job-application` + upload CV
- [ ] `GET /jobs`, `GET /jobs/:id`
- [ ] `GET /posts`, `GET /posts/:slug`
- [ ] CORS config cho frontend
- [ ] Seed data

### DevOps
- [ ] `.env.local` + `.env` setup
- [ ] `README.md` hướng dẫn chạy local
