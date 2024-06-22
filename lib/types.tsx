export interface Audit {
  id: string;
  title: string;
  description: string;
  score: number;
  displayValue: string;
}

export interface Category {
  score: number;
  title: string;
}

export interface Audits {
  "first-contentful-paint": Audit;
  "first-meaningful-paint": Audit;
  "speed-index": Audit;
  "largest-contentful-paint": Audit;
  "cumulative-layout-shift": Audit;
}

export interface Categories {
  performance: Category;
  seo: Category;
  accessibility: Category;
  "best-practices": Category;
}

export interface LighthouseResult {
  categories: Categories;
  fetchTime: string;
  audits: Audits;
}

export interface ApiResponse {
  lighthouseResult: LighthouseResult;
}
