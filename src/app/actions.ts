"use server";

import type { Product } from "@/types";

// Mock data - in a real app, this would come from scraping/AI flows
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'ASUS ROG Strix G16 G614JV-N3011', price: '3200 GEL', websiteName: 'zoommer.ge', url: 'https://zoommer.ge/products/computers-and-accessories/laptops/asus-rog-strix-g16-g614jv-n3011-16-0-fhd-ips-165hz-i7-13650hx-16gb-ssd512gb-rtx-4060-8gb', imageUrl: 'https://picsum.photos/seed/laptop1/300/200' },
  { id: '2', name: 'Apple MacBook Air 13 M1', price: '2850 GEL', websiteName: 'alta.ge', url: 'https://alta.ge/notebooks-and-accessories/notebooks/apple-macbook-air-13-m1-chip-8-core-cpu-7-core-gpu-8gb-256gb-ssd-space-gray-2020.html', imageUrl: 'https://picsum.photos/seed/macbook/300/200' },
  { id: '3', name: 'Lenovo IdeaPad Slim 5 16IRL8', price: '2100 GEL', websiteName: 'ee.ge', url: 'https://ee.ge/products/noutbuki-lenovo-ideapad-slim-5-16irl8-82xf0060rk', imageUrl: 'https://picsum.photos/seed/lenovo/300/200' },
  { id: '4', name: 'HP Victus Gaming 15-FA1093DX', price: '2500 GEL', websiteName: 'pcshop.ge', url: 'https://pcshop.ge/product/hp-victus-gaming-15-fa1093dx-15-6-intel-core-i5-13420h-8gb-512gb-ssd-nvidia-geforce-rtx-3050/', imageUrl: 'https://picsum.photos/seed/hpvictus/300/200' },
  { id: '5', name: 'Acer Nitro 5 AN515-58', price: '2900 GEL', websiteName: 'zoommer.ge', url: 'https://zoommer.ge/products/computers-and-accessories/laptops/acer-nitro-5-an515-58-15-6-fhd-ips-144hz-i5-12500h-16gb-ssd512gb-rtx-3050ti-4gb', imageUrl: 'https://picsum.photos/seed/acernitro/300/200' },
  { id: '6', name: 'Dell G15 5520 Gaming Laptop', price: '3100 GEL', websiteName: 'alta.ge', url: 'https://alta.ge/notebooks-and-accessories/notebooks/dell-g15-5520-dark-shadow-grey-gn5520fi716h1r6n5su-15-6-fhd-120hz-intel-core-i7-12700h-16gb-512gb-ssd-nvidia-rtx-3060-6gb.html', imageUrl: 'https://picsum.photos/seed/dellg15/300/200' },
  { id: '7', name: 'iPhone 15 Pro Max', price: '4200 GEL', websiteName: 'zoommer.ge', url: 'https://zoommer.ge/smartphones/apple-iphone-15-pro-max-256gb-blue-titanium', imageUrl: 'https://picsum.photos/seed/iphone15/300/200' },
  { id: '8', name: 'Samsung Galaxy S24 Ultra', price: '3800 GEL', websiteName: 'alta.ge', url: 'https://alta.ge/telephony-and-communications/smartphones/samsung-galaxy-s24-ultra-12gb-256gb-sm-s928bzkgeuc-titanium-black.html', imageUrl: 'https://picsum.photos/seed/samsungs24/300/200' },
];

export type SearchState = {
  products?: Product[];
  message?: string;
  timestamp?: number; // Used to ensure re-render even if product list is identical
} | null;

export async function searchProductsAction(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const productName = formData.get("productName") as string;

  if (!productName || productName.trim() === "") {
    return {
      message: "Please enter a product name to search.",
      products: [],
      timestamp: Date.now(),
    };
  }

  // Simulate API call / scraping
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // This is where you would call your AI flow from src/ai/flows
    // e.g. import { scrapeWebsites } from '@/ai/flows/scrapeWebsites';
    // const products = await scrapeWebsites(productName);
    
    const filteredProducts = MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(productName.toLowerCase()) ||
      p.websiteName.toLowerCase().includes(productName.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      return {
        message: `No products found matching "${productName}". Try a different search term.`,
        products: [],
        timestamp: Date.now(),
      };
    }

    return {
      products: filteredProducts,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Search error:", error);
    return {
      message: "An error occurred while searching for products. Please try again later.",
      products: [],
      timestamp: Date.now(),
    };
  }
}
