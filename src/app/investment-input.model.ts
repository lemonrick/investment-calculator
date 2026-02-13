export interface InvestmentInputModel {
  initialAmount: number; // prvotna suma
  monthlyContribution: number; // mesacny prispevok
  expectedReturn: number; // percento navratnosti
  duration: number; //dlzka v rokoch
  inflationRate: number; // inflácia v percentách
  startingYear: number; // Rok začiatku napr. 2025
}
