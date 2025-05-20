
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const CourseSearch = () => {
  return (
    <div className="flex w-full max-w-3xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          type="text" 
          placeholder="Какой курс вы ищете?" 
          className="pl-10 h-12 rounded-l-md rounded-r-none border-r-0"
        />
      </div>
      <Button className="h-12 rounded-l-none font-medium px-8">
        Найти курс
      </Button>
    </div>
  );
};

export default CourseSearch;
