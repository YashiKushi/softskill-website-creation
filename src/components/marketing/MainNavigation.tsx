
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainNavigation = () => {
  return (
    <nav className="bg-white py-4 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="h-6 w-6 md:hidden" />
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-heading font-bold text-xl">GeekBrains</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <Link to="/catalog" className="text-gray-700 hover:text-primary">
              Каталог курсов
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-primary">
              Мероприятия
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary">
              Журнал
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5 text-gray-600" />
          <Button variant="outline" className="border-primary text-primary font-medium">
            Войти
          </Button>
          <Button className="bg-primary hover:bg-primary/90 font-medium">
            Регистрация
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
