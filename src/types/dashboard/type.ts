export type PayData = {
  [key: string]: number | string | string[];
  amount: number;
  category: string;
  created_at: string;
  date: string;
  id: number;
  location: string;
  riskLevel: string | number;
  tags: string[];
  type: string;
};

export type GroupedByData = {
  expense: PayData[];
  income: PayData[];
};
