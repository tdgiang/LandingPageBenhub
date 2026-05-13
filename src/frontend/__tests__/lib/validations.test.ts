import { describe, it, expect } from 'vitest';
import { contactSchema, partnerSchema, jobApplicationSchema } from '@/lib/validations';

// ─── contactSchema ──────────────────────────────────────────────────
describe('contactSchema', () => {
  const valid = {
    fullName: 'Nguyễn Văn A',
    phone: '0912345678',
    content: 'Tôi cần tư vấn về dịch vụ vận chuyển.',
  };

  it('accepts a fully valid payload', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts an optional company field', () => {
    expect(contactSchema.safeParse({ ...valid, company: 'ABC Corp' }).success).toBe(true);
  });

  it('rejects fullName shorter than 2 chars', () => {
    const result = contactSchema.safeParse({ ...valid, fullName: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid phone number format', () => {
    const result = contactSchema.safeParse({ ...valid, phone: '1234567890' });
    expect(result.success).toBe(false);
  });

  it('accepts all valid Vietnamese phone prefixes', () => {
    const prefixes = ['03', '05', '07', '08', '09'];
    prefixes.forEach((p) => {
      expect(
        contactSchema.safeParse({ ...valid, phone: `${p}12345678` }).success
      ).toBe(true);
    });
  });

  it('rejects content shorter than 10 chars', () => {
    const result = contactSchema.safeParse({ ...valid, content: 'Too short' });
    expect(result.success).toBe(false);
  });

  it('rejects when phone is empty', () => {
    const result = contactSchema.safeParse({ ...valid, phone: '' });
    expect(result.success).toBe(false);
  });
});

// ─── partnerSchema ───────────────────────────────────────────────────
describe('partnerSchema', () => {
  const valid = {
    fullName: 'Trần Tài Xế',
    phone: '0987654321',
    vehicleType: '5T' as const,
    area: 'Hà Nội',
  };

  it('accepts a fully valid payload', () => {
    expect(partnerSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts all valid vehicleType values', () => {
    const types = ['500kg', '1T', '2.5T', '5T', '10T', '15T'] as const;
    types.forEach((t) => {
      expect(partnerSchema.safeParse({ ...valid, vehicleType: t }).success).toBe(true);
    });
  });

  it('rejects an invalid vehicleType', () => {
    const result = partnerSchema.safeParse({ ...valid, vehicleType: '20T' });
    expect(result.success).toBe(false);
  });

  it('rejects area shorter than 2 chars', () => {
    const result = partnerSchema.safeParse({ ...valid, area: 'H' });
    expect(result.success).toBe(false);
  });

  it('accepts optional note field', () => {
    expect(partnerSchema.safeParse({ ...valid, note: 'Xe bạt, mới 2023' }).success).toBe(true);
  });
});

// ─── jobApplicationSchema ────────────────────────────────────────────
describe('jobApplicationSchema', () => {
  const valid = {
    fullName: 'Lê Thị B',
    email: 'le.b@example.com',
    phone: '0901234567',
    jobTitle: 'Sales B2B',
  };

  it('accepts a fully valid payload', () => {
    expect(jobApplicationSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects an invalid email format', () => {
    const result = jobApplicationSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects empty jobTitle', () => {
    const result = jobApplicationSchema.safeParse({ ...valid, jobTitle: '' });
    expect(result.success).toBe(false);
  });

  it('accepts optional coverLetter', () => {
    expect(
      jobApplicationSchema.safeParse({ ...valid, coverLetter: 'I am a great fit.' }).success
    ).toBe(true);
  });
});
