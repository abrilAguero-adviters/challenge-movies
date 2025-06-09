interface ICustomIconProps {
  src: string;
  size: number;
  alt?: string;
  imgClassName?: string;
}

const CustomIcon = ({ src, imgClassName, size, alt }: ICustomIconProps) => {
  if (!src) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    <img
      src={src}
      alt={`${alt} icon`}
      className={`w-[${size}px] h-[${size}px] ${imgClassName}`}
    />
  );
};

export default CustomIcon;
