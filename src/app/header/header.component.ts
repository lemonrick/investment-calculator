import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map, throttleTime } from 'rxjs';
import { UiTextService } from '../ui-text.service';

const SCROLL_THRESHOLD = 140;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  uiText = inject(UiTextService);
  private destroyRef = inject(DestroyRef);
  hideLanguageSwitch = signal(false);

  ngOnInit(): void {
    fromEvent(window, 'scroll', { passive: true })
      .pipe(
        throttleTime(50),
        map(() => window.scrollY > SCROLL_THRESHOLD),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((hide) => this.hideLanguageSwitch.set(hide));
  }
}
