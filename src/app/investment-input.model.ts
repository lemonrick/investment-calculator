export interface InvestmentInputModel {
  initialAmount: number; // prvotna suma
  annualContribution: number; // mesacny prispevok
  expectedReturn: number; // percento navratnosti
  duration: number; //dlzka v rokoch
  inflationRate: number; // inflácia v percentách
}
