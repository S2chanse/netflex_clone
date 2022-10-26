import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  //들어온 값에 대한, useState 선언
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    //debounceValue에 값을 binding 하기 전에 delay를 준다.
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    //delay 이전에 값이 변하게 된다면, 현재 handler를 클리어하고, 다시 셋팅을 한다.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
