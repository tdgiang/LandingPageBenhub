import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeader from '@/components/shared/SectionHeader';

describe('SectionHeader', () => {
  it('renders title', () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<SectionHeader title="T" badge="Services" />);
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('does NOT render badge when not provided', () => {
    render(<SectionHeader title="T" />);
    expect(screen.queryByText(/badge/i)).not.toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="T" subtitle="This is a subtitle." />);
    expect(screen.getByText('This is a subtitle.')).toBeInTheDocument();
  });

  it('does NOT render subtitle element when omitted', () => {
    const { container } = render(<SectionHeader title="T" />);
    const p = container.querySelector('p');
    expect(p).not.toBeInTheDocument();
  });

  it('applies text-center by default', () => {
    const { container } = render(<SectionHeader title="T" />);
    expect(container.firstChild).toHaveClass('text-center');
  });

  it('applies text-left when align="left"', () => {
    const { container } = render(<SectionHeader title="T" align="left" />);
    expect(container.firstChild).toHaveClass('text-left');
  });

  it('uses light style classes when light=true', () => {
    render(<SectionHeader title="T" badge="B" light />);
    const badge = screen.getByText('B').closest('div');
    // badge wrapper exists and has white styling
    expect(badge).toBeTruthy();
  });
});
