export interface ThemeConfig {
  primary: string;
  background: string;
}

export interface ActionObj {
  type: 'ADD_TO_CART' | 'DEEP_LINK' | string;
  payload: Record<string, unknown>;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  action: ActionObj;
}

export interface Section {
  id: string;
  type: string; // string, not union — SDUI is dynamic
  data: unknown;
}

export interface HomepagePayload {
  theme: ThemeConfig;
  campaign: string;
  sections: Section[];
}