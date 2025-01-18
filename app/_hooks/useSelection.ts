import { useState } from 'react';

const useSelection = <T extends string | number>() => {
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());

  const toggleSelection = (itemId: T) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
      } else {
        newSelected.add(itemId);
      }
      return newSelected;
    });
  };

  const selectAll = (items: T[]) => {
    setSelectedItems(new Set(items));
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  return { selectedItems, toggleSelection, selectAll, clearSelection };
};

export default useSelection;