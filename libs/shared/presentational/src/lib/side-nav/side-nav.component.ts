import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SideNavItem } from '../models/side-nav';

@Component({
  selector: 'pre-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  @Input() sideNavItems: SideNavItem[] = [];
}
