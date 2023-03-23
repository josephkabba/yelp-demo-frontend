import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

type MutationFunction<T> = (variables: T) => Promise<AxiosResponse<any>>;
type MutationResult<T> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: AxiosError | null;
  mutate: (variables: T) => void;
};

function useMutation<T>(mutationFunction: MutationFunction<T>): MutationResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const mutate = async (variables: T) => {
    setIsLoading(true);
    try {
      await mutationFunction(variables);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSuccess, isError, error, mutate };
}

export default useMutation;
