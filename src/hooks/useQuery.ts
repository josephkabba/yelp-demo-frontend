import { useState, useEffect } from "react";
import { AxiosResponse, AxiosError } from "axios";

type QueryFunction<T> = () => Promise<AxiosResponse<T>>;
type QueryResult<T> = {
  data: T | null;
  error: AxiosError | null;
  isLoading: boolean;
};

function useQuery<T>(queryFunction: QueryFunction<T>): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await queryFunction();
      setData(response.data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryFunction]);

  return { data, error, isLoading };
}

export default useQuery;
