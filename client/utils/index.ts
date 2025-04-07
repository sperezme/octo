import { useRef } from "react";

export function useRenderCount(componentName: string) {
  const renders = useRef(1);
  console.log(`${componentName} renders count:
  ${renders.current++}`);
}