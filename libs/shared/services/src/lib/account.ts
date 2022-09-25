export interface Account {
  id: string;
  balance: number;
  currency: string;
  [key: string]: string | number;
}
