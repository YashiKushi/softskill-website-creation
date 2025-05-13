
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Имитация запроса к API
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Здесь в реальном приложении был бы запрос к API
        localStorage.setItem("user", JSON.stringify({ email: formData.email, name: "Пользователь" }));
        toast({
          title: "Вход выполнен успешно",
          description: "Добро пожаловать в личный кабинет SoftSkill!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Ошибка входа",
          description: "Пожалуйста, заполните все поля",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-bold text-purple-600">SoftSkill</h2>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Вход в личный кабинет</h2>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardDescription>
                Введите данные своего аккаунта для доступа к курсам и отслеживания прогресса.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                    Забыли пароль?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Вход...
                  </>
                ) : "Войти"}
              </Button>
              <p className="text-center text-sm text-gray-600">
                Нет аккаунта?{" "}
                <Link to="/register" className="font-medium text-purple-600 hover:text-purple-800">
                  Зарегистрироваться
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
