import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'libs/shared/services/src/lib/account.service';
import { Account } from 'libs/shared/services/src/lib/account';
import { map } from 'rxjs';

@Component({
  selector: 'angular-anim-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent {
  accountDetails$ = this.accountService
    .getAccounts()
    .pipe(
      map((account: Account[]) =>
        account.find(
          (item: Account) => item.id === this.route.snapshot.params['id']
        )
      )
    );

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}
}
