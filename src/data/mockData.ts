
import { User, Course } from "@/types/admin";

// Заглушка данных для пользователей
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Администратор",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
  },
  {
    id: 2,
    name: "Мария Петрова",
    email: "maria@example.com",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
];

// Заглушка данных для курсов
export const mockCourses: Course[] = [
  {
    id: 1,
    title: "Основы JavaScript",
    description: "Изучите основы JavaScript, включая переменные, типы данных, функции и объекты.",
    category: "Frontend",
    level: "beginner",
    studentsCount: 1245,
    published: true,
    author: mockUsers[1],
  },
  {
    id: 2,
    title: "Практический React",
    description: "Разработка современных веб-приложений с использованием React и связанных технологий.",
    category: "Frontend",
    level: "intermediate",
    studentsCount: 875,
    published: true,
    author: mockUsers[1],
  },
];
