import { CommonFieldsModel } from './common-fields.model';
export interface Product extends CommonFieldsModel {
     id?: string;

  code?: string;
  name?: string;

  basePrice?: number;
  gstPercent?: number;
  priceWithGST?: number;

  category?: string;

  taxType?: 'HSN' | 'SAC';
  taxCode?: string;

  discountPercent?: number;
  discountedPrice?: number;

  inStock?: boolean;
  stockQty?: number;

  allowPurchase?: boolean;
}
