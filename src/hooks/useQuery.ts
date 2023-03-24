import { useState, useEffect } from "react";

type QueryFunction = () => Promise<any>;
type QueryResult<R> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: R | null;
  error: Error | null;
};

function useQuery<R>(queryFunction: QueryFunction): QueryResult<R> {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await queryFunction();
      setData(response.data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isError, isSuccess, isLoading };
}

export default useQuery;
