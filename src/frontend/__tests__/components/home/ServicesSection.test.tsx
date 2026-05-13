import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesSection from '@/components/home/ServicesSection';

describe('ServicesSection', () => {
  it('renders the section title', () => {
    render(<ServicesSection />);
    expect(screen.getByText(/giải pháp vận chuyển toàn diện/i)).toBeInTheDocument();
  });

  it('renders all 4 service card titles', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Giao hàng VLXD')).toBeInTheDocument();
    expect(screen.getByText('Điều phối xe tải')).toBeInTheDocument();
    expect(screen.getByText('Dịch vụ bốc xếp')).toBeInTheDocument();
    expect(screen.getByText('Giao ngoài giờ')).toBeInTheDocument();
  });

  it('renders numbered badges 01 through 04', () => {
    render(<ServicesSection />);
    ['01', '02', '03', '04'].forEach((n) =>
      expect(screen.getByText(n)).toBeInTheDocument()
    );
  });

  it('renders 4 "Xem chi tiết" links', () => {
    render(<ServicesSection />);
    expect(screen.getAllByText(/xem chi tiết/i)).toHaveLength(4);
  });

  it('all service links point to /dich-vu anchors', () => {
    render(<ServicesSection />);
    const links = screen.getAllByRole('link', { name: /xem chi tiết/i });
    links.forEach((link) =>
      expect(link.getAttribute('href')).toMatch(/^\/dich-vu#/)
    );
  });

  it('renders section inside a <section> tag', () => {
    const { container } = render(<ServicesSection />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
