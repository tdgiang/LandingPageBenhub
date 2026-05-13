import { describe, it, expect } from 'vitest';
import { POSTS, JOBS, TESTIMONIALS, CASE_STUDIES, STATS, CLIENT_LOGOS } from '@/lib/data';

describe('POSTS data integrity', () => {
  it('has at least 3 posts', () => {
    expect(POSTS.length).toBeGreaterThanOrEqual(3);
  });

  it('every post has required fields', () => {
    POSTS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.excerpt).toBeTruthy();
      expect(p.category).toMatch(/^(company|market|logistics)$/);
      expect(p.categoryLabel).toBeTruthy();
      expect(p.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('slugs are unique', () => {
    const slugs = POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('ids are unique', () => {
    const ids = POSTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('JOBS data integrity', () => {
  it('has at least 3 jobs', () => {
    expect(JOBS.length).toBeGreaterThanOrEqual(3);
  });

  it('every job has required fields', () => {
    JOBS.forEach((j) => {
      expect(j.id).toBeTruthy();
      expect(j.title).toBeTruthy();
      expect(j.location).toBeTruthy();
      expect(j.type).toBeTruthy();
      expect(Array.isArray(j.requirements)).toBe(true);
      expect(j.requirements.length).toBeGreaterThan(0);
      expect(Array.isArray(j.benefits)).toBe(true);
      expect(j.benefits.length).toBeGreaterThan(0);
    });
  });

  it('all active jobs have isActive=true', () => {
    const active = JOBS.filter((j) => j.isActive);
    expect(active.length).toBeGreaterThan(0);
  });
});

describe('TESTIMONIALS data integrity', () => {
  it('has at least 3 testimonials', () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(3);
  });

  it('every testimonial has name, role, company, content, and valid rating', () => {
    TESTIMONIALS.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.role).toBeTruthy();
      expect(t.company).toBeTruthy();
      expect(t.content.length).toBeGreaterThan(10);
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    });
  });
});

describe('STATS data integrity', () => {
  it('has exactly 4 stats', () => {
    expect(STATS).toHaveLength(4);
  });

  it('every stat has a positive numeric value and suffix', () => {
    STATS.forEach((s) => {
      expect(s.value).toBeGreaterThan(0);
      expect(s.suffix).toBeTruthy();
      expect(s.label).toBeTruthy();
    });
  });
});

describe('CLIENT_LOGOS data integrity', () => {
  it('has at least 4 logos', () => {
    expect(CLIENT_LOGOS.length).toBeGreaterThanOrEqual(4);
  });

  it('all logo entries are non-empty strings', () => {
    CLIENT_LOGOS.forEach((l) => expect(l.length).toBeGreaterThan(0));
  });
});

describe('CASE_STUDIES data integrity', () => {
  it('has at least 2 case studies', () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(2);
  });

  it('every case study has client, problem, solution and results', () => {
    CASE_STUDIES.forEach((cs) => {
      expect(cs.client).toBeTruthy();
      expect(cs.problem).toBeTruthy();
      expect(cs.solution).toBeTruthy();
      expect(cs.results.length).toBeGreaterThan(0);
    });
  });
});
