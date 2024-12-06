export type IInvoiceDetail = {
  factorDetail: FactorDetail[];
  salePrice: number;
  cusSaleDate: string;
  cusDepName: string;
  factorID: number;
  finallyFactorPrice: number;
};

export interface FactorDetail {
  id: number;
  k_name: string;
  k_Price: number;
  k_Amount: number;
  kbArcode: string;
  vat: number;
  reduction: number;
  finallyPrice: number;
  finallyReduction: number;
  afterReduction: number;
}
