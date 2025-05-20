
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Course, User } from "@/types/admin";

interface AdminStatisticsProps {
  courses: Course[];
  teachers: User[];
}

const AdminStatistics: React.FC<AdminStatisticsProps> = ({ courses, teachers }) => {
  // Получаем общее количество студентов из всех курсов
  const totalStudents = courses.reduce((sum, course) => sum + course.studentsCount, 0);
  
  return (
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
              <p className="font-bold">{teachers.filter(t => t.role === "teacher").length}</p>
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
              <p className="font-bold">{totalStudents}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminStatistics;
