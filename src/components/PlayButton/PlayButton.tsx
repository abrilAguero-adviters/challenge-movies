interface PlayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PlayButton = ({
  icon,
  onClick,
  className = "",
  ...props
}: PlayButtonProps) => (
  <button
    className={`bg-gray-400 border-none cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center text-white p-2 w-8 h-8 hover:bg-gray-500 ${className}`}
    onClick={onClick}
    {...props}>
    {icon}
  </button>
);
