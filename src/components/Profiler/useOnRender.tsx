import React, { useRef } from "react";

const BLOCK_SEPARATOR = "|--------------------------------------|";

export const useOnRender = () => {
  const reRendersCount = useRef(0);

  const printMetrics: React.ProfilerOnRenderCallback = (
    id,
    phase,
    baseDuration
  ) => {
    reRendersCount.current = reRendersCount.current + 1;

    console.log(" id: ", id);
    console.log(" phase: ", phase);
    console.log(" duration: ", baseDuration);
    console.log(" reRendersCount: ", reRendersCount.current);
    console.log(BLOCK_SEPARATOR);
  };

  return { printMetrics };
};
