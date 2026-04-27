export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000/api',
  mainUrl: 'http://localhost:5000/',
  access_token_name: 'access_token',
  refresh_token_name: 'refresh-token',
  permission_codes_name: 'permission-codes',
  logout_event_name: 'logout-event',
  user_email: '',
  access_time: 'access_time'
};

export const participantTypeEnum = {
  adult: 1,
  child: 2,
  none: 3
}

export const participantEnum = {
  personal: 1,
  group: 2,
  closedGroup: 3,
  none: 4
}

export enum daysEnum {
  Pazar = 0,
  Pazartesi = 1,
  Sali = 2,
  Carsamba = 3,
  Persembe = 4,
  Cuma = 5,
  Cumartesi = 6
}

export interface almulaDays {
  id: number;
  dayName: string;
}

export enum TransactionTypeEnum {
  PaketSatis = 1,
  UrunSatis = 2,
  Hakedis = 3,
  UrunAlis = 4,
  Tahsilat = 5,
  Odeme = 6
}

export enum CashBoxTypeEnum {
  Cash = 1,
  Bank = 2
}

export enum PersonTypeEnum {
  Staff = 1,
  Supplier = 2,
  Customer = 3
}

export enum SalaryTypeEnum {
  Monthly = 1,
  Weekly = 2,
  Daily = 3,
  Seance = 5
}
