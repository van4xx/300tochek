import { Product, Category } from '../types';

// Моковые данные категорий
const categories: Category[] = [
  // Категории печати
  {
    id: 1,
    name: 'Полиграфия',
    description: 'Широкий спектр полиграфической продукции',
    imageUrl: '/images/categories/poligraphy.jpg',
    type: 'Печать'
  },
  {
    id: 2,
    name: 'Наклейки',
    description: 'Наклейки и этикетки различных форматов и материалов',
    imageUrl: '/images/categories/stickers.jpg',
    type: 'Печать'
  },
  {
    id: 3,
    name: 'Маркетплейсы',
    description: 'Подготовка карточек и материалов для маркетплейсов',
    imageUrl: '/images/categories/marketplace.jpg',
    type: 'Печать'
  },
  {
    id: 4,
    name: 'Наружная реклама',
    description: 'Баннеры, вывески и другие виды наружной рекламы',
    imageUrl: '/images/categories/outdoor.jpg',
    type: 'Печать'
  },
  {
    id: 5,
    name: 'Упаковка',
    description: 'Упаковочные материалы и коробки с фирменным дизайном',
    imageUrl: '/images/categories/packaging.jpg',
    type: 'Печать'
  },
  {
    id: 6,
    name: 'Аксессуары',
    description: 'Брендированные аксессуары для бизнеса',
    imageUrl: '/images/categories/accessories.jpg',
    type: 'Печать'
  },
  
  // Категории дизайна
  {
    id: 7,
    name: 'Фирменный стиль',
    description: 'Разработка логотипов и фирменного стиля',
    imageUrl: '/images/categories/brand-identity.jpg',
    type: 'Дизайн'
  },
  {
    id: 8,
    name: 'Веб-дизайн',
    description: 'Дизайн сайтов и веб-интерфейсов',
    imageUrl: '/images/categories/web-design.jpg',
    type: 'Дизайн'
  },
  {
    id: 9,
    name: 'Иллюстрации',
    description: 'Создание уникальных иллюстраций',
    imageUrl: '/images/categories/illustrations.jpg',
    type: 'Дизайн'
  },
  {
    id: 10,
    name: 'Дизайн упаковки',
    description: 'Разработка дизайна упаковки продукции',
    imageUrl: '/images/categories/packaging-design.jpg',
    type: 'Дизайн'
  },
  {
    id: 11,
    name: 'Брендирование',
    description: 'Комплексное брендирование для бизнеса',
    imageUrl: '/images/categories/branding.jpg',
    type: 'Дизайн'
  }
];

