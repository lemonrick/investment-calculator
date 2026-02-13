import {Component, HostListener, inject, signal} from '@angular/core';
import {UiTextService} from "../ui-text.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  uiText = inject(UiTextService);
  hideLanguageSwitch = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.hideLanguageSwitch.set(window.scrollY > 140);
  }
}
