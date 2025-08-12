// Centralized types for Vendor Admin pages

export type FormProduct = {
  name: string;
  slug: string;
  description: string;
  thumbnail: File | undefined | null;
  category_id: string;
  brand_id: string;
  sale_price: string;
  sale_start: string;
  sale_end: string;
  stock_quantity: string;
  stock_status: string;
  images: File[];
  weight: string;
  length: string;
  width: string;
  height: string;
  sku: string;
  price: string;
  stock: string;
  return_days: string;
  warranty_type: string;
  warranty_period: string;
  meta_title: string;
  meta_description: string;
  tags: string;
};
