import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">
              Школа
            </Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              О нас
            </Link>
            <Link
              to="/reviews"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Отзывы
            </Link>
            <Link
              to="/contacts"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Контакты
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" className="hidden md:inline-flex">
                Войти
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Регистрация
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" />
            </Button>
          </div>
        </div>
      </header>

      {/* Баннер со скидкой */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Стань профессиональным разработчиком с SoftSkill
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Развивай технические и soft-навыки с нашей программой обучения.
              Освой программирование от новичка до профи.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Начать обучение
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white font-medium hover:bg-white/20"
              >
                Узнать больше
              </Button>
            </div>

            <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/40 inline-block">
              <Badge className="bg-pink-500 mb-2">Акция</Badge>
              <p className="text-lg font-semibold">
                Скидка 50% на все курсы до конца мая!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-600 mb-2"
            >
              Почему мы
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Преимущества обучения в SoftSkill
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Наша школа программирования предлагает уникальный подход к
              обучению, сочетающий технические навыки и soft skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-purple-600" />
                </div>
                <CardTitle>Опытные преподаватели</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Наши преподаватели - практикующие разработчики с опытом работы
                  в ведущих IT-компаниях.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Icon name="GraduationCap" className="text-purple-600" />
                </div>
                <CardTitle>Проектное обучение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Учись на реальных проектах и создавай своё портфолио уже во
                  время обучения.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Icon name="LineChart" className="text-purple-600" />
                </div>
                <CardTitle>Трудоустройство</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Помогаем с поиском работы после прохождения курсов. 80%
                  выпускников трудоустраиваются.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-600 mb-2"
            >
              Тарифы
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Выберите подходящий тариф
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем гибкие тарифные планы для разных потребностей и
              уровней подготовки.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Базовый</CardTitle>
                <CardDescription>Для начинающих</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ₽9,990
                  </span>
                  <span className="ml-2 text-gray-500 line-through">
                    ₽19,980
                  </span>
                  <span className="ml-2 text-sm text-gray-500">/месяц</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Доступ к 5 базовым курсам</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Проверка домашних заданий</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Сертификат об окончании</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Выбрать тариф
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-purple-600 relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm font-semibold">
                Популярный
              </div>
              <CardHeader>
                <CardTitle>Стандарт</CardTitle>
                <CardDescription>Для тех, кто серьезно</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ₽14,990
                  </span>
                  <span className="ml-2 text-gray-500 line-through">
                    ₽29,980
                  </span>
                  <span className="ml-2 text-sm text-gray-500">/месяц</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Доступ ко всем курсам</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Персональный наставник</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Работа над реальными проектами</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Помощь с трудоустройством</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Выбрать тариф
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-gray-200 relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Премиум</CardTitle>
                <CardDescription>Для будущих профессионалов</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ₽24,990
                  </span>
                  <span className="ml-2 text-gray-500 line-through">
                    ₽49,980
                  </span>
                  <span className="ml-2 text-sm text-gray-500">/месяц</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Все преимущества Стандарта</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Индивидуальный учебный план</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Гарантированное трудоустройство</span>
                  </li>
                  <li className="flex items-center">
                    <Icon
                      name="Check"
                      className="mr-2 h-4 w-4 text-green-500"
                    />
                    <span>Доступ к закрытому сообществу</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Выбрать тариф
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SoftSkill</h3>
              <p className="text-gray-400">
                Школа программирования, где технические навыки сочетаются с
                развитием soft skills.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Главная
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Курсы
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Отзывы
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Icon name="Mail" className="mr-2 h-4 w-4" />{" "}
                  {/* ... keep existing code */} info@softskill.ru
                </li>
                <li className="flex items-center">
                  <Icon name="Phone" className="mr-2 h-4 w-4" /> +7 (800)
                  555-35-35
                </li>
                <li className="flex items-center">
                  <Icon name="MapPin" className="mr-2 h-4 w-4" /> Москва, ул.
                  Программистов, 42
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Facebook" />
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Instagram" />
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Twitter" />
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Youtube" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 SoftSkill. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
