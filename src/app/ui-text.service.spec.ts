import { beforeEach, describe, expect, it } from 'vitest';
import { UiTextService } from './ui-text.service';

describe('UiTextService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads saved language from localStorage', () => {
    localStorage.setItem('investment-calculator.language', 'sk');

    const service = new UiTextService();

    expect(service.language()).toBe('sk');
    expect(service.t('calculate')).toBe('Vypočítať');
  });

  it('persists language change to localStorage', () => {
    const service = new UiTextService();

    service.setLanguage('sk');

    expect(service.language()).toBe('sk');
    expect(localStorage.getItem('investment-calculator.language')).toBe('sk');
  });

  it('uses default language when localStorage is empty', () => {
    const service = new UiTextService();
    expect(service.language()).toBe('en');
    expect(service.t('calculate')).toBe('Calculate');
  });

  it('t() replaces template params', () => {
    const service = new UiTextService();
    expect(service.t('overYears', { years: 10 })).toBe('over 10 years:');
  });
});
