const CustomLoader = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div key={index} className="h-8 bg-gray-700 rounded-full animate-pulse" />
  ));
};

export default CustomLoader;
