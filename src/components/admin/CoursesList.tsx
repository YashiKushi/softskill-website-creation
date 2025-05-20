
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Course } from "@/types/admin";
import CourseEmptyState from "./CourseEmptyState";

interface CoursesListProps {
  courses: Course[];
  onAddCourse: () => void;
  onEditCourse: (courseId: number) => void;
  onTogglePublish: (courseId: number) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ 
  courses, 
  onAddCourse,
  onEditCourse,
  onTogglePublish
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Фильтрация курсов по поисковому запросу
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Функция для получения стилей для бейджа уровня сложности
  const getLevelBadgeClass = (level: string) => {
    switch(level) {
      case "beginner": 
        return "bg-green-100 text-green-800";
      case "intermediate": 
        return "bg-blue-100 text-blue-800";
      case "advanced": 
        return "bg-purple-100 text-purple-800";
      default: 
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Функция для локализации уровня сложности
  const getLevelLabel = (level: string) => {
    switch(level) {
      case "beginner": return "Начальный";
      case "intermediate": return "Средний";
      case "advanced": return "Продвинутый";
      default: return level;
    }
  };
  
  return (
    <div>
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
          onClick={onAddCourse}
        >
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          Новый курс
        </Button>
      </div>

      {filteredCourses.length === 0 ? (
        <CourseEmptyState 
          searchTerm={searchTerm} 
          onClearSearch={() => setSearchTerm("")}
          onCreateCourse={onAddCourse}
        />
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
                      <Badge className={getLevelBadgeClass(course.level)}>
                        {getLevelLabel(course.level)}
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
                          onClick={() => onEditCourse(course.id)}
                        >
                          <Icon name="Edit" className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          title={course.published ? "Снять с публикации" : "Опубликовать"}
                          onClick={() => onTogglePublish(course.id)}
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
    </div>
  );
};

export default CoursesList;
