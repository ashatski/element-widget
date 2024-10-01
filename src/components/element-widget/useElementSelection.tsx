import { useCallback, useMemo, useState } from "react";
import useElementData from "../../hooks/useElementsData";
import { debounce } from "../../utils/helpers";

export interface IElementItem {
  id: number;
  name: string;
}

export const useElementsSelection = (maxSelection: number = 3) => {
  const { elements: allElements, isLoading, error } = useElementData();
  const [initialSelection, setInitialSelection] = useState<IElementItem[]>([]);
  const [selectedElements, setSelectedElements] = useState<IElementItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const filteredElements = useMemo(() => {
    if (error) return [];
    return allElements.filter((element) => {
      const matchesSearch = element.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "" || element.id > parseInt(filter.slice(1));
      return matchesSearch && matchesFilter;
    });
  }, [allElements, searchTerm, filter, error]);

  const onToggleElement = useCallback(
    (element: IElementItem) => {
      setSelectedElements((prev) => {
        const isSelected = prev.some((e) => e.id === element.id);
        if (isSelected) {
          return prev.filter((e) => e.id !== element.id);
        } else if (prev.length < maxSelection) {
          return [...prev, element];
        }
        return prev;
      });
    },
    [maxSelection]
  );

  const saveInitialSelection = useCallback(() => {
    setInitialSelection(selectedElements);
  }, [selectedElements]);

  const resetSelection = useCallback(() => {
    setSelectedElements(initialSelection);
  }, [initialSelection]);

  const debouncedSetSearchTerm = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const onChangeSearchTerm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetSearchTerm(e.target.value);
    },
    [debouncedSetSearchTerm]
  );

  const onChangeFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(e.target.value);
    },
    []
  );

  return {
    initialSelection,
    selectedElements,
    searchTerm,
    filter,
    filteredElements,
    isLoading,
    error,
    saveInitialSelection,
    onToggleElement,
    resetSelection,
    onChangeSearchTerm,
    onChangeFilter,
  };
};
