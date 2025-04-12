import { Product, Category } from '../types';

// Моковые данные категорий
const categories: Category[] = [
  // Категории печати
  {
    id: 1,
    name: 'Полиграфия',
    description: 'Широкий спектр полиграфической продукции',
    imageUrl: 'https://placehold.co/600x400/0056a3/FFF?text=Полиграфия',
    type: 'Печать'
  },
  {
    id: 2,
    name: 'Наклейки',
    description: 'Наклейки и этикетки различных форматов и материалов',
    imageUrl: 'https://placehold.co/600x400/0056a3/FFF?text=Наклейки',
    type: 'Печать'
  },
  {
    id: 3,
    name: 'Маркетплейсы',
    description: 'Подготовка карточек и материалов для маркетплейсов',
    imageUrl: 'https://placehold.co/600x400/0056a3/FFF?text=Маркетплейсы',
    type: 'Печать'
  },
  {
    id: 4,
    name: 'Наружная реклама',
    description: 'Баннеры, вывески и другие виды наружной рекламы',
    imageUrl: 'https://placehold.co/600x400/0056a3/FFF?text=Наружка',
    type: 'Печать'
  },
  {
    id: 5,
    name: 'Упаковка',
    description: 'Упаковочные материалы и коробки с фирменным дизайном',
    imageUrl: 'https://placehold.co/600x400/0056a3/FFF?text=Упаковка',
    type: 'Печать'
  },
  {
    id: 6,
    name: 'Аксессуары',
    description: 'Брендированные аксессуары для бизнеса',
    imageUrl: 'https://placehold.co/600x400/0056a3/FFF?text=Аксессуары',
    type: 'Печать'
  },
  
  // Категории дизайна
  {
    id: 7,
    name: 'Фирменный стиль',
    description: 'Разработка логотипов и фирменного стиля',
    imageUrl: 'https://placehold.co/600x400/ff7f11/FFF?text=Фирстиль',
    type: 'Дизайн'
  },
  {
    id: 8,
    name: 'Веб-дизайн',
    description: 'Дизайн сайтов и веб-интерфейсов',
    imageUrl: 'https://placehold.co/600x400/ff7f11/FFF?text=Веб-дизайн',
    type: 'Дизайн'
  },
  {
    id: 9,
    name: 'Иллюстрации',
    description: 'Создание уникальных иллюстраций',
    imageUrl: 'https://placehold.co/600x400/ff7f11/FFF?text=Иллюстрации',
    type: 'Дизайн'
  },
  {
    id: 10,
    name: 'Дизайн упаковки',
    description: 'Разработка дизайна упаковки продукции',
    imageUrl: 'https://placehold.co/600x400/ff7f11/FFF?text=Дизайн+упаковки',
    type: 'Дизайн'
  },
  {
    id: 11,
    name: 'Брендирование',
    description: 'Комплексное брендирование для бизнеса',
    imageUrl: 'https://placehold.co/600x400/ff7f11/FFF?text=Брендинг',
    type: 'Дизайн'
  }
];

// Функция для генерации цен от 1000 до 10000
const generatePrices = (basePricePer1000: number): { [key: string]: number } => {
  const prices: { [key: string]: number } = {};
  for (let i = 1; i <= 10; i++) {
    const quantity = i * 1000;
    // Применяем небольшую скидку за объем
    const price = Math.round(basePricePer1000 * i * (1 - (i - 1) * 0.02)); 
    prices[`${quantity} шт`] = price;
  }
  return prices;
};

