import {Component, inject} from '@angular/core';
import {UiTextService} from "../ui-text.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  uiText = inject(UiTextService);
}
