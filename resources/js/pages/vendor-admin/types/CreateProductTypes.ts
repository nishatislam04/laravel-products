export type CreateFormProduct = {
  name: string;
  slug: string;
  description: string;
  thumbnail?: File | null | undefined;
  images: File[];
  category_id: string;
  brand_id: string;
  price: string;
  sale_price: string;
  sale_start: string; // ISO string
  sale_end: string;   // ISO string
  sku: string;
  stock: string;
  stock_quantity?: string; // keeping for compatibility if used elsewhere
  stock_status: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  return_days: string;
  warranty_type: string;
  warranty_period: string;
  meta_title: string;
  meta_description: string;
  tags: string;
};
