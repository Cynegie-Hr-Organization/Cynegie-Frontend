import { ChangeEvent, useState } from 'react';

function generateRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const useCheckboxes = <T,>(
  rows: T[],
  getCheckedItems?: (rows: T[]) => void
) => {
  const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>(
    []
  );
  const [checkedItems, setCheckedItems] = useState<T[]>([]);

  const handleCheckboxChangeAll = (event: ChangeEvent<HTMLInputElement>) => {
    let itemsIndexes: number[] = [];
    if (event.target.checked) {
      itemsIndexes = generateRange(0, rows.length - 1);
      setSelectedItemsIndexes(itemsIndexes);
    } else {
      setSelectedItemsIndexes(itemsIndexes);
    }
    const selectedItems = itemsIndexes.map((index) => rows[index]);
    setCheckedItems(selectedItems);
    getCheckedItems?.(selectedItems);
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    let itemsIndexes: number[] = [];
    setSelectedItemsIndexes((prevSelectedItems) => {
      if (event.target.checked) {
        itemsIndexes = [...prevSelectedItems, rowIndex];
        return itemsIndexes;
      } else {
        itemsIndexes = prevSelectedItems.filter((index) => index !== rowIndex);
        return itemsIndexes;
      }
    });
    const selectedItems = itemsIndexes.map((index) => rows[index]);
    setCheckedItems(selectedItems);
    getCheckedItems?.(selectedItems);
  };

  const checkAllBoxProps = {
    onChange: handleCheckboxChangeAll,
    checked: selectedItemsIndexes.length === rows.length,
    indeterminate:
      selectedItemsIndexes.length > 0 &&
      selectedItemsIndexes.length < rows.length,
  };

  const checkBoxProps = (index: number) => {
    return {
      checked: selectedItemsIndexes.includes(index),
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleCheckboxChange(e, index),
    };
  };

  const removeChecks = () => {
    setCheckedItems([]);
    setSelectedItemsIndexes([]);
  };

  return { checkAllBoxProps, checkBoxProps, checkedItems, removeChecks };
};

export default useCheckboxes;
