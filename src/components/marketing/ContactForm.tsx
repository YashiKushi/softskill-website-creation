
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const ContactForm = () => {
  return (
    <Card className="w-full max-w-md bg-gray-50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Поможем подобрать обучение
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Имя и фамилия"
          className="h-12"
        />
        <Input
          type="email"
          placeholder="Email"
          className="h-12"
        />
        <div className="flex">
          <div className="flex items-center justify-center border rounded-l-md px-3 bg-white">
            <span>+7</span>
          </div>
          <Input
            type="tel"
            placeholder="912 345-67-89"
            className="h-12 rounded-l-none"
          />
        </div>
        
        <Button className="w-full h-12 bg-primary hover:bg-primary/90 font-medium">
          Хочу учиться
        </Button>
        
        <div className="flex items-start space-x-2 text-xs text-gray-500">
          <Checkbox id="terms" className="mt-1" />
          <label htmlFor="terms">
            Отправляя заявку, вы принимаете условия публичной оферты, правила акций и даёте согласие на обработку своих персональных данных в соответствии с политикой конфиденциальности
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
