import {Component, inject} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {InvestmentService} from "../investment.service";

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  results = this.investmentService.resultData.asReadonly();

  get fixedMonthlyContribution(): number | null {
    const res = this.results();
    return res && res.length > 0 ? res[0].monthlyContribution : null;
  }
}
