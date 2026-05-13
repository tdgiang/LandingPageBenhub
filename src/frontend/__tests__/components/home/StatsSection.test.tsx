import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsSection from '@/components/home/StatsSection';

// useInView is mocked globally to return true — CountUp will animate to final value
describe('StatsSection', () => {
  it('renders all 4 stat labels', () => {
    render(<StatsSection />);
    expect(screen.getByText(/khách hàng b2b/i)).toBeInTheDocument();
    expect(screen.getByText(/tỉnh thành/i)).toBeInTheDocument();
    expect(screen.getByText(/chuyến\/tháng/i)).toBeInTheDocument();
    expect(screen.getByText(/tỷ lệ đúng hạn/i)).toBeInTheDocument();
  });

  it('renders subtitle text for each stat', () => {
    render(<StatsSection />);
    expect(screen.getByText(/đại lý & nhà thầu/i)).toBeInTheDocument();
    expect(screen.getByText(/phủ sóng toàn quốc/i)).toBeInTheDocument();
  });

  it('renders icons for each stat', () => {
    const { container } = render(<StatsSection />);
    // 4 icon wrappers
    const iconWrappers = container.querySelectorAll('svg');
    expect(iconWrappers.length).toBeGreaterThanOrEqual(4);
  });

  it('renders inside a section element', () => {
    const { container } = render(<StatsSection />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
