import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

// Типы данных
interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessonsCount: number;
  price: number;
  oldPrice?: number;
  rating: number;
  studentsCount: number;
  tags: string[];
  featured?: boolean;
}

// Заглушка данных
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Основы JavaScript",
    description:
      "Изучите основы JavaScript, включая переменные, типы данных, функции и объекты.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
    category: "Frontend",
    level: "beginner",
    duration: "2 месяца",
    lessonsCount: 24,
    price: 9990,
    oldPrice: 19980,
    rating: 4.8,
    studentsCount: 1245,
    tags: ["JavaScript", "ES6", "DOM"],
    featured: true,
  },
  {
    id: 2,
    title: "Практический React",
    description:
      "Разработка современных веб-приложений с использованием React и связанных технологий.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    category: "Frontend",
    level: "intermediate",
    duration: "3 месяца",
    lessonsCount: 36,
    price: 14990,
    oldPrice: 29980,
    rating: 4.9,
    studentsCount: 875,
    tags: ["React", "Hooks", "Redux", "Router"],
  },
  {
    id: 3,
    title: "TypeScript для профессионалов",
    description:
      "Углубленное изучение TypeScript для улучшения качества кода и производительности разработки.",
    image: "https://images.unsplash.com/photo-1610986603166-f78428624e76",
    category: "Frontend",
    level: "advanced",
    duration: "2 месяца",
    lessonsCount: 20,
    price: 12990,
    oldPrice: 25980,
    rating: 4.7,
    studentsCount: 542,
    tags: ["TypeScript", "Type System", "Generics"],
  },
  {
    id: 4,
    title: "Node.js и Express",
    description:
      "Создание серверных приложений с использованием Node.js и фреймворка Express.",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
    category: "Backend",
    level: "intermediate",
    duration: "2.5 месяца",
    lessonsCount: 30,
    price: 13990,
    oldPrice: 27980,
    rating: 4.6,
    studentsCount: 723,
    tags: ["Node.js", "Express", "REST API", "MongoDB"],
  },
  {
    id: 5,
    title: "Python для анализа данных",
    description:
      "Изучите Python и основные библиотеки для работы с данными и их анализа.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    category: "Data Science",
    level: "beginner",
    duration: "3 месяца",
    lessonsCount: 36,
    price: 16990,
    oldPrice: 33980,
    rating: 4.9,
    studentsCount: 1563,
    tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
    featured: true,
  },
  {
    id: 6,
    title: "Алгоритмы и структуры данных",
    description:
      "Фундаментальные алгоритмы и структуры данных для эффективного решения задач.",
    image: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d",
    category: "Computer Science",
    level: "intermediate",
    duration: "2.5 месяца",
    lessonsCount: 28,
    price: 11990,
    oldPrice: 23980,
    rating: 4.7,
    studentsCount: 892,
    tags: ["Algorithms", "Data Structures", "Problem Solving"],
  },
  {
    id: 7,
    title: "DevOps для разработчиков",
    description:
      "Изучите основные инструменты и практики DevOps для автоматизации процессов разработки.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    category: "DevOps",
    level: "intermediate",
    duration: "2 месяца",
    lessonsCount: 24,
    price: 15990,
    oldPrice: 31980,
    rating: 4.8,
    studentsCount: 671,
    tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
  },
  {
    id: 8,
    title: "Мобильная разработка с React Native",
    description:
      "Создание кроссплатформенных мобильных приложений с использованием React Native.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
    category: "Mobile",
    level: "intermediate",
    duration: "3 месяца",
    lessonsCount: 32,
    price: 17990,
    oldPrice: 35980,
    rating: 4.9,
    studentsCount: 743,
    tags: ["React Native", "Mobile", "iOS", "Android"],
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);

  // Фильтрация курсов
  const handleFilter = () => {
    let result = mockCourses;

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedCategory) {
      result = result.filter((course) => course.category === selectedCategory);
    }

    if (selectedLevel) {
      result = result.filter((course) => course.level === selectedLevel);
    }

    setFilteredCourses(result);
  };

  // Фильтрация при изменении параметров
  React.useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedCategory, selectedLevel]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getLevelBadge = (level: Course["level"]) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-blue-100 text-blue-800",
      advanced: "bg-purple-100 text-purple-800",
    };

    const labels = {
      beginner: "Начальный",
      intermediate: "Средний",
      advanced: "Продвинутый",
    };

    return <Badge className={colors[level]}>{labels[level]}</Badge>;
  };

  // Уникальные категории для фильтра
  const categories = Array.from(
    new Set(mockCourses.map((course) => course.category)),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">
              Школа
            </Badge>
          </Link>
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
            <Link to="/courses" className="text-purple-600 font-medium">
              Курсы
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

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Наши курсы</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Выберите курс, который подходит именно вам. Мы предлагаем программы
            разного уровня сложности для начинающих и опытных разработчиков.
          </p>
        </div>

        {/* Популярные курсы */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Популярные курсы</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockCourses
              .filter((course) => course.featured)
              .map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-purple-100 text-purple-800">
                        {course.category}
                      </Badge>
                      {getLevelBadge(course.level)}
                    </div>
                    <CardTitle className="text-xl mt-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center text-amber-500 mt-1">
                        <Icon name="Star" className="h-4 w-4" />
                        <span className="ml-1 text-gray-700">
                          {course.rating} ({course.studentsCount} студентов)
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">
                        {course.price.toLocaleString()} ₽
                      </p>
                      {course.oldPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          {course.oldPrice.toLocaleString()} ₽
                        </p>
                      )}
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      ``
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Подробнее
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </section>

        {/* Поиск и фильтры */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-4 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Поиск курсов"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все уровни</SelectItem>
                  <SelectItem value="beginner">Начальный</SelectItem>
                  <SelectItem value="intermediate">Средний</SelectItem>
                  <SelectItem value="advanced">Продвинутый</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleFilter}
              variant="outline"
              className="min-w-[120px]"
            >
              <Icon name="Filter" className="mr-2 h-4 w-4" />
              Фильтр
            </Button>
          </div>
        </section>

        {/* Курсы по категориям */}
        <section>
          <Tabs defaultValue="all" className="mb-12">
            <TabsList>
              <TabsTrigger value="all">Все курсы</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6">
              <TabsContent value="all">
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <Badge className="bg-purple-100 text-purple-800">
                              {course.category}
                            </Badge>
                            {getLevelBadge(course.level)}
                          </div>
                          <CardTitle className="text-xl mt-2">
                            {course.title}
                          </CardTitle>
                          <CardDescription>
                            <div className="flex items-center text-amber-500 mt-1">
                              <Icon name="Star" className="h-4 w-4" />
                              <span className="ml-1 text-gray-700">
                                {course.rating} ({course.studentsCount}{" "}
                                студентов)
                              </span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {course.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-100"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-lg">
                              {course.price.toLocaleString()} ₽
                            </p>
                            {course.oldPrice && (
                              <p className="text-sm text-gray-500 line-through">
                                {course.oldPrice.toLocaleString()} ₽
                              </p>
                            )}
                          </div>
                          <Link to={`/courses/${course.id}`}>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              Подробнее
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-12">
                      <Icon
                        name="Search"
                        className="h-12 w-12 text-gray-400 mx-auto mb-4"
                      />
                      <h3 className="text-xl font-medium mb-2">
                        Курсы не найдены
                      </h3>
                      <p className="text-gray-600 mb-4">
                        По вашему запросу не найдено ни одного курса. Попробуйте
                        изменить параметры поиска.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("");
                          setSelectedLevel("");
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Сбросить фильтры
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {mockCourses
                      .filter((course) => course.category === category)
                      .map((course) => (
                        <Card
                          key={course.id}
                          className="hover:shadow-md transition-shadow overflow-hidden"
                        >
                          <div className="h-48 overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Badge className="bg-purple-100 text-purple-800">
                                {course.category}
                              </Badge>
                              {getLevelBadge(course.level)}
                            </div>
                            <CardTitle className="text-xl mt-2">
                              {course.title}
                            </CardTitle>
                            <CardDescription>
                              <div className="flex items-center text-amber-500 mt-1">
                                <Icon name="Star" className="h-4 w-4" />
                                <span className="ml-1 text-gray-700">
                                  {course.rating} ({course.studentsCount}{" "}
                                  студентов)
                                </span>
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 line-clamp-2">
                              {course.description}
                            </p>
                            <div className="flex gap-2 mt-3 flex-wrap">
                              {course.tags.slice(0, 3).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-gray-100"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center">
                            <div>
                              <p className="font-bold text-lg">
                                {course.price.toLocaleString()} ₽
                              </p>
                              {course.oldPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  {course.oldPrice.toLocaleString()} ₽
                                </p>
                              )}
                            </div>
                            <Link to={`/courses/${course.id}`}>
                              <Button className="bg-purple-600 hover:bg-purple-700">
                                Подробнее
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </section>

        {/* Корпоративное обучение */}
        <section className="mb-16 py-12 px-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-white/20 mb-4">Для компаний</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Корпоративное обучение
              </h2>
              <p className="text-lg mb-6">
                Мы предлагаем специальные программы обучения для компаний.
                Повысьте квалификацию своих сотрудников и развивайте их навыки с
                помощью наших курсов.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Icon name="Check" className="h-5 w-5 mr-2 text-white" />
                  <span>Индивидуальная программа обучения</span>
                </li>
                <li className="flex items-center">
                  <Icon name="Check" className="h-5 w-5 mr-2 text-white" />
                  <span>Гибкий график занятий</span>
                </li>
                <li className="flex items-center">
                  <Icon name="Check" className="h-5 w-5 mr-2 text-white" />
                  <span>Отчеты о прогрессе сотрудников</span>
                </li>
                <li className="flex items-center">
                  <Icon name="Check" className="h-5 w-5 mr-2 text-white" />
                  <span>Специальные корпоративные тарифы</span>
                </li>
              </ul>
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Получить предложение
              </Button>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4"
                alt="Корпоративное обучение"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Часто задаваемые вопросы
            </h2>
            <p className="text-gray-600">
              Нашли ответы на популярные вопросы о наших курсах
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm divide-y">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  Как проходит обучение?
                </h3>
                <p className="text-gray-600">
                  Обучение проходит в онлайн-формате. Вы получаете доступ к
                  видеоурокам, практическим заданиям и дополнительным
                  материалам. Также у вас будет возможность общаться с
                  преподавателем и другими студентами в чате.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  Сколько времени нужно уделять обучению?
                </h3>
                <p className="text-gray-600">
                  Для эффективного обучения рекомендуется выделять минимум 10-15
                  часов в неделю. Однако вы можете учиться в удобном для вас
                  темпе.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  Какие инструменты понадобятся для обучения?
                </h3>
                <p className="text-gray-600">
                  Для обучения вам понадобится компьютер с доступом в интернет.
                  Все необходимое программное обеспечение бесплатное, инструкции
                  по установке предоставляются в начале курса.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  Выдаете ли вы сертификаты?
                </h3>
                <p className="text-gray-600">
                  Да, после успешного завершения курса вы получите сертификат,
                  который можно добавить в резюме или профиль LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

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
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Курсы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reviews"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Отзывы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacts"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Icon name="Mail" className="mr-2 h-4 w-4" />{" "}
                  info@softskill.ru
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

export default Courses;
