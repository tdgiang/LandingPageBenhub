import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/forms/ContactForm';

const user = () => userEvent.setup();
const SUBMIT_WAIT = { timeout: 5000 }; // form delay is 1200ms

const fillValid = async (u: ReturnType<typeof userEvent.setup>) => {
  await u.type(screen.getByLabelText(/họ và tên/i), 'Nguyễn Văn Test');
  await u.type(screen.getByLabelText(/số điện thoại/i), '0912345678');
  await u.type(
    screen.getByLabelText(/nội dung/i),
    'Tôi cần tư vấn dịch vụ vận chuyển VLXD.'
  );
};

describe('ContactForm — rendering', () => {
  it('renders all required fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/số điện thoại/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nội dung/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gửi yêu cầu/i })).toBeInTheDocument();
  });

  it('renders optional company field', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/công ty/i)).toBeInTheDocument();
  });

  it('renders with light prop without crashing', () => {
    render(<ContactForm light />);
    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
  });
});

describe('ContactForm — validation', () => {
  it('shows error when fullName < 2 chars', async () => {
    const u = user();
    render(<ContactForm />);
    await u.type(screen.getByLabelText(/họ và tên/i), 'A');
    await u.click(screen.getByRole('button', { name: /gửi yêu cầu/i }));
    await waitFor(() =>
      expect(screen.getByText(/tối thiểu 2 ký tự/i)).toBeInTheDocument()
    );
  });

  it('shows error for invalid phone', async () => {
    const u = user();
    render(<ContactForm />);
    await u.type(screen.getByLabelText(/số điện thoại/i), '1234567890');
    await u.click(screen.getByRole('button', { name: /gửi yêu cầu/i }));
    await waitFor(() =>
      expect(screen.getByText(/số điện thoại không hợp lệ/i)).toBeInTheDocument()
    );
  });

  it('shows error when content < 10 chars', async () => {
    const u = user();
    render(<ContactForm />);
    await u.type(screen.getByLabelText(/nội dung/i), 'Too short');
    await u.click(screen.getByRole('button', { name: /gửi yêu cầu/i }));
    await waitFor(() =>
      expect(screen.getByText(/tối thiểu 10 ký tự/i)).toBeInTheDocument()
    );
  });

  it('clears error when corrected', async () => {
    const u = user();
    render(<ContactForm />);
    await u.click(screen.getByRole('button', { name: /gửi yêu cầu/i }));
    await waitFor(() => screen.getByText(/tối thiểu 2 ký tự/i));
    await u.type(screen.getByLabelText(/họ và tên/i), 'Nguyễn Văn A');
    await waitFor(() =>
      expect(screen.queryByText(/tối thiểu 2 ký tự/i)).not.toBeInTheDocument()
    );
  });
});

describe('ContactForm — submission', () => {
  it('shows success message after valid submit', async () => {
    const u = user();
    render(<ContactForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /gửi yêu cầu/i }));
    const el = await screen.findByText(/gửi thành công/i, {}, SUBMIT_WAIT);
    expect(el).toBeInTheDocument();
  });

  it('shows "Gửi yêu cầu khác" link after success', async () => {
    const u = user();
    render(<ContactForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /gửi yêu cầu/i }));
    const link = await screen.findByText(/gửi yêu cầu khác/i, {}, SUBMIT_WAIT);
    expect(link).toBeInTheDocument();
  });

  it('resets form after clicking "Gửi yêu cầu khác"', async () => {
    const u = user();
    render(<ContactForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /gửi yêu cầu/i }));
    await screen.findByText(/gửi yêu cầu khác/i, {}, SUBMIT_WAIT);
    await u.click(screen.getByText(/gửi yêu cầu khác/i));
    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
  });
});
