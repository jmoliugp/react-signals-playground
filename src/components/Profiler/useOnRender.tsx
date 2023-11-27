import React, { useRef } from "react";

const BLOCK_SEPARATOR = "|--------------------------------------|";

export const useOnRender = () => {
  const reRendersCount = useRef(0);

  const printMetrics: React.ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    reRendersCount.current = reRendersCount.current + 1;

    console.log(" id: ", id);
    console.log(" phase: ", phase);
    console.log(" actualDuration: ", actualDuration);
    console.log(" baseDuration: ", baseDuration);
    console.log(" startTime: ", startTime);
    console.log(" commitTime: ", commitTime);
    console.log(" interactions: ", interactions);
    console.log(" reRendersCount: ", reRendersCount.current);
    console.log(BLOCK_SEPARATOR);
  };

  return { printMetrics };
};
