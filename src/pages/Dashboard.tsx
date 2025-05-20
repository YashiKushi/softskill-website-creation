import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Типы данных
interface User {
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  lessons: number;
  category: string;
  completedLessons: number;
  level: "beginner" | "intermediate" | "advanced";
}

// Заглушка данных
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Основы JavaScript",
    description:
      "Изучите основы JavaScript, включая переменные, типы данных, функции и объекты.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
    progress: 75,
    lessons: 12,
    completedLessons: 9,
    category: "JavaScript",
    level: "beginner",
  },
  {
    id: 2,
    title: "Практический React",
    description:
      "Разработка современных веб-приложений с использованием React и связанных технологий.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    progress: 30,
    lessons: 15,
    completedLessons: 4,
    category: "React",
    level: "intermediate",
  },
  {
    id: 3,
    title: "TypeScript для профессионалов",
    description:
      "Углубленное изучение TypeScript для улучшения качества кода и производительности разработки.",
    image: "https://images.unsplash.com/photo-1610986603166-f78428624e76",
    progress: 10,
    lessons: 10,
    completedLessons: 1,
    category: "TypeScript",
    level: "advanced",
  },
  {
    id: 4,
    title: "NodeJS и Express",
    description:
      "Создание серверных приложений с использованием Node.js и фреймворка Express.",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
    progress: 0,
    lessons: 8,
    completedLessons: 0,
    category: "Backend",
    level: "intermediate",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCourses, setActiveCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Проверка аутентификации
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));

      // Имитация загрузки данных с сервера
      setTimeout(() => {
        const active = mockCourses.filter((course) => course.progress > 0);
        const available = mockCourses.filter((course) => course.progress === 0);

        setActiveCourses(active);
        setAvailableCourses(available);
        setLoading(false);
      }, 800);
    } else {
      toast({
        title: "Доступ запрещен",
        description: "Пожалуйста, войдите в систему",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="Loader2"
            className="mx-auto h-8 w-8 animate-spin text-purple-600"
          />
          <p className="mt-2 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">
              Кабинет
            </Badge>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block text-gray-700">
              Привет, {user?.name || "Студент"}!
            </span>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
          <p className="text-gray-600">
            Отслеживайте прогресс обучения и управляйте своими курсами
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Мой профиль</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Icon name="User" className="h-12 w-12 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {user?.name || "Студент"}
                  </h3>
                  <p className="text-gray-500">{user?.email}</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Пройдено курсов:
                    </span>
                    <span className="font-medium">
                      0 из {mockCourses.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Активных курсов:
                    </span>
                    <span className="font-medium">{activeCourses.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Сертификатов:</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Icon name="Settings" className="mr-2 h-4 w-4" />
                  Настройки профиля
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="my-courses">
              <TabsList className="mb-6">
                <TabsTrigger value="my-courses">
                  <Icon name="BookOpen" className="mr-2 h-4 w-4" />
                  Мои курсы
                </TabsTrigger>
                <TabsTrigger value="available-courses">
                  <Icon name="GraduationCap" className="mr-2 h-4 w-4" />
                  Доступные курсы
                </TabsTrigger>
                <TabsTrigger value="certificates">
                  <Icon name="Award" className="mr-2 h-4 w-4" />
                  Сертификаты
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-courses">
                <h2 className="text-2xl font-semibold mb-4">Активные курсы</h2>

                {activeCourses.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Icon
                        name="BookX"
                        className="h-12 w-12 text-gray-400 mb-4"
                      />
                      <h3 className="text-xl font-medium mb-2">
                        У вас еще нет активных курсов
                      </h3>
                      <p className="text-gray-500 mb-4 text-center">
                        Начните обучение, выбрав курс из списка доступных
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Icon name="Search" className="mr-2 h-4 w-4" />
                        Найти курсы
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {activeCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <div className="h-40 overflow-hidden rounded-t-lg">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">
                              {course.title}
                            </CardTitle>
                            {getLevelBadge(course.level)}
                          </div>
                          <CardDescription>{course.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Прогресс</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Завершено {course.completedLessons} из{" "}
                            {course.lessons} уроков
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Link to={`/courses/${course.id}`} className="w-full">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              <Icon name="Play" className="mr-2 h-4 w-4" />
                              Продолжить обучение
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="available-courses">
                <h2 className="text-2xl font-semibold mb-4">Доступные курсы</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {availableCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 overflow-hidden rounded-t-lg">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {course.title}
                          </CardTitle>
                          {getLevelBadge(course.level)}
                        </div>
                        <CardDescription>{course.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">
                          {course.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          <Icon name="Book" className="inline mr-1 h-4 w-4" />{" "}
                          {course.lessons} уроков
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/courses/${course.id}`} className="w-full">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            <Icon name="Play" className="mr-2 h-4 w-4" />
                            Начать обучение
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certificates">
                <h2 className="text-2xl font-semibold mb-4">Мои сертификаты</h2>

                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Icon
                      name="Award"
                      className="h-12 w-12 text-gray-400 mb-4"
                    />
                    <h3 className="text-xl font-medium mb-2">
                      У вас еще нет сертификатов
                    </h3>
                    <p className="text-gray-500 mb-4 text-center">
                      Пройдите курс полностью, чтобы получить сертификат о его
                      завершении
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Icon name="BookOpen" className="mr-2 h-4 w-4" />
                      Перейти к моим курсам
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
