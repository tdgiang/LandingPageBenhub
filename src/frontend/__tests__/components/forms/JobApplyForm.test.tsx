import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobApplyForm from '@/components/forms/JobApplyForm';
import { JOBS } from '@/lib/data';

const user = () => userEvent.setup();
const SUBMIT_WAIT = { timeout: 5000 };
const FIRST_JOB = JOBS.filter((j) => j.isActive)[0].title;

const fillValid = async (u: ReturnType<typeof userEvent.setup>) => {
  await u.type(screen.getByLabelText(/họ và tên/i), 'Lê Thị Ứng Viên');
  await u.type(screen.getByLabelText(/số điện thoại/i), '0901234567');
  await u.type(screen.getByLabelText(/email/i), 'ung.vien@example.com');
  await u.selectOptions(screen.getByLabelText(/vị trí ứng tuyển/i), FIRST_JOB);
};

describe('JobApplyForm — rendering', () => {
  it('renders all required fields', () => {
    render(<JobApplyForm />);
    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/số điện thoại/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/vị trí ứng tuyển/i)).toBeInTheDocument();
  });

  it('renders all active job options in the dropdown', () => {
    render(<JobApplyForm />);
    const select = screen.getByLabelText(/vị trí ứng tuyển/i) as HTMLSelectElement;
    const activeJobs = JOBS.filter((j) => j.isActive);
    activeJobs.forEach((j) => {
      expect(Array.from(select.options).some((o) => o.value === j.title)).toBe(true);
    });
  });

  it('pre-selects job when preselectedJob prop provided', () => {
    render(<JobApplyForm preselectedJob={FIRST_JOB} />);
    const select = screen.getByLabelText(/vị trí ứng tuyển/i) as HTMLSelectElement;
    expect(select.value).toBe(FIRST_JOB);
  });

  it('renders optional cover letter field', () => {
    render(<JobApplyForm />);
    expect(screen.getByLabelText(/thư giới thiệu/i)).toBeInTheDocument();
  });
});

describe('JobApplyForm — validation', () => {
  it('shows error for invalid email', async () => {
    const u = user();
    render(<JobApplyForm />);
    await u.type(screen.getByLabelText(/email/i), 'not-valid-email');
    await u.click(screen.getByRole('button', { name: /nộp hồ sơ/i }));
    await waitFor(() =>
      expect(screen.getByText(/email không hợp lệ/i)).toBeInTheDocument()
    );
  });

  it('shows error when no position selected', async () => {
    const u = user();
    render(<JobApplyForm />);
    await u.type(screen.getByLabelText(/họ và tên/i), 'Test');
    await u.type(screen.getByLabelText(/số điện thoại/i), '0901234567');
    await u.type(screen.getByLabelText(/email/i), 'a@b.com');
    // Keep select at empty default
    const select = screen.getByLabelText(/vị trí ứng tuyển/i) as HTMLSelectElement;
    Object.defineProperty(select, 'value', { value: '', writable: true });
    await u.click(screen.getByRole('button', { name: /nộp hồ sơ/i }));
    await waitFor(() =>
      expect(screen.getByText(/vui lòng chọn vị trí/i)).toBeInTheDocument()
    );
  });

  it('shows error for missing fullName', async () => {
    const u = user();
    render(<JobApplyForm />);
    await u.click(screen.getByRole('button', { name: /nộp hồ sơ/i }));
    await waitFor(() =>
      expect(screen.getByText(/vui lòng nhập họ tên/i)).toBeInTheDocument()
    );
  });
});

describe('JobApplyForm — submission', () => {
  it('shows success after valid submit', async () => {
    const u = user();
    render(<JobApplyForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /nộp hồ sơ/i }));
    const el = await screen.findByText(/hồ sơ đã được gửi/i, {}, SUBMIT_WAIT);
    expect(el).toBeInTheDocument();
  });

  it('shows "Ứng tuyển vị trí khác" after success', async () => {
    const u = user();
    render(<JobApplyForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /nộp hồ sơ/i }));
    const link = await screen.findByText(/ứng tuyển vị trí khác/i, {}, SUBMIT_WAIT);
    expect(link).toBeInTheDocument();
  });

  it('resets to form after "Ứng tuyển vị trí khác"', async () => {
    const u = user();
    render(<JobApplyForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /nộp hồ sơ/i }));
    await screen.findByText(/ứng tuyển vị trí khác/i, {}, SUBMIT_WAIT);
    await u.click(screen.getByText(/ứng tuyển vị trí khác/i));
    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
  });
});
