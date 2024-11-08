export interface ParsedData {
  month: string;
  [key: string]: number | string; 
}
export interface MonthData {
  month: string;
  [year: string]: number | string; 
}

export interface Record {
  Month: string; 
  UnitsSold: number; 
}
export interface Product {
  ProductID: string;
  Records: Record[]; 
  Product: string;
  Month: string;
}
export interface PredictionData {
    ProductID: string;
    Product: string;
    Month: string;
    UnitsSold: string
  }
