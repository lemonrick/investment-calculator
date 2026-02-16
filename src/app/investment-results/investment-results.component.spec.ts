import { TestBed } from '@angular/core/testing';
import { InvestmentResultsComponent } from './investment-results.component';
import { InvestmentService } from '../investment.service';
import { UiTextService } from '../ui-text.service';

describe('InvestmentResultsComponent', () => {
  let investmentService: InvestmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestmentResultsComponent],
      providers: [InvestmentService, UiTextService]
    });
    investmentService = TestBed.inject(InvestmentService);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InvestmentResultsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('fixedMonthlyContribution returns first result monthlyContribution when results exist', () => {
    investmentService.calculateInvestmentResults({
      initialAmount: 0,
      monthlyContribution: 100,
      expectedReturn: 0,
      duration: 2,
      inflationRate: 0,
      startingYear: 2025
    });
    const fixture = TestBed.createComponent(InvestmentResultsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.fixedMonthlyContribution).toBe(100);
  });

  it('equivalentFixedMonthlyContribution returns null when inflation is 0', () => {
    investmentService.calculateInvestmentResults({
      initialAmount: 0,
      monthlyContribution: 100,
      expectedReturn: 0,
      duration: 2,
      inflationRate: 0,
      startingYear: 2025
    });
    const fixture = TestBed.createComponent(InvestmentResultsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.showInflationMode()).toBe(false);
    expect(fixture.componentInstance.equivalentFixedMonthlyContribution).toBeNull();
  });

  it('toggleContributionMode flips showInflationMode', () => {
    investmentService.calculateInvestmentResults({
      initialAmount: 0,
      monthlyContribution: 100,
      expectedReturn: 0,
      duration: 1,
      inflationRate: 5,
      startingYear: 2025
    });
    const fixture = TestBed.createComponent(InvestmentResultsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const initial = component.showInflationMode();
    component.toggleContributionMode();
    expect(component.showInflationMode()).toBe(!initial);
  });
});
