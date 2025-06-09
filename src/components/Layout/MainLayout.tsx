import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export type CurrentView = "Movies" | "TV Shows" | "Animations" | "Plans";

export const MainLayout: React.FC = () => {
  // Estado para la vista actual (Movies, TV Shows, Animations, Plans)
  const [currentView, setCurrentView] = useState<CurrentView>("Movies");
  const [sidebarVisible, setSidebarVisible] = useState(
    window.innerWidth >= 1024
  );

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <main className="w-full">
        <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-6 min-h-[500px] relative">
          {/* Sidebar con botón toggle - oculto en móvil por defecto */}
          <div
            className={`fixed lg:relative z-20 h-full bg-dark-primary lg:bg-transparent transition-all duration-300 ${
              sidebarVisible ? "w-full lg:w-80" : "w-0 lg:w-6"
            }`}>
            <Sidebar
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          </div>

          <div className="flex-1 min-w-0 mt-16 lg:mt-0">
            {/* Outlet recibe currentView y genreFilters como contexto o props si es necesario */}
            <Outlet context={{ currentView }} />
          </div>
        </div>
      </main>
    </div>
  );
};
