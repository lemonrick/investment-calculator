import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { UiTextService } from '../ui-text.service';

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [UiTextService]
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should hide language switch when scrollY > 140', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    component.onWindowScroll();
    expect(component.hideLanguageSwitch()).toBe(true);
  });

  it('should show language switch when scrollY <= 140', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    component.onWindowScroll();
    expect(component.hideLanguageSwitch()).toBe(false);
  });
});
