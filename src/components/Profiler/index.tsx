import React, { Profiler as ReactProfiler } from "react";
import { useOnRender } from "./useOnRender";

interface Props {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Profiler: React.FC<Props> = ({
  children,
  disabled,

  id,
}) => {
  const { printMetrics } = useOnRender();

  if (disabled) {
    return <>{children}</>;
  }

  const onRender: React.ProfilerOnRenderCallback = (...args) =>
    printMetrics(...args);

  return (
    <ReactProfiler id={id} onRender={onRender}>
      {children}
    </ReactProfiler>
  );
};
