
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import CourseUploadForm from "@/components/teacher/CourseUploadForm";

// Типы данных
interface TeacherCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  status: "draft" | "published" | "review";
  studentsCount: number;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  lastUpdated: string;
  lessons: number;
  rating?: number;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  coursesCount: number;
  studentsCount: number;
  rating?: number;
}

// Заглушка данных учителя
const mockTeacher: Teacher = {
  id: 1,
  name: "Мария Иванова",
  email: "maria@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  bio: "Опытный преподаватель с 5-летним стажем в веб-разработке. Специализируюсь на JavaScript, React и TypeScript.",
  coursesCount: 4,
  studentsCount: 156,
  rating: 4.8
};

// Заглушка курсов учителя
const mockCourses: TeacherCourse[] = [
  {
    id: 1,
    title: "Основы JavaScript",
    description: "Изучите основы JavaScript с нуля до профессионального уровня",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
    status: "published",
    studentsCount: 78,
    category: "Frontend",
    level: "beginner",
    lastUpdated: "2025-05-10",
    lessons: 12,
    rating: 4.7
  },
  {
    id: 2,
    title: "React для начинающих",
    description: "Практический курс по React с созданием реальных проектов",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    status: "published",
    studentsCount: 53,
    category: "Frontend",
    level: "intermediate",
    lastUpdated: "2025-05-01",
    lessons: 15,
    rating: 4.9
  },
  {
    id: 3,
    title: "TypeScript в деталях",
    description: "Углубленное изучение TypeScript для веб-разработчиков",
    image: "https://images.unsplash.com/photo-1610986603166-f78428624e76",
    status: "draft",
    studentsCount: 0,
    category: "Frontend",
    level: "advanced",
    lastUpdated: "2025-05-15",
    lessons: 18,
    rating: undefined
  },
  {
    id: 4,
    title: "Node.js для фронтенд-разработчиков",
    description: "Знакомство с серверной разработкой для фронтенд-специалистов",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
    status: "review",
    studentsCount: 0,
    category: "Backend",
    level: "intermediate",
    lastUpdated: "2025-05-18",
    lessons: 10,
    rating: undefined
  }
];

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  useEffect(() => {
    // Имитация загрузки данных с сервера
    const loadData = async () => {
      try {
        // В реальном приложении здесь был бы API запрос
        setTimeout(() => {
          setTeacher(mockTeacher);
          setCourses(mockCourses);
          setLoading(false);
        }, 800);
      } catch (error) {
        toast({
          title: "Ошибка загрузки данных",
          description: "Не удалось загрузить данные учителя и курсов",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleLogout = () => {
    // В реальном приложении здесь был бы код выхода из системы
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
    navigate("/");
  };

  const handleEditCourse = (courseId: number) => {
    navigate(`/teacher/course-editor/${courseId}`);
  };

  const handlePublishCourse = (courseId: number) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, status: "published" as const } 
          : course
      )
    );
    
    toast({
      title: "Курс опубликован",
      description: "Ваш курс успешно опубликован и доступен студентам",
    });
  };

  const handleUploadSuccess = (newCourse: TeacherCourse) => {
    setCourses(prevCourses => [...prevCourses, { 
      ...newCourse, 
      id: Math.max(...prevCourses.map(c => c.id)) + 1,
      status: "draft",
      studentsCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    }]);
    
    setIsUploadModalOpen(false);
    toast({
      title: "Курс создан",
      description: "Новый курс успешно создан и сохранен как черновик",
    });
  };

  const getStatusBadge = (status: TeacherCourse["status"]) => {
    const statusConfig = {
      draft: { label: "Черновик", className: "bg-yellow-100 text-yellow-800" },
      review: { label: "На проверке", className: "bg-blue-100 text-blue-800" },
      published: { label: "Опубликован", className: "bg-green-100 text-green-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getLevelBadge = (level: TeacherCourse["level"]) => {
    const config = {
      beginner: { label: "Начальный", className: "bg-green-100 text-green-800" },
      intermediate: { label: "Средний", className: "bg-blue-100 text-blue-800" },
      advanced: { label: "Продвинутый", className: "bg-purple-100 text-purple-800" }
    };
    
    return <Badge className={config[level].className}>{config[level].label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="mx-auto h-8 w-8 animate-spin text-purple-600" />
          <p className="mt-2 text-gray-600">Загрузка кабинета преподавателя...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">
              Преподаватель
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            {teacher && (
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={teacher.avatar || "https://via.placeholder.com/40"}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{teacher.name}</p>
                  <p className="text-xs text-gray-500">Преподаватель</p>
                </div>
              </div>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Выход</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Личный кабинет преподавателя</h1>
          <p className="text-gray-600">
            Управляйте вашими курсами и отслеживайте прогресс учеников
          </p>
        </div>

        {/* Статистика и профиль */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Профиль */}
          <Card>
            <CardHeader>
              <CardTitle>Мой профиль</CardTitle>
            </CardHeader>
            <CardContent>
              {teacher && (
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-purple-100 overflow-hidden mb-4">
                    {teacher.avatar ? (
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="User" className="h-12 w-12 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{teacher.name}</h3>
                  <p className="text-gray-500">{teacher.email}</p>
                  
                  {teacher.rating && (
                    <div className="flex items-center mt-2">
                      <Icon name="Star" className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm">{teacher.rating} / 5.0</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Курсов:</span>
                  <span className="font-medium">{teacher?.coursesCount || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Студентов:</span>
                  <span className="font-medium">{teacher?.studentsCount || 0}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Редактировать профиль
              </Button>
            </CardFooter>
          </Card>

          {/* Статистика */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
              <CardDescription>
                Общая статистика по вашим курсам и студентам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Курсы</h3>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Icon name="BookOpen" className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{teacher?.coursesCount || 0}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Опубликовано:</span>
                    <span className="font-medium">{courses.filter(c => c.status === "published").length}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Студенты</h3>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Icon name="Users" className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{teacher?.studentsCount || 0}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Новых за месяц:</span>
                    <span className="font-medium">+12</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Рейтинг</h3>
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Icon name="Star" className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{teacher?.rating || "—"}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Отзывов:</span>
                    <span className="font-medium">24</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Быстрые действия */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 py-6 h-auto flex-col"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Icon name="PlusCircle" className="h-6 w-6 mb-2" />
              <span>Создать новый курс</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 py-6 h-auto flex-col">
              <Icon name="MessageSquare" className="h-6 w-6 mb-2" />
              <span>Сообщения студентов</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 py-6 h-auto flex-col">
              <Icon name="BarChart2" className="h-6 w-6 mb-2" />
              <span>Аналитика и отчеты</span>
            </Button>
          </div>
        </div>

        {/* Табы с содержимым */}
        <Tabs defaultValue="my-courses" className="mt-8">
          <TabsList>
            <TabsTrigger value="my-courses">
              <Icon name="BookOpen" className="mr-2 h-4 w-4" />
              Мои курсы
            </TabsTrigger>
            <TabsTrigger value="messages">
              <Icon name="MessageSquare" className="mr-2 h-4 w-4" />
              Сообщения
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Icon name="BarChart2" className="mr-2 h-4 w-4" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Вкладка: Мои курсы */}
          <TabsContent value="my-courses" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <div className="flex gap-2">
                        {getStatusBadge(course.status)}
                        {getLevelBadge(course.level)}
                      </div>
                    </div>
                    <CardDescription>{course.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Icon name="Book" className="mr-1 h-4 w-4" />
                        <span>{course.lessons} уроков</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Users" className="mr-1 h-4 w-4" />
                        <span>{course.studentsCount} студентов</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Calendar" className="mr-1 h-4 w-4" />
                        <span>Обновлен: {course.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEditCourse(course.id)}
                    >
                      <Icon name="Edit" className="mr-2 h-4 w-4" />
                      Редактировать
                    </Button>
                    {course.status !== "published" && (
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handlePublishCourse(course.id)}
                      >
                        <Icon name="Globe" className="mr-2 h-4 w-4" />
                        Опубликовать
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Заглушки для других вкладок */}
          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Icon name="MessageSquare" className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Сообщения скоро будут доступны</h3>
                <p className="text-gray-500 mb-4 text-center">
                  Мы работаем над функционалом обмена сообщениями между преподавателями и студентами.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Icon name="BarChart2" className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Аналитика скоро будет доступна</h3>
                <p className="text-gray-500 mb-4 text-center">
                  Мы работаем над детальной аналитикой ваших курсов и успеваемости студентов.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Модальное окно загрузки курса */}
      {isUploadModalOpen && (
        <CourseUploadForm 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)} 
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
