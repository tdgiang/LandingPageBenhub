import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScrollToTop from '@/components/shared/ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    window.scrollTo = vi.fn();
  });

  it('does not render the button when scrollY is 0', () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the button after scrolling past 300px', () => {
    render(<ScrollToTop />);
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByRole('button', { name: /cuộn lên/i })).toBeInTheDocument();
  });

  it('calls window.scrollTo with top:0 on button click', async () => {
    render(<ScrollToTop />);
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    const btn = screen.getByRole('button', { name: /cuộn lên/i });
    await userEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('button has accessible aria-label in Vietnamese', () => {
    render(<ScrollToTop />);
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByLabelText(/cuộn lên đầu trang/i)).toBeInTheDocument();
  });
});
