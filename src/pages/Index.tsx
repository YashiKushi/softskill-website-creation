
import React from 'react';
import PromoBanner from '@/components/marketing/PromoBanner';
import MainNavigation from '@/components/marketing/MainNavigation';
import CategoryTabs from '@/components/marketing/CategoryTabs';
import CourseSearch from '@/components/marketing/CourseSearch';
import ContactForm from '@/components/marketing/ContactForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Промо-баннер */}
      <PromoBanner />
      
      {/* Главная навигация */}
      <MainNavigation />
      
      {/* Основной контент */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Левая колонка (2/3 ширины на десктопе) */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8">
                Обучаем современным <br/> профессиям с нуля
              </h1>
              
              {/* Категории курсов */}
              <CategoryTabs />
              
              {/* Поиск курсов */}
              <div className="my-10">
                <CourseSearch />
              </div>
              
              {/* Здесь можно добавить блок с популярными курсами */}
              <div className="mt-12">
                <img 
                  src="https://cdn.poehali.dev/files/86768d94-8936-44b7-9ed1-38fa38a1944a.jpg" 
                  alt="Образовательная платформа" 
                  className="w-full h-auto opacity-20"
                />
              </div>
            </div>
            
            {/* Правая колонка (1/3 ширины на десктопе) */}
            <div className="lg:col-span-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      
      {/* Подвал сайта */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            © 2025 GeekBrains. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
