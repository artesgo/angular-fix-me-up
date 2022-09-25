import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'pre-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() userName: Observable<string> = of('');
}
