export interface InvestmentResultModel {
  year: number; // Rok
  totalWithoutInflation: number; // Suma bez inflácie
  totalWithInflation: number; // Suma s infláciou
  monthlyContribution: number; // Mesačný príspevok
  monthlyContributionWithInflation: number; // Mesačný príspevok (+inflacia)
}
