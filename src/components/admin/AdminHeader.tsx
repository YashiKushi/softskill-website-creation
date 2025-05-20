
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { User } from "@/types/admin";

interface AdminHeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-purple-600">SoftSkill</div>
          <Badge variant="outline" className="bg-purple-100 text-purple-600">
            Админ-панель
          </Badge>
        </Link>
        
        <div className="flex items-center gap-4">
          {currentUser && (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={currentUser.avatar || "https://via.placeholder.com/40"}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-500">
                  {currentUser.role === "admin" ? "Администратор" : "Преподаватель"}
                </p>
              </div>
            </div>
          )}
          <Button variant="outline" onClick={onLogout}>
            <Icon name="LogOut" className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Выход</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
