import React, { Profiler as ReactProfiler } from "react";
import { useOnRender } from "./useOnRender";

interface Props {
  id: string;
  onRender?: React.ProfilerOnRenderCallback;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Profiler: React.FC<Props> = ({
  children,
  disabled,
  onRender,
  id,
}) => {
  const { printMetrics } = useOnRender();

  if (disabled) {
    return <>{children}</>;
  }

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
