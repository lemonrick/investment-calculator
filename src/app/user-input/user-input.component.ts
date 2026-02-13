import {Component, OnInit, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InvestmentService} from "../investment.service";
import {UiTextService} from "../ui-text.service";
import {InvestmentInputModel} from "../investment-input.model";

@Component({
    selector: 'app-user-input',
    imports: [
        FormsModule
    ],
    templateUrl: './user-input.component.html',
    styleUrl: './user-input.component.css'
})
export class UserInputComponent implements OnInit {
  enteredInitialInvestment = signal('0');
  enteredMonthlyContribution = signal('100');
  enteredExpectedReturn = signal('8');
  enteredDuration = signal('35');
  inflationRate = signal('4');
  startingYear = signal('2025');

  constructor(
    private investmentService: InvestmentService,
    public uiText: UiTextService
  ) {}

  ngOnInit(): void {
    this.onSubmit();
  }

  private getValidatedInput(): InvestmentInputModel | null {
    const initialAmount = +this.enteredInitialInvestment();
    const monthlyContribution = +this.enteredMonthlyContribution();
    const expectedReturn = +this.enteredExpectedReturn();
    const duration = +this.enteredDuration();
    const inflationRate = +this.inflationRate();
    const startingYear = +this.startingYear();

    const hasInvalidNumber = [initialAmount, monthlyContribution, expectedReturn, duration, inflationRate, startingYear]
      .some((value) => Number.isNaN(value));
    const hasInvalidRange = initialAmount < 0
      || monthlyContribution < 1
      || expectedReturn < 0
      || inflationRate < 0
      || duration < 1
      || !Number.isInteger(duration)
      || startingYear < 2000
      || startingYear > 3000
      || !Number.isInteger(startingYear);

    if (hasInvalidNumber || hasInvalidRange) {
      return null;
    }

    return {
      initialAmount,
      monthlyContribution,
      expectedReturn,
      duration,
      inflationRate,
      startingYear
    };
  }

  onInputChange() {
    const input = this.getValidatedInput();
    if (!input) {
      this.investmentService.clearResults();
    }
  }

  onSubmit() {
    const input = this.getValidatedInput();
    if (!input) {
      this.investmentService.clearResults();
      return;
    }

    this.investmentService.calculateInvestmentResults(input);
    /* this.enteredInitialInvestment.set('0');
    this.enteredMonthlyContribution.set('100');
    this.enteredExpectedReturn.set('8');
    this.enteredDuration.set('35');
    this.inflationRate.set('4'); */
  }

}
