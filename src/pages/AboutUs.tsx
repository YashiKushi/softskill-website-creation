
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const AboutUs = () => {
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
              className="text-purple-600 font-medium"
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
      <main>
        {/* Заголовок */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">О нашей школе</h1>
            <p className="text-xl max-w-3xl">
              SoftSkill — это образовательная платформа, где технические навыки в программировании сочетаются с развитием soft skills, необходимых для успешной карьеры в IT.
            </p>
          </div>
        </section>

        {/* История */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge variant="outline" className="bg-purple-100 text-purple-600 mb-2">
                  Наша история
                </Badge>
                <h2 className="text-3xl font-bold mb-6">Как всё начиналось</h2>
                <p className="text-gray-700 mb-6">
                  SoftSkill была основана в 2019 году группой энтузиастов из IT-индустрии, которые заметили, что многим начинающим разработчикам не хватает не только технических знаний, но и навыков коммуникации, работы в команде и презентации своих идей.
                </p>
                <p className="text-gray-700 mb-6">
                  Мы начали с небольших офлайн-курсов в Москве, но быстро выросли до онлайн-платформы с тысячами студентов по всей России и за её пределами. Сегодня SoftSkill — это команда из более чем 50 профессионалов: разработчиков, дизайнеров, методистов и наставников.
                </p>
                <p className="text-gray-700">
                  Наша миссия — сделать IT-образование доступным и эффективным, помогая студентам не только освоить технические навыки, но и развить качества, необходимые для успешной карьеры.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-lg transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                  alt="Команда SoftSkill" 
                  className="relative z-10 rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ценности */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="bg-purple-100 text-purple-600 mb-2">
                Наши ценности
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Принципы нашей школы</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Мы верим, что правильный подход к обучению программированию может изменить жизнь человека и открыть новые возможности.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Lightbulb" className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Практический подход</h3>
                <p className="text-gray-600">
                  Мы фокусируемся на практике. Теория важна, но реальные проекты и задачи помогают закрепить знания и развить необходимые навыки.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Users" className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Сообщество</h3>
                <p className="text-gray-600">
                  Мы строим активное сообщество разработчиков. Общение, совместные проекты и взаимная поддержка — важная часть обучения.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Target" className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Ориентация на результат</h3>
                <p className="text-gray-600">
                  Наша цель — не просто дать знания, а помочь студентам достичь конкретных карьерных целей в IT-сфере.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Команда */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="bg-purple-100 text-purple-600 mb-2">
                Наша команда
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Познакомьтесь с экспертами</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Наши преподаватели — практикующие специалисты с опытом работы в ведущих IT-компаниях.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-4 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" 
                    alt="Александр Петров" 
                    className="w-48 h-48 object-cover rounded-full mx-auto"
                  />
                  <div className="absolute bottom-0 right-1/3 bg-purple-600 text-white p-2 rounded-full">
                    <Icon name="Code" className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Александр Петров</h3>
                <p className="text-gray-600 mb-2">Основатель, CTO</p>
                <p className="text-sm text-gray-500">10+ лет в разработке</p>
              </div>

              <div className="text-center">
                <div className="mb-4 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                    alt="Мария Иванова" 
                    className="w-48 h-48 object-cover rounded-full mx-auto"
                  />
                  <div className="absolute bottom-0 right-1/3 bg-pink-500 text-white p-2 rounded-full">
                    <Icon name="Layout" className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Мария Иванова</h3>
                <p className="text-gray-600 mb-2">Руководитель направления Frontend</p>
                <p className="text-sm text-gray-500">Эксперт в React и Vue</p>
              </div>

              <div className="text-center">
                <div className="mb-4 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                    alt="Дмитрий Сидоров" 
                    className="w-48 h-48 object-cover rounded-full mx-auto"
                  />
                  <div className="absolute bottom-0 right-1/3 bg-blue-600 text-white p-2 rounded-full">
                    <Icon name="Database" className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Дмитрий Сидоров</h3>
                <p className="text-gray-600 mb-2">Руководитель направления Backend</p>
                <p className="text-sm text-gray-500">Эксперт в Node.js и Python</p>
              </div>

              <div className="text-center">
                <div className="mb-4 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" 
                    alt="Елена Козлова" 
                    className="w-48 h-48 object-cover rounded-full mx-auto"
                  />
                  <div className="absolute bottom-0 right-1/3 bg-green-600 text-white p-2 rounded-full">
                    <Icon name="Users" className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Елена Козлова</h3>
                <p className="text-gray-600 mb-2">Руководитель HR</p>
                <p className="text-sm text-gray-500">Помогает с трудоустройством</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Присоединиться к команде
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы начать обучение?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам студентов, которые уже изменили свою карьеру с SoftSkill.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Выбрать курс
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Связаться с нами
                </Button>
              </Link>
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

export default AboutUs;
