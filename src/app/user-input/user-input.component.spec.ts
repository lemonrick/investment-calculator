import { describe, expect, it, vi } from 'vitest';
import { UserInputComponent } from './user-input.component';
import { UiTextService } from '../ui-text.service';

describe('UserInputComponent', () => {
  it('clears results on submit when values are invalid', () => {
    const investmentService = {
      calculateInvestmentResults: vi.fn(),
      clearResults: vi.fn()
    };
    const component = new UserInputComponent(investmentService as never, new UiTextService());
    component.enteredInitialInvestment.set('-10');

    component.onSubmit();

    expect(investmentService.calculateInvestmentResults).not.toHaveBeenCalled();
    expect(investmentService.clearResults).toHaveBeenCalledTimes(1);
  });

  it('submits valid values to the investment service', () => {
    const investmentService = {
      calculateInvestmentResults: vi.fn(),
      clearResults: vi.fn()
    };
    const component = new UserInputComponent(investmentService as never, new UiTextService());

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
    const investmentService = {
      calculateInvestmentResults: vi.fn(),
      clearResults: vi.fn()
    };
    const component = new UserInputComponent(investmentService as never, new UiTextService());
    component.enteredDuration.set('0');

    component.onInputChange();

    expect(investmentService.clearResults).toHaveBeenCalledTimes(1);
    expect(investmentService.calculateInvestmentResults).not.toHaveBeenCalled();
  });
});
