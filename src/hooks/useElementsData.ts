import { useEffect, useState } from "react";
import { IElementItem } from "../components/element-widget/useElementSelection";

const useElementsData = (count: number = 300) => {
  const [elements, setElements] = useState<IElementItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Emulate API call
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = Array.from({ length: count }, (_, i) => ({
          id: i + 1,
          name: `Element ${i + 1}`,
        }));
        setElements(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [count]);

  return { elements, isLoading, error };
};

export default useElementsData;
