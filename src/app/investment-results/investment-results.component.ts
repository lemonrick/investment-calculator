import {Component, effect, inject, signal} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {InvestmentService} from "../investment.service";
import {UiTextService} from "../ui-text.service";

@Component({
    selector: 'app-investment-results',
    imports: [CurrencyPipe],
    templateUrl: './investment-results.component.html',
    styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);
  uiText = inject(UiTextService);
  showInflationMode = signal(true);

  results = this.investmentService.resultData.asReadonly();

  constructor() {
    effect(() => {
      const res = this.results();
      if (!res || res.length === 0) {
        return;
      }

      this.showInflationMode.set(this.investmentService.lastInflationRate() !== 0);
    });
  }

  get fixedMonthlyContribution(): number | null {
    const res = this.results();
    return res && res.length > 0 ? res[0].monthlyContribution : null;
  }

  get equivalentFixedMonthlyContribution(): number | null {
    if (!this.showInflationMode()) {
      return null;
    }

    const res = this.results();
    if (!res || res.length === 0) {
      return null;
    }

    const latest = res[0];
    const months = latest.year * 12;
    if (months <= 0) {
      return null;
    }

    return (latest.netInvestedWithInflation - latest.initialAmount) / months;
  }

  toggleContributionMode() {
    this.showInflationMode.update((value) => !value);
  }
}
