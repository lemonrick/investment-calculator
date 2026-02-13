import {Injectable, signal} from '@angular/core';

type Language = 'en' | 'sk';

const translations = {
  en: {
    headerTitle: 'Investment Calculator',
    headerSubtitle: 'S&P 500 Index',
    initialInvestment: 'Initial investment',
    monthlyContribution: 'Monthly contribution',
    expectedAnnualReturn: 'Expected annual return',
    annualInflation: 'Annual contribution increase',
    investmentDurationYears: 'Investment duration (years)',
    startYear: 'Start year',
    calculate: 'Calculate',
    fillOutForm: 'Fill out the form and press "Calculate".',
    equivalentFixedMonthlyContribution: 'Equivalent fixed monthly contribution',
    overYears: 'over {{years}} years:',
    year: 'Year',
    monthlyContributionAdjustedForInflation: 'Monthly contribution adjusted for inflation',
    fixedMonthlyContribution: 'Fixed monthly contribution',
    netInvestedWithInflationAdjustedContribution: 'Net invested with inflation-adjusted contribution',
    netInvestedWithFixedMonthlyContribution: 'Net invested with fixed monthly contribution',
    portfolioValueWithInflationAdjustedContribution: 'Portfolio value with inflation-adjusted contribution',
    portfolioValueWithFixedMonthlyContribution: 'Portfolio value with fixed monthly contribution'
  },
  sk: {
    headerTitle: 'Investičná kalkulačka',
    headerSubtitle: 'S&P 500 Index',
    initialInvestment: 'Počiatočná investícia',
    monthlyContribution: 'Mesačný príspevok',
    expectedAnnualReturn: 'Očakávaný ročný výnos',
    annualInflation: 'Ročný nárast príspevku',
    investmentDurationYears: 'Dĺžka investície (roky)',
    startYear: 'Počiatočný rok',
    calculate: 'Vypočítať',
    fillOutForm: 'Vyplňte formulár a stlačte "Vypočítať".',
    equivalentFixedMonthlyContribution: 'Ekvivalentný fixný mesačný príspevok',
    overYears: 'za {{years}} rokov:',
    year: 'Rok',
    monthlyContributionAdjustedForInflation: 'Mesačný príspevok upravený o infláciu',
    fixedMonthlyContribution: 'Fixný mesačný príspevok',
    netInvestedWithInflationAdjustedContribution: 'Celkovo vložené pri inflačne upravenom príspevku',
    netInvestedWithFixedMonthlyContribution: 'Celkovo vložené pri fixnom mesačnom príspevku',
    portfolioValueWithInflationAdjustedContribution: 'Hodnota portfólia pri inflačne upravenom príspevku',
    portfolioValueWithFixedMonthlyContribution: 'Hodnota portfólia pri fixnom mesačnom príspevku'
  }
} as const;

type TranslationKey = keyof typeof translations.en;
const LANGUAGE_STORAGE_KEY = 'investment-calculator.language';

@Injectable({providedIn: 'root'})
export class UiTextService {
  language = signal<Language>('en');

  constructor() {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'en' || savedLanguage === 'sk') {
      this.language.set(savedLanguage);
    }
  }

  setLanguage(language: Language) {
    this.language.set(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }

  t(key: TranslationKey, params?: Record<string, string | number>): string {
    const template = translations[this.language()][key];
    if (!params) {
      return template;
    }

    return template.replace(/\{\{\s*(\w+)\s*}}/g, (_, placeholder: string) => {
      const value = params[placeholder];
      return value === undefined ? '' : String(value);
    });
  }
}
