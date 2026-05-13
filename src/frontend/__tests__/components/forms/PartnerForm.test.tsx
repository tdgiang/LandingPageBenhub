import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PartnerForm from '@/components/forms/PartnerForm';

const user = () => userEvent.setup();
const SUBMIT_WAIT = { timeout: 5000 };

const fillValid = async (u: ReturnType<typeof userEvent.setup>) => {
  await u.type(screen.getByLabelText(/họ và tên/i), 'Tài xế Nguyễn');
  await u.type(screen.getByLabelText(/số điện thoại/i), '0987654321');
  await u.selectOptions(screen.getByLabelText(/loại xe/i), '5T');
  await u.type(screen.getByLabelText(/khu vực hoạt động/i), 'Hà Nội, Bắc Ninh');
};

describe('PartnerForm — rendering', () => {
  it('renders all required fields', () => {
    render(<PartnerForm />);
    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/số điện thoại/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loại xe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/khu vực hoạt động/i)).toBeInTheDocument();
  });

  it('renders all 6 vehicle type options', () => {
    render(<PartnerForm />);
    const select = screen.getByLabelText(/loại xe/i) as HTMLSelectElement;
    const values = Array.from(select.options).map((o) => o.value).filter(Boolean);
    expect(values).toEqual(['500kg', '1T', '2.5T', '5T', '10T', '15T']);
  });

  it('renders the submit button', () => {
    render(<PartnerForm />);
    expect(screen.getByRole('button', { name: /đăng ký trở thành đối tác/i })).toBeInTheDocument();
  });

  it('renders optional note field', () => {
    render(<PartnerForm />);
    expect(screen.getByLabelText(/ghi chú/i)).toBeInTheDocument();
  });
});

describe('PartnerForm — validation', () => {
  it('shows error for invalid phone format', async () => {
    const u = user();
    render(<PartnerForm />);
    await u.type(screen.getByLabelText(/số điện thoại/i), '123');
    await u.click(screen.getByRole('button', { name: /đăng ký trở thành đối tác/i }));
    await waitFor(() =>
      expect(screen.getByText(/số điện thoại không hợp lệ/i)).toBeInTheDocument()
    );
  });

  it('shows error when fullName is missing', async () => {
    const u = user();
    render(<PartnerForm />);
    await u.click(screen.getByRole('button', { name: /đăng ký trở thành đối tác/i }));
    await waitFor(() =>
      expect(screen.getByText(/vui lòng nhập họ tên/i)).toBeInTheDocument()
    );
  });

  it('shows error when area is too short', async () => {
    const u = user();
    render(<PartnerForm />);
    await u.type(screen.getByLabelText(/họ và tên/i), 'Driver');
    await u.type(screen.getByLabelText(/số điện thoại/i), '0987654321');
    await u.selectOptions(screen.getByLabelText(/loại xe/i), '5T');
    await u.type(screen.getByLabelText(/khu vực hoạt động/i), 'H');
    await u.click(screen.getByRole('button', { name: /đăng ký trở thành đối tác/i }));
    await waitFor(() =>
      expect(screen.getByText(/vui lòng nhập khu vực/i)).toBeInTheDocument()
    );
  });
});

describe('PartnerForm — submission', () => {
  it('shows success after valid submit', async () => {
    const u = user();
    render(<PartnerForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /đăng ký trở thành đối tác/i }));
    const el = await screen.findByText(/đăng ký thành công/i, {}, SUBMIT_WAIT);
    expect(el).toBeInTheDocument();
  });

  it('shows "Đăng ký tài xế khác" after success', async () => {
    const u = user();
    render(<PartnerForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /đăng ký trở thành đối tác/i }));
    const link = await screen.findByText(/đăng ký tài xế khác/i, {}, SUBMIT_WAIT);
    expect(link).toBeInTheDocument();
  });

  it('resets after "Đăng ký tài xế khác"', async () => {
    const u = user();
    render(<PartnerForm />);
    await fillValid(u);
    await u.click(screen.getByRole('button', { name: /đăng ký trở thành đối tác/i }));
    await screen.findByText(/đăng ký tài xế khác/i, {}, SUBMIT_WAIT);
    await u.click(screen.getByText(/đăng ký tài xế khác/i));
    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
  });
});
