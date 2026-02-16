import { describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UserInputComponent } from './user-input.component';
import { UiTextService } from '../ui-text.service';
import { InvestmentService } from '../investment.service';

describe('UserInputComponent', () => {
  const setup = () => {
    TestBed.resetTestingModule();

    const investmentService = {
      calculateInvestmentResults: vi.fn(),
      clearResults: vi.fn()
    };

    TestBed.configureTestingModule({
      imports: [UserInputComponent],
      providers: [
        { provide: InvestmentService, useValue: investmentService },
        { provide: UiTextService, useValue: new UiTextService() }
      ]
    });

    const fixture = TestBed.createComponent(UserInputComponent);
    return { component: fixture.componentInstance, investmentService };
  };

  it('clears results on submit when values are invalid', () => {
    const { component, investmentService } = setup();
    component.enteredInitialInvestment.set('-10');

    component.onSubmit();

    expect(investmentService.calculateInvestmentResults).not.toHaveBeenCalled();
    expect(investmentService.clearResults).toHaveBeenCalledTimes(1);
  });

  it('submits valid values to the investment service', () => {
    const { component, investmentService } = setup();

    component.enteredInitialInvestment.set('1000');
    component.enteredMonthlyContribution.set('100');
    component.enteredExpectedReturn.set('8');
    component.enteredDuration.set('10');
    component.inflationRate.set('3');
    component.startingYear.set('2025');

    component.onSubmit();

    expect(investmentService.clearResults).not.toHaveBeenCalled();
    expect(investmentService.calculateInvestmentResults).toHaveBeenCalledWith({
      initialAmount: 1000,
      monthlyContribution: 100,
      expectedReturn: 8,
      duration: 10,
      inflationRate: 3,
      startingYear: 2025
    });
  });

  it('clears results during input changes when the form becomes invalid', () => {
    const { component, investmentService } = setup();
    component.enteredDuration.set('0');

    component.onInputChange();

    expect(investmentService.clearResults).toHaveBeenCalledTimes(1);
    expect(investmentService.calculateInvestmentResults).not.toHaveBeenCalled();
  });
});
