import {Injectable, signal} from "@angular/core";
import {InvestmentInputModel} from "./investment-input.model";
import {InvestmentResultModel} from "./investment-result.model";

@Injectable({providedIn: 'root'})
export class InvestmentService {
  resultData = signal<InvestmentResultModel[] | undefined>(undefined);
  lastInflationRate = signal<number>(0);

  calculateInvestmentResults(data: InvestmentInputModel) {

    const { initialAmount, annualContribution, expectedReturn, duration, inflationRate, startingYear } = data;
    this.lastInflationRate.set(inflationRate);

    const monthlyRate = expectedReturn / 100 / 12; // Mesačný úrok
    const totalMonths = duration * 12; // Celkový počet mesiacov
    let totalWithoutInflation = initialAmount + 1; // Suma bez inflácie
    let totalWithInflation = initialAmount + 1; // Suma s infláciou
    let netInvestedWithoutInflation = initialAmount; // Netto vložené peniaze (fixný príspevok)
    let netInvestedWithInflation = initialAmount; // Netto vložené peniaze (s infláciou príspevku)
    let currentAnnualContribution = annualContribution * 12; // Ročný príspevok
    let currentAnnualContributionWithInflation = annualContribution * 12; // Ročný príspevok s infláciou
    const results = []; // Výsledky pre každý rok

    // Iterujeme cez každý mesiac počas celej doby investície
    for (let month = 1; month <= totalMonths; month++) {
      // Bez inflácie: mesačný príspevok sa nepridáva k hodnotám
      totalWithoutInflation *= (1 + monthlyRate);
      totalWithoutInflation += currentAnnualContribution / 12; // Príspevok je rovnaký každý mesiac
      netInvestedWithoutInflation += currentAnnualContribution / 12;

      // S infláciou: mesačný príspevok sa zvyšuje o infláciu
      totalWithInflation *= (1 + monthlyRate);
      totalWithInflation += currentAnnualContributionWithInflation / 12;
      netInvestedWithInflation += currentAnnualContributionWithInflation / 12;

      // Na konci každého roka vypočítame a uložíme výsledky
      if (month % 12 === 0) {
        const year = month / 12;

        // Vložíme výsledky do poľa
        results.push({
          year: year,
          initialAmount: initialAmount,
          totalWithoutInflation: parseFloat(totalWithoutInflation.toFixed(2)), // Suma bez inflácie
          totalWithInflation: parseFloat(totalWithInflation.toFixed(2)),    // Suma s infláciou
          netInvestedWithoutInflation: parseFloat(netInvestedWithoutInflation.toFixed(2)), // Netto vložené peniaze (fixný príspevok)
          netInvestedWithInflation: parseFloat(netInvestedWithInflation.toFixed(2)), // Netto vložené peniaze (s infláciou)
          monthlyContribution: parseFloat((currentAnnualContribution / 12).toFixed(2)), // Mesačný príspevok
          monthlyContributionWithInflation: parseFloat((currentAnnualContributionWithInflation / 12).toFixed(2)), // Mesačný príspevok (+inflacia)
          startingYear: startingYear
        });

        // Zvýšime ročný príspevok o infláciu pre ďalší rok
        currentAnnualContributionWithInflation *= (1 + inflationRate / 100);
      }
    }

    this.resultData.set(results.reverse());

  }

}
