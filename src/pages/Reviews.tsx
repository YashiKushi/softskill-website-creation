
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useState } from "react";

// Типы данных
interface Review {
  id: number;
  name: string;
  avatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  course: string;
  text: string;
  likes: number;
  reply?: {
    name: string;
    text: string;
    date: string;
  };
}

// Заглушка данных
const mockReviews: Review[] = [
  {
    id: 1,
    name: "Анна Смирнова",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 5,
    date: "15.04.2025",
    course: "Основы JavaScript",
    text: "Отличный курс! Я начинала с нуля и теперь уверенно пишу код на JavaScript. Преподаватель объясняет очень понятно, а практические задания помогают закрепить материал. Рекомендую всем, кто хочет освоить JavaScript.",
    likes: 24,
    reply: {
      name: "Александр Петров",
      text: "Анна, спасибо за отзыв! Рады, что вам понравился курс. Ждем вас на продвинутом уровне!",
      date: "16.04.2025"
    }
  },
  {
    id: 2,
    name: "Иван Петров",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    rating: 4,
    date: "10.04.2025",
    course: "Практический React",
    text: "Очень полезный курс для тех, кто хочет освоить React. Материал подается структурированно, много практики. Единственное, хотелось бы больше примеров реальных проектов. В целом доволен и уже применяю полученные знания в работе.",
    likes: 18
  },
  {
    id: 3,
    name: "Екатерина Иванова",
    avatar: "https://images.unsplash.com/photo-1591084728795-1149f32d9866",
    rating: 5,
    date: "02.04.2025",
    course: "Python для анализа данных",
    text: "Превосходный курс! За 3 месяца освоила Python с нуля и научилась анализировать данные. Отдельное спасибо преподавателю Дмитрию за терпение и подробные объяснения. Теперь я могу автоматизировать многие рабочие процессы, что сильно экономит время.",
    likes: 32,
    reply: {
      name: "Дмитрий Сидоров",
      text: "Екатерина, большое спасибо за отзыв! Очень рад, что курс оказался полезным. Удачи в применении новых навыков!",
      date: "03.04.2025"
    }
  },
  {
    id: 4,
    name: "Михаил Кузнецов",
    rating: 3,
    date: "28.03.2025",
    course: "Node.js и Express",
    text: "Курс неплохой, но некоторые темы объясняются слишком быстро. Для новичков в backend-разработке может быть сложно. Хотелось бы более детального разбора сложных концепций. Тем не менее, базовые знания получил и смог создать свой первый сервер.",
    likes: 7
  },
  {
    id: 5,
    name: "Ольга Соколова",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604",
    rating: 5,
    date: "22.03.2025",
    course: "TypeScript для профессионалов",
    text: "Лучший курс по TypeScript, который я нашла! Очень глубокое погружение в типизацию, generics и продвинутые концепции. Благодаря этому курсу я значительно улучшила качество своего кода и получила повышение на работе. Спасибо SoftSkill!",
    likes: 41
  },
  {
    id: 6,
    name: "Дмитрий Морозов",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
    rating: 4,
    date: "18.03.2025",
    course: "Алгоритмы и структуры данных",
    text: "Очень полезный курс для подготовки к техническим собеседованиям. Хорошо объясняются сложные алгоритмы и их применение. Было бы здорово добавить больше задач уровня FAANG-компаний, но в целом я доволен результатом.",
    likes: 15
  },
  {
    id: 7,
    name: "Наталья Козлова",
    rating: 2,
    date: "10.03.2025",
    course: "DevOps для разработчиков",
    text: "Ожидала большего от курса. Материал местами устаревший, а практические задания не всегда работают как описано. Техподдержка отвечает медленно. На мой взгляд, курс требует серьезного обновления.",
    likes: 3,
    reply: {
      name: "Команда SoftSkill",
      text: "Наталья, спасибо за честный отзыв. Мы уже работаем над обновлением курса и исправлением указанных проблем. Приносим извинения за доставленные неудобства и предлагаем вам дополнительную консультацию с преподавателем.",
      date: "11.03.2025"
    }
  },
  {
    id: 8,
    name: "Алексей Попов",
    avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4",
    rating: 5,
    date: "05.03.2025",
    course: "Мобильная разработка с React Native",
    text: "Великолепный курс! За время обучения я разработал полноценное мобильное приложение, которое уже опубликовал в App Store и Google Play. Преподаватель всегда на связи и помогает решать сложные проблемы. Соотношение цена/качество на высоте!",
    likes: 28
  }
];

