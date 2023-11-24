import React, { Profiler as ReactProfiler } from "react";
import { useOnRender } from "./useOnRender";

interface Props {
  id: string;
  onRender?: React.ProfilerOnRenderCallback;
  children: React.ReactNode;
}

export const Profiler: React.FC<Props> = ({ children, onRender, id }) => {
  const { printMetrics } = useOnRender();

  const onRenderWithPrints: React.ProfilerOnRenderCallback = (...args) => {
    printMetrics(...args);
    if (onRender) onRender(...args);
  };

  return (
    <ReactProfiler id={id} onRender={onRenderWithPrints}>
      {children}
    </ReactProfiler>
  );
};
