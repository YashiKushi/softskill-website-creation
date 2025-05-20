
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface CourseEmptyStateProps {
  searchTerm: string;
  onClearSearch: () => void;
  onCreateCourse: () => void;
}

const CourseEmptyState: React.FC<CourseEmptyStateProps> = ({ 
  searchTerm, 
  onClearSearch,
  onCreateCourse
}) => {
  return (
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
            onClick={onClearSearch}
          >
            Очистить поиск
          </Button>
        ) : (
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={onCreateCourse}
          >
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Создать курс
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseEmptyState;
