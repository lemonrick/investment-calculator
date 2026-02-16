import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { UiTextService } from '../ui-text.service';

const throttleMs = 50;

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

  it('should hide language switch when scrollY > 140', async () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    window.dispatchEvent(new Event('scroll'));
    await new Promise((r) => setTimeout(r, throttleMs + 20));
    expect(component.hideLanguageSwitch()).toBe(true);
  });

  it('should show language switch when scrollY <= 140', async () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    window.dispatchEvent(new Event('scroll'));
    await new Promise((r) => setTimeout(r, throttleMs + 20));
    expect(component.hideLanguageSwitch()).toBe(false);
  });
});
