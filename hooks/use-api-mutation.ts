import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    setPending(true);
    try {
      const result = await apiMutation(payload);
      setPending(false);
      return result;
    } catch (error) {
      setPending(false);
      throw error;
    }
  }

  return { mutate, pending };
}
