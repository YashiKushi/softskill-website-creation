
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

// Типы данных
interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "text" | "quiz";
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  progress: number;
  modules: Module[];
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  studentsCount: number;
  rating: number;
  skills: string[];
  prerequisites: string[];
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
}

// Заглушка данных
const mockCourses: Record<string, Course> = {
  "1": {
    id: 1,
    title: "Основы JavaScript",
    description: "Изучите основы JavaScript, включая переменные, типы данных, функции и объекты.",
    longDescription: "JavaScript — это мощный язык программирования, который широко используется для создания интерактивных веб-страниц и приложений. Этот курс предназначен для начинающих, которые хотят освоить основы JavaScript и начать свой путь в веб-разработке. В ходе курса вы изучите синтаксис языка, типы данных, функции, объекты, массивы, а также основы работы с DOM (Document Object Model). Курс включает в себя практические задания, которые помогут закрепить полученные знания.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
    progress: 75,
    level: "beginner",
    category: "JavaScript",
    studentsCount: 1245,
    rating: 4.8,
    skills: [
      "Основы программирования", 
      "JavaScript ES6+", 
      "Работа с DOM", 
      "Обработка событий",
      "Асинхронное программирование"
    ],
    prerequisites: [
      "Базовые знания HTML и CSS",
      "Понимание основных концепций программирования"
    ],
    instructor: {
      name: "Алексей Иванов",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      bio: "Senior Frontend Developer с 10-летним опытом работы. Эксперт в JavaScript, React и TypeScript. Автор нескольких книг по веб-разработке."
    },
    modules: [
      {
        id: 1,
        title: "Введение в JavaScript",
        lessons: [
          { id: 1, title: "Что такое JavaScript", duration: "10 мин", completed: true, type: "video" },
          { id: 2, title: "Установка и настройка среды разработки", duration: "15 мин", completed: true, type: "text" },
          { id: 3, title: "Первая программа на JavaScript", duration: "20 мин", completed: true, type: "video" }
        ]
      },
      {
        id: 2,
        title: "Основы синтаксиса JavaScript",
        lessons: [
          { id: 4, title: "Переменные и типы данных", duration: "25 мин", completed: true, type: "video" },
          { id: 5, title: "Операторы и выражения", duration: "20 мин", completed: true, type: "video" },
          { id: 6, title: "Условные конструкции", duration: "30 мин", completed: true, type: "video" },
          { id: 7, title: "Практическое задание: Калькулятор", duration: "45 мин", completed: true, type: "text" }
        ]
      },
      {
        id: 3,
        title: "Функции и объекты",
        lessons: [
          { id: 8, title: "Функции в JavaScript", duration: "35 мин", completed: true, type: "video" },
          { id: 9, title: "Области видимости", duration: "25 мин", completed: true, type: "video" },
          { id: 10, title: "Объекты и их методы", duration: "40 мин", completed: false, type: "video" },
          { id: 11, title: "Практическое задание: Библиотека книг", duration: "60 мин", completed: false, type: "text" },
          { id: 12, title: "Итоговый тест по модулю", duration: "30 мин", completed: false, type: "quiz" }
        ]
      }
    ]
  },
  "2": {
    id: 2,
    title: "Практический React",
    description: "Разработка современных веб-приложений с использованием React и связанных технологий.",
    longDescription: "React — это популярная библиотека JavaScript для создания пользовательских интерфейсов. В этом курсе вы освоите основы React, научитесь создавать компоненты, работать с состояниями и свойствами, использовать хуки и контекст. Курс ориентирован на практику — вы будете разрабатывать реальное приложение, которое можно будет включить в портфолио. К концу курса вы сможете самостоятельно создавать сложные интерактивные веб-приложения.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    progress: 30,
    level: "intermediate",
    category: "React",
    studentsCount: 875,
    rating: 4.9,
    skills: [
      "React.js", 
      "Управление состоянием", 
      "Hooks API", 
      "React Router",
      "Работа с API"
    ],
    prerequisites: [
      "Уверенное знание JavaScript",
      "Понимание принципов ES6+",
      "Базовые знания HTML и CSS"
    ],
    instructor: {
      name: "Мария Петрова",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Frontend разработчик с 7-летним опытом. Эксперт в React и Redux. Ведет популярный YouTube канал по веб-разработке."
    },
    modules: [
      {
        id: 1,
        title: "Введение в React",
        lessons: [
          { id: 1, title: "Что такое React и зачем он нужен", duration: "15 мин", completed: true, type: "video" },
          { id: 2, title: "Настройка окружения для разработки", duration: "20 мин", completed: true, type: "text" },
          { id: 3, title: "Создание первого компонента", duration: "25 мин", completed: true, type: "video" }
        ]
      },
      {
        id: 2,
        title: "Компоненты и свойства",
        lessons: [
          { id: 4, title: "Функциональные и классовые компоненты", duration: "30 мин", completed: true, type: "video" },
          { id: 5, title: "Передача данных через props", duration: "25 мин", completed: false, type: "video" },
          { id: 6, title: "Композиция компонентов", duration: "35 мин", completed: false, type: "video" },
          { id: 7, title: "Практическое задание: Карточки пользователей", duration: "55 мин", completed: false, type: "text" }
        ]
      }
    ]
  }
};

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // Имитация загрузки данных с сервера
    setTimeout(() => {
      if (id && mockCourses[id]) {
        setCourse(mockCourses[id]);
        setIsEnrolled(mockCourses[id].progress > 0);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleEnroll = () => {
    toast({
      title: "Поздравляем!",
      description: "Вы успешно записались на курс",
    });
    setIsEnrolled(true);
  };

  const handleContinue = () => {
    toast({
      title: "Продолжаем обучение",
      description: "Переходим к следующему уроку",
    });
  };

  const getLevelBadge = (level: Course["level"]) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-blue-100 text-blue-800",
      advanced: "bg-purple-100 text-purple-800"
    };
    
    const labels = {
      beginner: "Начальный",
      intermediate: "Средний",
      advanced: "Продвинутый"
    };
    
    return <Badge className={colors[level]}>{labels[level]}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="mx-auto h-8 w-8 animate-spin text-purple-600" />
          <p className="mt-2 text-gray-600">Загрузка курса...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Icon name="AlertCircle" className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Курс не найден</h1>
          <p className="text-gray-600 mb-6">Извините, запрашиваемый курс не существует.</p>
          <Link to="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Вернуться к моим курсам
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">Курс</Badge>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="outline">
                <Icon name="Layout" className="mr-2 h-4 w-4" />
                Кабинет
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Баннер курса */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="outline" className="bg-white/20 text-white">{course.category}</Badge>
                {getLevelBadge(course.level)}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg mb-6 opacity-90">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Icon name="Users" className="mr-2 h-5 w-5" />
                  <span>{course.studentsCount} студентов</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Star" className="mr-2 h-5 w-5 text-yellow-300" />
                  <span>{course.rating} рейтинг</span>
                </div>
                <div className="flex items-center">
                  <Icon name="BookOpen" className="mr-2 h-5 w-5" />
                  <span>
                    {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} уроков
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Инструктор</p>
                  <p className="text-white/90">{course.instructor.name}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <Card className="shadow-lg">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  {isEnrolled ? (
                    <>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Ваш прогресс</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleContinue}>
                        <Icon name="Play" className="mr-2 h-4 w-4" />
                        Продолжить обучение
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          <span className="line-through text-gray-400 mr-2">19 990 ₽</span>
                          <span>9 990 ₽</span>
                        </div>
                        <Badge className="bg-pink-100 text-pink-800">Скидка 50%</Badge>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-2" onClick={handleEnroll}>
                        <Icon name="GraduationCap" className="mr-2 h-4 w-4" />
                        Записаться на курс
                      </Button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        7 дней гарантия возврата денег
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Контент курса */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="content">
          <TabsList className="mb-8">
            <TabsTrigger value="content">
              <Icon name="BookOpen" className="mr-2 h-4 w-4" />
              Содержание курса
            </TabsTrigger>
            <TabsTrigger value="about">
              <Icon name="Info" className="mr-2 h-4 w-4" />
              О курсе
            </TabsTrigger>
            <TabsTrigger value="instructor">
              <Icon name="User" className="mr-2 h-4 w-4" />
              Инструктор
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Содержание курса</h2>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{course.modules.length} модулей</span> • 
                    <span className="ml-2">
                      {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} уроков
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {course.progress}% пройдено
                  </Badge>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {course.modules.map((module) => (
                  <AccordionItem key={module.id} value={`module-${module.id}`}>
                    <AccordionTrigger className="hover:bg-gray-50 rounded-md px-3">
                      <div className="flex items-center">
                        <span>{module.title}</span>
                        <Badge className="ml-3 bg-gray-100 text-gray-700">
                          {module.lessons.length} уроков
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <ul className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="py-2 border-b last:border-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {lesson.completed ? (
                                  <div className="mr-2 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Icon name="Check" className="h-3 w-3 text-green-600" />
                                  </div>
                                ) : (
                                  <div className="mr-2 h-5 w-5 rounded-full border border-gray-300"></div>
                                )}
                                <div>
                                  <div className="flex items-center">
                                    {lesson.type === "video" && <Icon name="Video" className="mr-2 h-4 w-4 text-purple-600" />}
                                    {lesson.type === "text" && <Icon name="FileText" className="mr-2 h-4 w-4 text-blue-600" />}
                                    {lesson.type === "quiz" && <Icon name="CheckSquare" className="mr-2 h-4 w-4 text-orange-600" />}
                                    <span>{lesson.title}</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">О курсе</h2>
              <p className="text-gray-700 mb-6">{course.longDescription}</p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Icon name="Award" className="mr-2 h-5 w-5 text-purple-600" />
                    Чему вы научитесь
                  </h3>
                  <ul className="space-y-2">
                    {course.skills.map((skill, index) => (
                      <li key={index} className="flex items-start">
                        <Icon name="Check" className="mr-2 h-5 w-5 text-green-600 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Icon name="AlertCircle" className="mr-2 h-5 w-5 text-purple-600" />
                    Требования к курсу
                  </h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <Icon name="ArrowRight" className="mr-2 h-5 w-5 text-purple-600 mt-0.5" />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Что включено</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                  <Icon name="Video" className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="font-medium">Видеоуроки</span>
                  <span className="text-sm text-gray-600">Доступ навсегда</span>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                  <Icon name="FileText" className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="font-medium">Материалы</span>
                  <span className="text-sm text-gray-600">Готовые примеры</span>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                  <Icon name="MessageSquare" className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="font-medium">Поддержка</span>
                  <span className="text-sm text-gray-600">Ответы на вопросы</span>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                  <Icon name="Award" className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="font-medium">Сертификат</span>
                  <span className="text-sm text-gray-600">После завершения</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instructor">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2">{course.instructor.name}</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-purple-100 text-purple-800">Преподаватель</Badge>
                    <div className="flex items-center text-yellow-500">
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <span className="ml-1 text-gray-700">5.0</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{course.instructor.bio}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Linkedin" className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Github" className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default CourseDetails;
