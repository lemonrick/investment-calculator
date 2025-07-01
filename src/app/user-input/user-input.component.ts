import {Component, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InvestmentService} from "../investment.service";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('100');
  enteredExpectedReturn = signal('8');
  enteredDuration = signal('30');
  inflationRate = signal('4');

  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialAmount: +this.enteredInitialInvestment(),
      annualContribution: +this.enteredAnnualInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredDuration(),
      inflationRate: +this.inflationRate()
    })
    /* this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('100');
    this.enteredExpectedReturn.set('8');
    this.enteredDuration.set('30');
    this.inflationRate.set('4'); */
  }

}
