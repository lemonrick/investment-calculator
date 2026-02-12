export interface InvestmentResultModel {
  year: number; // Rok
  initialAmount: number; // Počiatočná suma
  totalWithoutInflation: number; // Suma bez inflácie
  totalWithInflation: number; // Suma s infláciou
  netInvestedWithInflation: number; // Netto vložené peniaze (príspevok + inflácia)
  monthlyContribution: number; // Mesačný príspevok
  monthlyContributionWithInflation: number; // Mesačný príspevok (+inflacia)
  startingYear: number; // Rok začiatku napr. 2025
}
