
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

// Импорт типов и данных
import { User, Course } from "@/types/admin";
import { mockUsers, mockCourses } from "@/data/mockData";

// Импорт компонентов
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatistics from "@/components/admin/AdminStatistics";
import QuickActions from "@/components/admin/QuickActions";
import CoursesList from "@/components/admin/CoursesList";
import EmptySection from "@/components/admin/EmptySection";

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  // Получение данных при загрузке
  useEffect(() => {
    // Имитация проверки аутентификации и загрузки данных
    const loadData = async () => {
      try {
        // В реальном приложении здесь был бы запрос к API
        setTimeout(() => {
          const user = mockUsers[0]; // Для демонстрации берем первого пользователя (админа)
          
          if (user && (user.role === "admin" || user.role === "teacher")) {
            setCurrentUser(user);
            setCourses(mockCourses);
          } else {
            toast({
              title: "Доступ запрещен",
              description: "У вас недостаточно прав для доступа к этой странице",
              variant: "destructive",
            });
            navigate("/login");
          }
          setLoading(false);
        }, 800);
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, toast]);

  // Обработчики событий
  const handleLogout = () => {
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
    navigate("/");
  };

  const handleAddCourse = () => {
    toast({
      title: "Функция в разработке",
      description: "Создание курсов будет доступно в ближайшее время",
    });
  };

  const handleEditCourse = (courseId: number) => {
    navigate(`/admin/course-editor/${courseId}`);
  };

  const handleTogglePublish = (courseId: number) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, published: !course.published } 
          : course
      )
    );
    
    const course = courses.find(c => c.id === courseId);
    if (course) {
      toast({
        title: course.published ? "Курс снят с публикации" : "Курс опубликован",
        description: `Курс "${course.title}" ${course.published ? "снят с публикации" : "опубликован"}`
      });
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <AdminHeader 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Административная панель</h1>
          <p className="text-gray-600">
            Управляйте курсами, преподавателями и студентами
          </p>
        </div>

        {/* Статистика и быстрые действия */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatistics 
            courses={courses} 
            teachers={mockUsers}
          />
          
          <QuickActions />
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
            <CoursesList 
              courses={courses}
              onAddCourse={handleAddCourse}
              onEditCourse={handleEditCourse}
              onTogglePublish={handleTogglePublish}
            />
          </TabsContent>

          {/* Вкладка: Преподаватели (заглушка) */}
          <TabsContent value="teachers" className="mt-6">
            <EmptySection 
              icon="Users"
              title="Раздел в разработке"
              description="Функциональность управления преподавателями скоро будет доступна."
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
