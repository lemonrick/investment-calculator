import { describe, expect, it } from 'vitest';
import { InvestmentService } from './investment.service';

describe('InvestmentService', () => {
  it('calculates fixed contributions with zero return and zero inflation', () => {
    const service = new InvestmentService();

    service.calculateInvestmentResults({
      initialAmount: 0,
      monthlyContribution: 100,
      expectedReturn: 0,
      duration: 2,
      inflationRate: 0,
      startingYear: 2025
    });

    const results = service.resultData();
    expect(results).toBeDefined();
    expect(results!.length).toBe(2);

    const latestYear = results![0];
    const firstYear = results![1];

    expect(latestYear.year).toBe(2);
    expect(latestYear.totalWithoutInflation).toBe(2400);
    expect(latestYear.totalWithInflation).toBe(2400);
    expect(latestYear.netInvestedWithoutInflation).toBe(2400);
    expect(latestYear.netInvestedWithInflation).toBe(2400);

    expect(firstYear.year).toBe(1);
    expect(firstYear.totalWithoutInflation).toBe(1200);
  });

  it('applies inflation only to the contribution for subsequent years', () => {
    const service = new InvestmentService();

    service.calculateInvestmentResults({
      initialAmount: 0,
      monthlyContribution: 100,
      expectedReturn: 0,
      duration: 2,
      inflationRate: 10,
      startingYear: 2025
    });

    const results = service.resultData();
    expect(results).toBeDefined();
    expect(results!.length).toBe(2);

    const latestYear = results![0];
    const firstYear = results![1];

    expect(firstYear.monthlyContributionWithInflation).toBe(100);
    expect(latestYear.monthlyContributionWithInflation).toBe(110);
    expect(latestYear.netInvestedWithInflation).toBe(2520);
    expect(latestYear.totalWithInflation).toBe(2520);
  });

  it('calculates positive return using annuity + lump sum formula', () => {
    const service = new InvestmentService();

    service.calculateInvestmentResults({
      initialAmount: 1000,
      monthlyContribution: 100,
      expectedReturn: 12,
      duration: 1,
      inflationRate: 0,
      startingYear: 2025
    });

    const results = service.resultData();
    expect(results).toBeDefined();
    expect(results!.length).toBe(1);

    const yearOne = results![0];
    expect(yearOne.totalWithoutInflation).toBe(2395.08);
    expect(yearOne.netInvestedWithoutInflation).toBe(2200);
  });

  it('clears results and inflation state', () => {
    const service = new InvestmentService();

    service.calculateInvestmentResults({
      initialAmount: 100,
      monthlyContribution: 1,
      expectedReturn: 1,
      duration: 1,
      inflationRate: 5,
      startingYear: 2025
    });
    expect(service.resultData()).toBeDefined();
    expect(service.lastInflationRate()).toBe(5);

    service.clearResults();

    expect(service.resultData()).toBeUndefined();
    expect(service.lastInflationRate()).toBe(0);
  });
});
