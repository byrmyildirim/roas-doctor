export interface AdProvider {
  id: string;
  name: string;
  connect(): Promise<void>;
  getAccounts(): Promise<AdAccount[]>;
  syncData(accountId: string): Promise<SyncReport>;
}

export interface AdAccount {
  id: string;
  name: string;
  currency: string;
}

export interface SyncReport {
  campaignsImported: number;
  adsImported: number;
  errors: string[];
}

export interface ShopifyProvider {
  syncProducts(): Promise<void>;
  syncCollections(): Promise<void>;
  getPageContent(handle: string): Promise<string>;
}
