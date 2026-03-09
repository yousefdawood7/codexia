import { useState } from "react";
import { ConvexError } from "convex/values";

export function useCrash() {
  const [, setCrash] = useState();

  function crashError(
    error: { message: string; cause?: string },
    isConvex: boolean = true,
  ) {
    setCrash(() => {
      // prettier-ignore
      if (isConvex)
        throw new ConvexError(error);
      throw new Error(error.message);
    });
  }

  return crashError;
}
