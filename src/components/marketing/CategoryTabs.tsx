
import React, { useState } from 'react';

const categories = [
  { id: 'all', name: 'Все курсы' },
  { id: 'programming', name: 'Программирование' },
  { id: 'design', name: 'Дизайн' },
  { id: 'marketing', name: 'Маркетинг' },
  { id: 'analytics', name: 'Аналитика' },
  { id: 'testing', name: 'Тестирование' },
  { id: 'management', name: 'Менеджмент' },
  { id: 'games', name: 'Игры' },
  { id: 'cinema', name: 'Кино и музыка' },
  { id: 'english', name: 'Английский язык' },
  { id: 'kids', name: 'Для детей' },
];

const CategoryTabs = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="flex flex-wrap gap-2 my-6">
      {categories.map(category => (
        <button
          key={category.id}
          className={category.id === activeCategory ? 'category-pill-active' : 'category-pill'}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
