import { useCallback, useState } from "react";

export const useMenuContainer = () => {
  const [total, setTotal] = useState();
  const handleClick = useCallback(() => {
    setTotal((total) => total + 1);
  }, []);
  return {
    handleClick,
    total
  };
};
