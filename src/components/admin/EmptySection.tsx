
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface EmptySectionProps {
  icon: string;
  title: string;
  description: string;
}

const EmptySection: React.FC<EmptySectionProps> = ({ icon, title, description }) => {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Icon name={icon} className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
      </CardContent>
    </Card>
  );
};

export default EmptySection;
