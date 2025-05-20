
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface QuickAction {
  icon: string;
  label: string;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  // Действия по умолчанию, если не предоставлены извне
  const defaultActions: QuickAction[] = [
    {
      icon: "PlusCircle",
      label: "Создать курс",
      bgColor: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      onClick: () => console.log("Create course clicked")
    },
    {
      icon: "UserPlus",
      label: "Добавить преподавателя",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      onClick: () => console.log("Add teacher clicked")
    },
    {
      icon: "FileText",
      label: "Отчеты и аналитика",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      onClick: () => console.log("Reports clicked")
    }
  ];
  
  const actionItems = actions || defaultActions;
  
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Быстрые действия</CardTitle>
        <CardDescription>
          Управление основными элементами образовательной платформы
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actionItems.map((action, index) => (
          <Button 
            key={index}
            className={`flex-col h-auto py-4 ${action.bgColor} ${action.hoverColor}`}
            onClick={action.onClick}
          >
            <Icon name={action.icon} className="h-6 w-6 mb-2" />
            <span className="text-sm">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
