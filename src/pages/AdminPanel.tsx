
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

// Типы данных
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
  avatar?: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  studentsCount: number;
  published: boolean;
  author: User;
}

// Заглушка данных
const mockUsers: User[] = [
  {
    id: 1,
    name: "Администратор",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
  },
  {
    id: 2,
    name: "Мария Петрова",
    email: "maria@example.com",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
];

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Основы JavaScript",
    description: "Изучите основы JavaScript, включая переменные, типы данных, функции и объекты.",
    category: "Frontend",
    level: "beginner",
    studentsCount: 1245,
    published: true,
    author: mockUsers[1],
  },
  {
    id: 2,
    title: "Практический React",
    description: "Разработка современных веб-приложений с использованием React и связанных технологий.",
    category: "Frontend",
    level: "intermediate",
    studentsCount: 875,
    published: true,
    author: mockUsers[1],
  },
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Получение данных при загрузке
  useEffect(() => {
    // Имитация проверки аутентификации и загрузки данных
    setTimeout(() => {
      // В реальном приложении здесь была бы проверка прав доступа
      const user = mockUsers[0]; // Для демонстрации берем первого пользователя (админа)
      
      if (user && (user.role === "admin" || user.role === "teacher")) {
        setCurrentUser(user);
        setCourses(mockCourses);
        setLoading(false);
      } else {
        toast({
          title: "Доступ запрещен",
          description: "У вас недостаточно прав для доступа к этой странице",
          variant: "destructive",
        });
        navigate("/login");
      }
    }, 800);
  }, [navigate, toast]);

  // Обработчики событий
  const handleLogout = () => {
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
    navigate("/");
  };

  // Отображение индикаторов загрузки
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="mx-auto h-8 w-8 animate-spin text-purple-600" />
          <p className="mt-2 text-gray-600">Загрузка админ-панели...</p>
        </div>
      </div>
    );
  }

  // Фильтрация курсов по поисковому запросу
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">
              Админ-панель
            </Badge>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={currentUser?.avatar || "https://via.placeholder.com/40"}
                  alt={currentUser?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">
                  {currentUser?.role === "admin" ? "Администратор" : "Преподаватель"}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Выход</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Административная панель</h1>
          <p className="text-gray-600">
            Управляйте курсами, преподавателями и студентами
          </p>
        </div>

        {/* Статистика и быстрые действия */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-purple-100 mr-3">
                    <Icon name="BookOpen" className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Всего курсов</p>
                    <p className="font-bold">{courses.length}</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">
                  {courses.filter(c => c.published).length} активных
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-blue-100 mr-3">
                    <Icon name="Users" className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Преподаватели</p>
                    <p className="font-bold">{mockUsers.filter(u => u.role === "teacher").length}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-green-100 mr-3">
                    <Icon name="GraduationCap" className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Всего студентов</p>
                    <p className="font-bold">
                      {courses.reduce((sum, course) => sum + course.studentsCount, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>
                Управление основными элементами образовательной платформы
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="flex-col h-auto py-4 bg-purple-600 hover:bg-purple-700"
              >
                <Icon name="PlusCircle" className="h-6 w-6 mb-2" />
                <span className="text-sm">Создать курс</span>
              </Button>
              
              <Button 
                className="flex-col h-auto py-4 bg-blue-600 hover:bg-blue-700"
              >
                <Icon name="UserPlus" className="h-6 w-6 mb-2" />
                <span className="text-sm">Добавить преподавателя</span>
              </Button>
              
              <Button 
                className="flex-col h-auto py-4 bg-green-600 hover:bg-green-700"
              >
                <Icon name="FileText" className="h-6 w-6 mb-2" />
                <span className="text-sm">Отчеты и аналитика</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Вкладки для управления разделами */}
        <Tabs defaultValue="courses" className="mt-8">
          <TabsList>
            <TabsTrigger value="courses">
              <Icon name="BookOpen" className="mr-2 h-4 w-4" />
              Курсы
            </TabsTrigger>
            <TabsTrigger value="teachers">
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Преподаватели
            </TabsTrigger>
          </TabsList>

          {/* Вкладка: Курсы */}
          <TabsContent value="courses" className="mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск курсов..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
              >
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Новый курс
              </Button>
            </div>

            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <Icon name="Search" className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Курсы не найдены</h3>
                  <p className="text-gray-500 mb-4 text-center">
                    {searchTerm 
                      ? "По вашему запросу не найдено ни одного курса. Попробуйте изменить параметры поиска."
                      : "У вас пока нет созданных курсов. Создайте свой первый курс!"}
                  </p>
                  {searchTerm ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchTerm("")}
                    >
                      Очистить поиск
                    </Button>
                  ) : (
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name="Plus" className="mr-2 h-4 w-4" />
                      Создать курс
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Название курса
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Категория
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Уровень
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Преподаватель
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Студентов
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Статус
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Действия
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {course.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {course.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              className={
                                course.level === "beginner" 
                                  ? "bg-green-100 text-green-800" 
                                  : course.level === "intermediate"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }
                            >
                              {course.level === "beginner" 
                                ? "Начальный" 
                                : course.level === "intermediate"
                                ? "Средний"
                                : "Продвинутый"
                              }
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                <img 
                                  src={course.author.avatar || "https://via.placeholder.com/40"} 
                                  alt={course.author.name} 
                                  className="h-full w-full object-cover" 
                                />
                              </div>
                              <div className="text-sm text-gray-900">
                                {course.author.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.studentsCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              className={
                                course.published 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {course.published ? "Опубликован" : "Черновик"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                title="Редактировать курс"
                              >
                                <Icon name="Edit" className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                title={course.published ? "Снять с публикации" : "Опубликовать"}
                              >
                                {course.published ? (
                                  <Icon name="EyeOff" className="h-4 w-4 text-yellow-600" />
                                ) : (
                                  <Icon name="Eye" className="h-4 w-4 text-green-600" />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Вкладка: Преподаватели (пустая заглушка) */}
          <TabsContent value="teachers" className="mt-6">
            <Card>
              <CardContent className="p-12 text-center">
                <Icon name="Users" className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Раздел в разработке</h3>
                <p className="text-gray-500 mb-4">
                  Функциональность управления преподавателями скоро будет доступна.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
