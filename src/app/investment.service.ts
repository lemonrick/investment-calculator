import {Injectable, signal} from "@angular/core";
import {InvestmentInputModel} from "./investment-input.model";
import {InvestmentResultModel} from "./investment-result.model";

@Injectable({providedIn: 'root'})
export class InvestmentService {
  resultData = signal<InvestmentResultModel[] | undefined>(undefined);
  lastInflationRate = signal<number>(0);

  clearResults() {
    this.resultData.set(undefined);
    this.lastInflationRate.set(0);
  }

  calculateInvestmentResults(data: InvestmentInputModel) {

    const { initialAmount, monthlyContribution, expectedReturn, duration, inflationRate, startingYear } = data;
    this.lastInflationRate.set(inflationRate);

    const monthlyRate = expectedReturn / 100 / 12; // Mesačný úrok
    const yearlyGrowthFactor = Math.pow(1 + monthlyRate, 12);
    const yearlyAnnuityFactor = monthlyRate === 0
      ? 12
      : (yearlyGrowthFactor - 1) / monthlyRate;
    let totalWithoutInflation = initialAmount; // Suma bez inflácie
    let totalWithInflation = initialAmount; // Suma s infláciou
    let netInvestedWithoutInflation = initialAmount; // Netto vložené peniaze (fixný príspevok)
    let netInvestedWithInflation = initialAmount; // Netto vložené peniaze (s infláciou príspevku)
    const currentMonthlyContribution = monthlyContribution; // Mesačný príspevok
    let currentMonthlyContributionWithInflation = monthlyContribution; // Mesačný príspevok s infláciou
    const results: InvestmentResultModel[] = []; // Výsledky pre každý rok

    // Iterujeme po rokoch a používame uzavretý vzorec pre 12 mesačných krokov.
    for (let year = 1; year <= duration; year++) {
      totalWithoutInflation = totalWithoutInflation * yearlyGrowthFactor + (currentMonthlyContribution * yearlyAnnuityFactor);
      netInvestedWithoutInflation += currentMonthlyContribution * 12;

      totalWithInflation = totalWithInflation * yearlyGrowthFactor + (currentMonthlyContributionWithInflation * yearlyAnnuityFactor);
      netInvestedWithInflation += currentMonthlyContributionWithInflation * 12;

      results.push({
        year: year,
        initialAmount: initialAmount,
        totalWithoutInflation: parseFloat(totalWithoutInflation.toFixed(2)), // Suma bez inflácie
        totalWithInflation: parseFloat(totalWithInflation.toFixed(2)),    // Suma s infláciou
        netInvestedWithoutInflation: parseFloat(netInvestedWithoutInflation.toFixed(2)), // Netto vložené peniaze (fixný príspevok)
        netInvestedWithInflation: parseFloat(netInvestedWithInflation.toFixed(2)), // Netto vložené peniaze (s infláciou)
        monthlyContribution: parseFloat(currentMonthlyContribution.toFixed(2)), // Mesačný príspevok
        monthlyContributionWithInflation: parseFloat(currentMonthlyContributionWithInflation.toFixed(2)), // Mesačný príspevok (+inflacia)
        startingYear: startingYear
      });

      // Zvýšime mesačný príspevok o infláciu pre ďalší rok.
      currentMonthlyContributionWithInflation *= (1 + inflationRate / 100);
    }

    this.resultData.set(results.reverse());

  }

}
