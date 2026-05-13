import { z } from 'zod';

const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên (tối thiểu 2 ký tự)'),
  company: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ (VD: 0912345678)'),
  content: z.string().min(10, 'Vui lòng nhập nội dung (tối thiểu 10 ký tự)'),
});

export const partnerSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  vehicleType: z.enum(['500kg', '1T', '2.5T', '5T', '10T', '15T'], {
    error: 'Vui lòng chọn loại xe',
  }),
  area: z.string().min(2, 'Vui lòng nhập khu vực hoạt động'),
  note: z.string().optional(),
});

export const jobApplicationSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  jobTitle: z.string().min(1, 'Vui lòng chọn vị trí'),
  coverLetter: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type PartnerFormData = z.infer<typeof partnerSchema>;
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
