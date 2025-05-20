
// Типы данных для админ-панели
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
  avatar?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  studentsCount: number;
  published: boolean;
  author: User;
}