const Reviews = () => {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);
  const [activeTab, setActiveTab] = useState("all");

  const filterReviewsByRating = (rating: number | string) => {
    if (rating === "all") {
      setFilteredReviews(mockReviews);
      setActiveTab("all");
    } else {
      setFilteredReviews(mockReviews.filter(review => review.rating === Number(rating)));
      setActiveTab(rating.toString());
    }
  };

  // Расчет статистики по рейтингам
  const ratingStats = {
    totalReviews: mockReviews.length,
    averageRating: (mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length).toFixed(1),
    ratingsCount: {
      5: mockReviews.filter(review => review.rating === 5).length,
      4: mockReviews.filter(review => review.rating === 4).length,
      3: mockReviews.filter(review => review.rating === 3).length,
      2: mockReviews.filter(review => review.rating === 2).length,
      1: mockReviews.filter(review => review.rating === 1).length,
    }
  };

  // Рендер звезд рейтинга
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon 
            key={star} 
            name="Star" 
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
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
              className="text-purple-600 font-medium"
            >
              Отзывы
            </Link>
            <Link
              to="/contacts"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
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
      <main className="container mx-auto px-4 py-12">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Отзывы студентов</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Узнайте, что думают наши выпускники о курсах SoftSkill и почему они рекомендуют нас своим друзьям и коллегам.
          </p>
        </div>

        {/* Общий рейтинг */}
        <section className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-purple-600 mb-2">
                  {ratingStats.averageRating}
                </div>
                <div className="flex mb-2">
                  {renderStars(Math.round(parseFloat(ratingStats.averageRating)))}
                </div>
                <p className="text-gray-600">
                  Основано на {ratingStats.totalReviews} отзывах
                </p>
              </div>
              
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <div className="w-12 font-medium">{rating} ★</div>
                    <div className="flex-1 mx-3">
                      <Progress 
                        value={(ratingStats.ratingsCount[rating as keyof typeof ratingStats.ratingsCount] / ratingStats.totalReviews) * 100} 
                        className="h-2.5"
                      />
                    </div>
                    <div className="w-10 text-right text-gray-600">
                      {ratingStats.ratingsCount[rating as keyof typeof ratingStats.ratingsCount]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Фильтр отзывов */}
        <section className="mb-8">
          <Tabs 
            value={activeTab}
            onValueChange={filterReviewsByRating}
            className="flex justify-center"
          >
            <TabsList>
              <TabsTrigger value="all">Все отзывы</TabsTrigger>
              <TabsTrigger value="5">5 звезд</TabsTrigger>
              <TabsTrigger value="4">4 звезды</TabsTrigger>
              <TabsTrigger value="3">3 звезды</TabsTrigger>
              <TabsTrigger value="2">2 звезды</TabsTrigger>
              <TabsTrigger value="1">1 звезда</TabsTrigger>
            </TabsList>
          </Tabs>
        </section>

        {/* Список отзывов */}
        <section>
          <div className="grid gap-6">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Avatar className="h-12 w-12 mr-4">
                        {review.avatar ? (
                          <AvatarImage src={review.avatar} alt={review.name} />
                        ) : (
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            {review.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold">{review.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 gap-2">
                              <span>{review.date}</span>
                              <span>•</span>
                              <span>Курс: {review.course}</span>
                            </div>
                          </div>
                          <div>
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-gray-700">{review.text}</p>
                        </div>
                        <div className="mt-4 flex items-center">
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Icon name="ThumbsUp" className="mr-1 h-4 w-4" />
                            Полезно ({review.likes})
                          </Button>
                        </div>

                        {/* Ответ на отзыв */}
                        {review.reply && (
                          <div className="mt-4 pl-6 border-l-2 border-gray-200">
                            <div className="mb-1">
                              <h4 className="font-semibold">{review.reply.name}</h4>
                              <div className="text-sm text-gray-500">{review.reply.date}</div>
                            </div>
                            <p className="text-gray-700">{review.reply.text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Отзывы не найдены</h3>
                <p className="text-gray-600 mb-4">
                  По выбранным критериям не найдено ни одного отзыва.
                </p>
                <Button 
                  onClick={() => filterReviewsByRating("all")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Показать все отзывы
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Готовы начать свое обучение?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам студентов, которые уже изменили свою карьеру с помощью наших курсов.
            </p>
            <Link to="/courses">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Выбрать курс
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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
                  <Icon name="Mail" className="mr-2 h-4 w-4" /> info@softskill.ru
                </li>
                <li className="flex items-center">
                  <Icon name="Phone" className="mr-2 h-4 w-4" /> +7 (800) 555-35-35
                </li>
                <li className="flex items-center">
                  <Icon name="MapPin" className="mr-2 h-4 w-4" /> Москва, ул. Программистов, 42
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

export default Reviews;
