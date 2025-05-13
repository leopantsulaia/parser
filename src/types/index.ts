export interface Product {
  id: string;
  name: string;
  price: string;
  websiteName: "zoommer.ge" | "alta.ge" | "ee.ge" | "pcshop.ge" | string; // Allow specific plus general string
  url: string;
  imageUrl?: string;
}