// Моковые данные продуктов с обновленными ценами
const products: Product[] = [
  // Полиграфия
  {
    id: 1,
    title: 'Визитки',
    description: 'Классические визитки 90x50 мм на плотной мелованной бумаге 300 г/м². Идеально подходят для деловых контактов.',
    category: 'Полиграфия',
    price: generatePrices(800), // Примерная цена за 1000 шт
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Визитки'
  },
  {
    id: 2,
    title: 'Флаеры А5',
    description: 'Яркие рекламные листовки А5 формата на мелованной бумаге 150 г/м². Отличный способ привлечь внимание.',
    category: 'Полиграфия',
    price: generatePrices(5500), // Примерная цена за 1000 шт
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Флаер+А5'
  },
  {
    id: 3,
    title: 'Флаеры А4',
    description: 'Информативные листовки А4 формата на бумаге 150 г/м². Подходят для подробного описания услуг или акций.',
    category: 'Полиграфия',
    price: generatePrices(9000), // Примерная цена за 1000 шт
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Флаер+А4'
  },
  {
    id: 4,
    title: 'Брошюры А5 (8 стр)',
    description: 'Многостраничные брошюры формата А5 на 8 страниц со скреплением на скобу. Качественная печать.',
    category: 'Полиграфия',
    price: {
      '50 шт': 5000,
      '100 шт': 9000,
      '200 шт': 16000,
      '500 шт': 35000, // Добавим примерные цены для больших тиражей
      '1000 шт': 60000
    },
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Брошюра'
  },
  
  // Наклейки
  {
    id: 5,
    title: 'Наклейки виниловые',
    description: 'Прочные наклейки на виниловой основе с глянцевой или матовой ламинацией. Устойчивы к влаге и истиранию.',
    category: 'Наклейки',
    price: generatePrices(6000), // Примерная цена за 1000 шт (для среднего размера)
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Наклейки+винил'
  },
  {
    id: 6,
    title: 'Этикетки для товаров',
    description: 'Самоклеящиеся этикетки для маркировки товаров. Различные материалы и формы.',
    category: 'Наклейки',
    price: generatePrices(5000), // Примерная цена за 1000 шт
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Этикетки'
  },
  
  // Наружная реклама (цены за шт или кв.м, оставляем как есть)
  {
    id: 7,
    title: 'Баннер виниловый',
    description: 'Баннер из литого винила 440 г/м² с люверсами по периметру для удобного монтажа. Яркая печать.',
    category: 'Наружная реклама',
    price: {
      '1 кв.м': 800,
      '3 кв.м': 2200,
      '5 кв.м': 3500,
      '10 кв.м': 6500
    },
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Баннер'
  },
  {
    id: 8,
    title: 'Штендер рекламный',
    description: 'Устойчивый двусторонний штендер (стритлайн) для уличной рекламы. Легко переносить и устанавливать.',
    category: 'Наружная реклама',
    price: {
      '1 шт': 4500,
      '2 шт': 8000,
      '5 шт': 19000
    },
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Штендер'
  },
  
  // Маркетплейсы (цены за услугу, оставляем)
  {
    id: 9,
    title: 'Подготовка карточки товара',
    description: 'Полный цикл оформления карточки товара для маркетплейсов: фото, описание, инфографика.',
    category: 'Маркетплейсы',
    price: {
      '1 товар': 1500,
      '5 товаров': 7000,
      '10 товаров': 12000
    },
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Карточка+товара'
  },
  
  // Упаковка
  {
    id: 10,
    title: 'Коробки с логотипом',
    description: 'Качественные картонные коробки различных размеров с печатью вашего фирменного логотипа.',
    category: 'Упаковка',
    price: generatePrices(15000), // Примерная цена за 1000 шт (для среднего размера)
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Коробки+с+лого'
  },
  
  // Аксессуары
  {
    id: 11,
    title: 'Фирменные ручки',
    description: 'Стильные ручки с нанесением логотипа вашей компании методом тампопечати или гравировки.',
    category: 'Аксессуары',
    price: generatePrices(8000), // Примерная цена за 1000 шт
    imageUrl: 'https://placehold.co/600x440/0056a3/FFF?text=Ручки+с+лого'
  },
  
  // Фирменный стиль (цены за услугу, оставляем)
  {
    id: 12,
    title: 'Разработка логотипа',
    description: 'Профессиональное создание уникального и запоминающегося логотипа для вашей компании или бренда.',
    category: 'Фирменный стиль',
    price: {
      'Базовый (3 варианта)': 15000,
      'Стандарт (5 вариантов + гайд)': 25000,
      'Премиум (7 вариантов + полный гайд)': 40000
    },
    imageUrl: 'https://placehold.co/600x440/ff7f11/FFF?text=Логотип'
  },
  
  // Брендирование (цены за услугу, оставляем)
  {
    id: 13,
    title: 'Разработка брендбука',
    description: 'Создание полного руководства по использованию фирменного стиля (брендбука) для вашей компании.',
    category: 'Брендирование',
    price: {
      'Базовый': 30000,
      'Стандарт': 50000,
      'Премиум': 80000
    },
    imageUrl: 'https://placehold.co/600x440/ff7f11/FFF?text=Брендбук'
  }
];

// API функции
export const getCategories = (): Promise<Category[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(categories), 300);
  });
};

export const getCategoriesByType = (type: string): Promise<Category[]> => {
  return new Promise(resolve => {
    const filteredCategories = categories.filter(category => category.type === type);
    setTimeout(() => resolve(filteredCategories), 300);
  });
};

export const getProductsByCategory = (categoryName: string): Promise<Product[]> => {
  return new Promise(resolve => {
    // Заменяем дефис на пробел для соответствия названиям категорий
    const normalizedCategoryName = categoryName.replace(/-/g, ' ');
    const filteredProducts = products.filter(product => 
      product.category.toLowerCase() === normalizedCategoryName.toLowerCase()
    );
    setTimeout(() => resolve(filteredProducts), 300);
  });
};

export const getAllProducts = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(products), 300);
  });
};

export const getProductById = (id: number): Promise<Product | undefined> => {
  return new Promise(resolve => {
    const product = products.find(p => p.id === id);
    setTimeout(() => resolve(product), 300);
  });
};

export const submitContactForm = (formData: any): Promise<{ success: boolean }> => {
  return new Promise(resolve => {
    console.log('Отправка формы:', formData);
    setTimeout(() => resolve({ success: true }), 800);
  });
}; 