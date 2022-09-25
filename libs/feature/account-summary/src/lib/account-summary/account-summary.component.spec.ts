import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { Account } from 'libs/shared/services/src/lib/account';
import { AccountSummaryComponent } from './account-summary.component';

describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve accounts', () => {
    expect.assertions(2);
    expect(component.accounts$).toBeTruthy();
    component.accounts$.subscribe((acc) => {
      expect(acc.length).toBe(4);
    });
  });

  describe('#filterAccounts', () => {
    it('should return filter accounts', () => {
      const accounts: Account[] = [
        { id: '1234', balance: 7500, currency: 'cad' },
        { id: '1235', balance: 4500, currency: 'cad' },
        { id: '1236', balance: 2102, currency: 'usd' },
      ];
      const filtered = component.filterAccounts(accounts, 'usd');
      expect(filtered).toEqual([
        { id: '1236', balance: 2102, currency: 'usd' },
      ]);
    });

    it('should return filter accounts', () => {
      const accounts: Account[] = [
        { id: '1234', balance: 7500, currency: 'cad' },
        { id: '1235', balance: 4500, currency: 'cad' },
        { id: '1236', balance: 2102, currency: 'usd' },
      ];
      const filtered = component.filterAccounts(accounts, '');
      expect(filtered).toEqual(accounts);
    });
  });
});
