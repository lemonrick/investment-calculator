import {Component, inject, signal} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {InvestmentService} from "../investment.service";

@Component({
    selector: 'app-investment-results',
    imports: [CurrencyPipe],
    templateUrl: './investment-results.component.html',
    styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);
  showNetInvested = signal(true);

  results = this.investmentService.resultData.asReadonly();

  get fixedMonthlyContribution(): number | null {
    const res = this.results();
    return res && res.length > 0 ? res[0].monthlyContribution : null;
  }

  get equivalentFixedMonthlyContribution(): number | null {
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

  toggleFixedContributionColumn() {
    this.showNetInvested.update((value) => !value);
  }
}
