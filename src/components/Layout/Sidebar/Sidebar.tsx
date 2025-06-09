import arrowLeftIcon from "@/common/assets/icons/arrowLeft.png";
import arrowRightIcon from "@/common/assets/icons/arrowRight.png";
import { NAV_LINKS } from "@/common/constants/navlinks.constants";
import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { PlayButton } from "@/components/PlayButton/PlayButton";
import React from "react";
import type { CurrentView } from "../MainLayout";
import Favorites from "./components/Favorites/Favorites";
import Trailers from "./components/Trailers/Trailers";

interface SidebarProps {
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarVisible,
  setSidebarVisible,
  currentView,
  setCurrentView,
}) => {
  return (
    <div className="relative">
      {/* Overlay para móvil cuando el sidebar está abierto */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* Botón de cierre o apertura - solo visible en desktop */}
      <PlayButton
        icon={
          sidebarVisible ? (
            <CustomIcon src={arrowRightIcon} size={40} alt="close sidebar" />
          ) : (
            <CustomIcon src={arrowLeftIcon} size={40} alt="open sidebar" />
          )
        }
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className={`hidden lg:block absolute top-20 ${
          sidebarVisible ? "left-[305px]" : "left-[20px]"
        }`}
        title={sidebarVisible ? "Cerrar sidebar" : "Abrir sidebar"}
      />
      <aside
        className={`flex flex-col px-4 py-6 gap-6 transition-all duration-300 h-full shadow-lg lg:border-r lg:border-white/10
          ${sidebarVisible ? "w-80" : "w-4"}
          fixed lg:relative top-16 lg:top-0 left-0 bg-dark-primary lg:bg-transparent overflow-y-auto z-20`}>
        {/* Botón X para cerrar en mobile */}
        {sidebarVisible && (
          <button
            className="absolute top-4 right-4 lg:hidden text-white text-2xl z-30"
            onClick={() => setSidebarVisible(false)}
            aria-label="Cerrar sidebar">
            ×
          </button>
        )}
        {/* Opciones de navegación solo en mobile */}
        {sidebarVisible && (
          <div className="flex flex-col gap-2 mb-4 lg:hidden">
            {NAV_LINKS.map((item) => (
              <button
                key={item.value}
                className={`text-left px-2 py-2 rounded text-white font-medium transition-colors ${
                  currentView === item.value
                    ? "bg-dark-secondary"
                    : "hover:bg-dark-secondary"
                }`}
                onClick={() => {
                  setCurrentView(item.value as any);
                  setSidebarVisible(false);
                }}>
                {item.label}
              </button>
            ))}
            <hr className="border-dark-tertiary my-2" />
          </div>
        )}
        {/* Contenido del sidebar */}
        {sidebarVisible ? (
          <>
            {/* New Trailers Section */}
            <Trailers />

            {/* Favourite Genres Section */}
            <Favorites />
          </>
        ) : (
          <div className="flex flex-col items-center mt-8 gap-6 min-h-full max-lg:hidden"></div>
        )}
      </aside>
    </div>
  );
};
