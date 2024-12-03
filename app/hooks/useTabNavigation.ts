import { useState, useRef, useEffect, RefObject } from "react";

type UseTabNavigationProps<T> = {
  steps: T[];
  initialStep: T;
};

export const useTabNavigation = <T extends string>({ steps, initialStep }: UseTabNavigationProps<T>) => {
  const [activeStep, setActiveStep] = useState<T>(initialStep);

  const refs = useRef<RefObject<HTMLButtonElement>[]>(steps.map(() => useRef<HTMLButtonElement>(null)));
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentIndex = steps.indexOf(activeStep);
    const currentRef = refs.current[currentIndex];

    if (currentRef?.current && containerRef.current && sliderRef.current) {
      const buttonRect = currentRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      sliderRef.current.style.width = `${buttonRect.width}px`;
      sliderRef.current.style.left = `${buttonRect.left - containerRect.left}px`;
    }
  }, [activeStep, steps]);

  return {
    activeStep,
    setActiveStep,
    refs,
    containerRef,
    sliderRef,
  };
}; 