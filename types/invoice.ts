export type IInvoiceDetail = {
  factorDetail: FactorDetail[];
  salePrice: number;
  cusSaleDate: string;
  cusDepName: string;
  factorID: number;
  finalReductionPrice: number;
  finallyFactorPrice: number;
  salePriceAfterReduction: number;
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
  finallyPriceAfterReduction: number;
  kVatPrice: number;
}
export interface IInvoice {
  factorID: number;
  cusDepName: string;
  salePrice: number;
  cusSaleDate: string;
  hasSurvey: boolean;
  isComplete: boolean;
  transactionID: string;
}

///////////////////////////////////////

export interface IInvoiceId {
  id: 1;
  sourceId: string;
  purchaseDate: string;
  payAmount: number;
  vat: number;
  fullAddress: string;
  giftUsedAmount: number;
  discountPercent: number;
  discountPrice: number;
  additionalAmount: number;
  customerId: number;
  totalPrice: number;
  vatPrice: number;
  finalPrice: number;
}
