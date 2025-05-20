
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

// Типы тарифов
interface PricingPlan {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  features: string[];
  isPremium?: boolean;
}

// Заглушки для тарифов
const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Базовый",
    price: 9990,
    oldPrice: 19980,
    description: "Для начинающих",
    features: [
      "Доступ к 5 базовым курсам",
      "Проверка домашних заданий",
      "Сертификат об окончании",
    ],
  },
  {
    id: "standard",
    name: "Стандарт",
    price: 14990,
    oldPrice: 29980,
    description: "Для тех, кто серьезно",
    features: [
      "Доступ ко всем курсам",
      "Персональный наставник",
      "Работа над реальными проектами",
      "Помощь с трудоустройством",
    ],
    isPremium: true,
  },
  {
    id: "premium",
    name: "Премиум",
    price: 24990,
    oldPrice: 49980,
    description: "Для будущих профессионалов",
    features: [
      "Все преимущества Стандарта",
      "Индивидуальный учебный план",
      "Гарантированное трудоустройство",
      "Доступ к закрытому сообществу",
    ],
  },
];

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  // Данные формы
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "card",
    promoCode: "",
    additionalInfo: "",
  });

  // При загрузке страницы проверяем параметры URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planId = params.get("plan");
    
    if (planId) {
      const plan = pricingPlans.find((p) => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    } else if (pricingPlans.length > 0) {
      // Если план не указан, выбираем первый по умолчанию
      setSelectedPlan(pricingPlans[0]);
    }
  }, [location]);

  // Обработка изменения полей формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обработка выбора плана
  const handlePlanChange = (planId: string) => {
    const plan = pricingPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  // Обработка выбора метода оплаты
  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите тариф",
        variant: "destructive",
      });
      return;
    }
    
    // Валидация полей
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Имитация запроса к серверу
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Заказ оформлен!",
        description: `Вы успешно оформили тариф "${selectedPlan.name}". Проверьте вашу почту для получения дальнейших инструкций.`,
      });
      
      // Редирект на страницу успешного оформления (можно создать отдельно)
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Ошибка при оформлении",
        description: "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">
              Оформление
            </Badge>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost">
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Оформление заказа</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Форма оформления */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ваши данные</CardTitle>
                  <CardDescription>
                    Заполните форму для оформления заказа
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Имя*</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Иван"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Фамилия*</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Иванов"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ivan@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон*</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+7 (___) ___-__-__"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <Label>Способ оплаты*</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div
                          className={`border rounded-md p-4 cursor-pointer flex items-center ${
                            formData.paymentMethod === "card"
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => handlePaymentMethodChange("card")}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border mr-2 ${
                              formData.paymentMethod === "card"
                                ? "border-purple-600 bg-purple-600"
                                : "border-gray-300"
                            }`}
                          />
                          <div className="flex items-center">
                            <Icon name="CreditCard" className="mr-2 h-4 w-4" />
                            <span>Банковская карта</span>
                          </div>
                        </div>
                        <div
                          className={`border rounded-md p-4 cursor-pointer flex items-center ${
                            formData.paymentMethod === "invoice"
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => handlePaymentMethodChange("invoice")}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border mr-2 ${
                              formData.paymentMethod === "invoice"
                                ? "border-purple-600 bg-purple-600"
                                : "border-gray-300"
                            }`}
                          />
                          <div className="flex items-center">
                            <Icon name="File" className="mr-2 h-4 w-4" />
                            <span>Счет для оплаты</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="promoCode">Промокод</Label>
                      <Input
                        id="promoCode"
                        name="promoCode"
                        placeholder="Если есть промокод, введите его здесь"
                        value={formData.promoCode}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="additionalInfo">Дополнительная информация</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        placeholder="Если у вас есть дополнительные вопросы или пожелания, напишите их здесь"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Информация о заказе */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Ваш заказ</CardTitle>
                  <CardDescription>
                    Информация о выбранном тарифе
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Label>Выберите тариф</Label>
                    <Select
                      value={selectedPlan?.id || ""}
                      onValueChange={handlePlanChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тариф" />
                      </SelectTrigger>
                      <SelectContent>
                        {pricingPlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} - {plan.price.toLocaleString()} ₽
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedPlan && (
                    <div className="border rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{selectedPlan.name}</h3>
                        {selectedPlan.isPremium && (
                          <Badge className="bg-yellow-100 text-yellow-800">Популярный</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{selectedPlan.description}</p>
                      
                      <ul className="space-y-2 mb-4">
                        {selectedPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Icon name="Check" className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-1">
                          <span>Стоимость:</span>
                          <span className="font-semibold">{selectedPlan.price.toLocaleString()} ₽</span>
                        </div>
                        {selectedPlan.oldPrice && (
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Скидка:</span>
                            <span>{(selectedPlan.oldPrice - selectedPlan.price).toLocaleString()} ₽</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                        Оформление...
                      </>
                    ) : (
                      "Оформить заказ"
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4 text-sm text-gray-500">
                <p className="flex items-center mb-2">
                  <Icon name="ShieldCheck" className="mr-2 h-4 w-4 text-green-500" />
                  Безопасная оплата через шифрованное соединение
                </p>
                <p className="flex items-center">
                  <Icon name="RotateCcw" className="mr-2 h-4 w-4 text-blue-500" />
                  Гарантия возврата в течение 7 дней
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderForm;
