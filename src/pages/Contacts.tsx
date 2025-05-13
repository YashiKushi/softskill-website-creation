import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки формы
    setTimeout(() => {
      toast({
        title: "Сообщение отправлено",
        description:
          "Спасибо за обращение! Мы свяжемся с вами в ближайшее время.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
            <Badge variant="outline" className="bg-purple-100 text-purple-600">
              Школа
            </Badge>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              О нас
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Курсы
            </Link>
            <Link
              to="/reviews"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Отзывы
            </Link>
            <Link to="/contacts" className="text-purple-600 font-medium">
              Контакты
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" className="hidden md:inline-flex">
                Войти
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Регистрация
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" />
            </Button>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main>
        {/* Заголовок */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Свяжитесь с нами
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              У вас есть вопросы о наших курсах или предложения по
              сотрудничеству? Мы всегда на связи и готовы помочь!
            </p>
          </div>
        </section>

        {/* Контактная информация и форма */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Контактная информация */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Контактная информация
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon name="MapPin" className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Адрес</h3>
                      <p className="text-gray-600">
                        г. Москва, ул. Программистов, д. 42, офис 404
                      </p>
                      <p className="text-gray-600 mt-1">
                        Время работы: Пн-Пт с 9:00 до 18:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon name="Phone" className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Телефон</h3>
                      <p className="text-gray-600">+7 (800) 555-35-35</p>
                      <p className="text-gray-600 mt-1">
                        Звонок бесплатный по всей России
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon name="Mail" className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600">info@softskill.ru</p>
                      <p className="text-gray-600 mt-1">
                        Техническая поддержка: support@softskill.ru
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon
                        name="MessageCircle"
                        className="h-6 w-6 text-purple-600"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Социальные сети</h3>
                      <div className="flex space-x-4 mt-2">
                        <a
                          href="#"
                          className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Icon name="Facebook" className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Icon name="Instagram" className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Icon name="Twitter" className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Icon name="Youtube" className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Форма обратной связи */}
              <div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
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
                      <Label htmlFor="subject">Тема</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Вопрос о курсах"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Введите ваше сообщение..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Icon
                            name="Loader2"
                            className="mr-2 h-4 w-4 animate-spin"
                          />
                          Отправка...
                        </>
                      ) : (
                        "Отправить сообщение"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Карта */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Как нас найти</h2>
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* Здесь в реальном проекте можно вставить карту Google Maps или Яндекс-Карт */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <div className="text-center">
                  <Icon
                    name="Map"
                    className="h-12 w-12 text-gray-500 mb-2 mx-auto"
                  />
                  <p className="text-gray-700">Карта с расположением офиса</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-600 mb-2"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Часто задаваемые вопросы
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Не нашли ответ на свой вопрос? Свяжитесь с нами напрямую!
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm divide-y">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    Как записаться на курс?
                  </h3>
                  <p className="text-gray-600">
                    Для записи на курс необходимо зарегистрироваться на сайте,
                    выбрать интересующий вас курс и оплатить его. После оплаты
                    вы получите доступ к материалам курса в личном кабинете.
                  </p>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    Можно ли получить возврат средств?
                  </h3>
                  <p className="text-gray-600">
                    Да, мы предоставляем 7-дневную гарантию возврата денег. Если
                    в течение 7 дней после начала обучения вы решите, что курс
                    вам не подходит, мы вернем полную стоимость.
                  </p>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    Как долго я буду иметь доступ к курсу?
                  </h3>
                  <p className="text-gray-600">
                    После оплаты курса вы получаете к нему пожизненный доступ.
                    Вы сможете возвращаться к материалам в любое время.
                  </p>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    Есть ли у вас корпоративное обучение?
                  </h3>
                  <p className="text-gray-600">
                    Да, мы предлагаем специальные программы обучения для
                    компаний. Свяжитесь с нами по email corporate@softskill.ru
                    для получения подробной информации.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SoftSkill</h3>
              <p className="text-gray-400">
                Школа программирования, где технические навыки сочетаются с
                развитием soft skills.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Курсы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reviews"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Отзывы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacts"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Icon name="Mail" className="mr-2 h-4 w-4" />{" "}
                  info@softskill.ru
                </li>
                <li className="flex items-center">
                  <Icon name="Phone" className="mr-2 h-4 w-4" /> +7 (800)
                  555-35-35
                </li>
                <li className="flex items-center">
                  <Icon name="MapPin" className="mr-2 h-4 w-4" /> Москва, ул.
                  Программистов, 42
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Facebook" />
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Instagram" />
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Twitter" />
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  <Icon name="Youtube" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 SoftSkill. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;
