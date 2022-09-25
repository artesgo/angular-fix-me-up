import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Account } from 'libs/shared/services/src/lib/account';
import { AccountService } from 'libs/shared/services/src/lib/account.service';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'sum-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSummaryComponent implements OnInit {
  displayedColumns = [
    { type: 'default', key: 'id', label: 'Account Name' },
    { type: 'default', key: 'balance', label: 'Balance' },
    {
      type: 'select',
      key: 'currency',
      formControl: 'currency',
      label: 'Account Type',
      options: [
        { value: '', label: 'None' },
        { value: 'cad', label: 'CAD' },
        { value: 'usd', label: 'USD' },
      ],
    },
  ];

  accounts$: Observable<any> = this.accountService.getAccounts().pipe(
    switchMap((accounts: Account[]) =>
      (this.accountsForm.controls as Record<string, FormControl>)[
        'currency'
      ].valueChanges.pipe(
        startWith(''),
        map((value: string) => this.filterAccounts(accounts, value))
      )
    )
  );

  accountsForm = new FormGroup({});
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.displayedColumns.forEach((column) => {
      if (column?.formControl) {
        this.accountsForm.addControl(column.key, new FormControl(''));
      }
    });
  }

  filterAccounts(accounts: Account[], value: string): Account[] {
    return accounts.filter((acc) => acc.currency === value || value === '');
  }
}
