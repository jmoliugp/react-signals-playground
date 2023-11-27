import { useLayoutEffect, useRef } from "react";

const BLOCK_SEPARATOR = "|--------------------------------------|";

export const useUpdateProfiler = (id: string, props: any[]) => {
  const reRendersCount = useRef(0);
  reRendersCount.current = reRendersCount.current + 1;

  useLayoutEffect(() => {
    const startTime = new Date();
    return () => {
      const endTime = new Date();
      const renderDuration = endTime.getTime() - startTime.getTime();

      console.log(" id: ", id);
      console.log(" renderDuration: ", renderDuration);
      console.log(" reRendersCount: ", reRendersCount.current);
      console.log(BLOCK_SEPARATOR);
    };
  }, []);
};