// Моковые данные продуктов
const products: Product[] = [
  // Полиграфия
  {
    id: 1,
    title: 'Визитки',
    description: 'Визитки 90x50 мм на мелованной бумаге 300 гр.',
    category: 'Полиграфия',
    price: {
      '100 шт': 1000,
      '200 шт': 1800,
      '500 шт': 4000
    },
    imageUrl: '/images/products/business-cards.jpg'
  },
  {
    id: 2,
    title: 'Флаеры А5',
    description: 'Листовки А5 формата на мелованной бумаге 150 гр.',
    category: 'Полиграфия',
    price: {
      '100 шт': 1500,
      '500 шт': 6000,
      '1000 шт': 10000
    },
    imageUrl: '/images/products/a5-flyers.jpg'
  },
  {
    id: 3,
    title: 'Флаеры А4',
    description: 'Листовки А4 формата на мелованной бумаге 150 гр.',
    category: 'Полиграфия',
    price: {
      '100 шт': 2500,
      '500 шт': 9000,
      '1000 шт': 16000
    },
    imageUrl: '/images/products/a4-flyers.jpg'
  },
  {
    id: 4,
    title: 'Брошюры',
    description: 'Брошюра А5 формата, 8 страниц, скрепление на скобу',
    category: 'Полиграфия',
    price: {
      '50 шт': 5000,
      '100 шт': 9000,
      '200 шт': 16000
    },
    imageUrl: '/images/products/brochures.jpg'
  },
  
  // Наклейки
  {
    id: 5,
    title: 'Наклейки винил',
    description: 'Наклейки на виниловой основе с глянцевой ламинацией',
    category: 'Наклейки',
    price: {
      '100 шт': 1800,
      '300 шт': 4500,
      '500 шт': 7000
    },
    imageUrl: '/images/products/vinyl-stickers.jpg'
  },
  {
    id: 6,
    title: 'Этикетки для товаров',
    description: 'Самоклеящиеся этикетки для товаров и продукции',
    category: 'Наклейки',
    price: {
      '500 шт': 3000,
      '1000 шт': 5500,
      '2000 шт': 10000
    },
    imageUrl: '/images/products/product-labels.jpg'
  },
  
  // Наружная реклама
  {
    id: 7,
    title: 'Баннер винил',
    description: 'Баннер из винила 440 гр. с люверсами',
    category: 'Наружная реклама',
    price: {
      '1 кв.м': 800,
      '3 кв.м': 2200,
      '5 кв.м': 3500
    },
    imageUrl: '/images/products/vinyl-banner.jpg'
  },
  {
    id: 8,
    title: 'Штендер',
    description: 'Двусторонний штендер для уличной рекламы',
    category: 'Наружная реклама',
    price: {
      '1 шт': 4500,
      '2 шт': 8000,
      '5 шт': 19000
    },
    imageUrl: '/images/products/outdoor-stand.jpg'
  },
  
  // Маркетплейсы
  {
    id: 9,
    title: 'Подготовка карточки товара',
    description: 'Профессиональное оформление карточки товара для маркетплейсов',
    category: 'Маркетплейсы',
    price: {
      '1 товар': 1500,
      '5 товаров': 7000,
      '10 товаров': 12000
    },
    imageUrl: '/images/products/marketplace-card.jpg'
  },
  
  // Упаковка
  {
    id: 10,
    title: 'Коробки с логотипом',
    description: 'Картонные коробки с печатью фирменного логотипа',
    category: 'Упаковка',
    price: {
      '50 шт': 5000,
      '100 шт': 9500,
      '200 шт': 18000
    },
    imageUrl: '/images/products/logo-boxes.jpg'
  },
  
  // Аксессуары
  {
    id: 11,
    title: 'Фирменные ручки',
    description: 'Ручки с логотипом компании',
    category: 'Аксессуары',
    price: {
      '50 шт': 2500,
      '100 шт': 4500,
      '200 шт': 8000
    },
    imageUrl: '/images/products/branded-pens.jpg'
  },
  
  // Фирменный стиль
  {
    id: 12,
    title: 'Разработка логотипа',
    description: 'Создание уникального логотипа для компании',
    category: 'Фирменный стиль',
    price: {
      'Базовый': 15000,
      'Стандарт': 25000,
      'Премиум': 40000
    },
    imageUrl: '/images/products/logo-design.jpg'
  },
  
  // Брендирование
  {
    id: 13,
    title: 'Брендбук',
    description: 'Разработка полного брендбука для компании',
    category: 'Брендирование',
    price: {
      'Базовый': 30000,
      'Стандарт': 50000,
      'Премиум': 80000
    },
    imageUrl: '/images/products/brandbook.jpg'
  }
];

// API функции
export const getCategories = (): Promise<Category[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(categories), 500);
  });
};

export const getCategoriesByType = (type: string): Promise<Category[]> => {
  return new Promise(resolve => {
    const filteredCategories = categories.filter(category => category.type === type);
    setTimeout(() => resolve(filteredCategories), 500);
  });
};

export const getProductsByCategory = (categoryName: string): Promise<Product[]> => {
  return new Promise(resolve => {
    const filteredProducts = products.filter(product => product.category === categoryName);
    setTimeout(() => resolve(filteredProducts), 500);
  });
};

export const getAllProducts = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(products), 500);
  });
};

export const getProductById = (id: number): Promise<Product | undefined> => {
  return new Promise(resolve => {
    const product = products.find(p => p.id === id);
    setTimeout(() => resolve(product), 500);
  });
};

export const submitContactForm = (formData: any): Promise<{ success: boolean }> => {
  return new Promise(resolve => {
    // Здесь в будущем будет отправка данных формы на сервер
    console.log('Отправка формы:', formData);
    setTimeout(() => resolve({ success: true }), 1000);
  });
}; 