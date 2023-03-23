import { useState } from "react";

type MutationFunction<T> = (variables: T) => Promise<any>;
type MutationResult<T, R> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: R | null;
  error: Error | null;
  mutate: (variables: T) => void;
};

function useMutation<T, R>(
  mutationFunction: MutationFunction<T>
): MutationResult<T, R> {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: T) => {
    setIsLoading(true);
    try {
      const response = await mutationFunction(variables);
      setData(response.data);
      console.log(data);
      setIsSuccess(true);
      setIsError(false);
      setError(null);
    } catch (error) {
      setIsError(true);
      setIsSuccess(false);
      setData(null);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, isSuccess, isError, error, mutate };
}

export default useMutation;
