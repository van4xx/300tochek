export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: {
    [key: string]: number; // Для разных тиражей разные цены
  };
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  type: string; // 'Печать' или 'Дизайн'
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: number;
  quantity?: string;
} 