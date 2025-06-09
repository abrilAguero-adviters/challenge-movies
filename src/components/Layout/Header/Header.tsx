import accentIcon from "@/common/assets/icons/accent.png";
import arrowDownIcon from "@/common/assets/icons/arrowDown.png";
import menuIcon from "@/common/assets/icons/menu.png";
import notificationIcon from "@/common/assets/icons/notification.png";
import searchIcon from "@/common/assets/icons/search.png";

import userIcon from "@/common/assets/icons/user.png";
import { NAV_LINKS } from "@/common/constants/navlinks.constants";
import CustomIcon from "@/components/CustomIcon/CustomIcon";
import React from "react";
import { Link } from "react-router-dom";
import type { CurrentView } from "../MainLayout";

interface HeaderProps {
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  sidebarVisible,
  setSidebarVisible,
}) => {
  return (
    <header className="bg-dark-primary/70 border-b border-dark-tertiary sticky top-0 z-10 px-4 lg:px-10">
      <nav className="flex justify-between items-end h-16 max-w-7xl w-full">
        {/* Menú de navegación solo en desktop */}
        <div className="hidden lg:flex gap-10 pl-32">
          {NAV_LINKS.map((item) => (
            <div key={item.value} className="flex flex-col items-center gap-2">
              <Link
                to="/"
                className={`text-gray-400 text-sm font-medium transition-colors hover:text-white ${
                  currentView === item.value ? "text-white" : ""
                }`}
                onClick={() => setCurrentView(item.value as CurrentView)}>
                {item.label}
              </Link>
              {currentView === item.value && (
                <img src={accentIcon} alt="arrow" />
              )}
            </div>
          ))}
        </div>
        {/* Mobile: solo search, menú y usuario, con justify-between */}
        <div className="flex flex-1 lg:hidden justify-between items-center w-full">
          <button
            className="text-dark-tertiary p-2 transition-all hover:text-white hover:bg-dark-secondary rounded-lg ease-in-out"
            title="Buscar">
            <CustomIcon src={searchIcon} size={20} alt="search" />
          </button>
          <button
            className="text-dark-tertiary p-2 transition-all hover:text-white hover:bg-dark-secondary rounded-lg ease-in-out flex items-center gap-2"
            title={sidebarVisible ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setSidebarVisible(!sidebarVisible)}>
            <CustomIcon
              src={menuIcon}
              size={20}
              alt={sidebarVisible ? "close menu" : "open menu"}
            />
          </button>
          <div className="flex items-center gap-2 p-2 transition-all hover:text-white hover:bg-dark-secondary rounded-lg ease-in-out">
            <CustomIcon src={userIcon} size={20} alt="user" />
            <CustomIcon src={arrowDownIcon} size={20} alt="arrow" />
          </div>
        </div>
        {/* Desktop: íconos de búsqueda, menu, notificaciones y usuario */}
        <div className="hidden lg:flex gap-2 items-center mb-2">
          <button
            className="text-dark-tertiary p-2 transition-all hover:text-white hover:bg-dark-secondary rounded-lg ease-in-out"
            title="Buscar">
            <CustomIcon src={searchIcon} size={20} alt="search" />
          </button>
          <button
            className="text-dark-tertiary p-2 transition-all hover:text-white hover:bg-dark-secondary rounded-lg ease-in-out flex items-center gap-2"
            title={sidebarVisible ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setSidebarVisible(!sidebarVisible)}>
            <CustomIcon
              src={menuIcon}
              size={20}
              alt={sidebarVisible ? "close menu" : "open menu"}
            />
          </button>
          <button
            className="text-dark-tertiary p-2 transition-all hover:text-white hover:bg-dark-secondary rounded-lg ease-in-out"
            title="Notificaciones">
            <CustomIcon src={notificationIcon} size={20} alt="notification" />
          </button>
          <div className="flex items-center gap-2 p-2 transition-all hover:text-white hover:bg-dark-secondary rounded-lg ease-in-out">
            <CustomIcon src={userIcon} size={20} alt="user" />
            <CustomIcon src={arrowDownIcon} size={20} alt="arrow" />
          </div>
        </div>
      </nav>
    </header>
  );
};
