import { ChangeEvent, useState, useEffect } from "react";

function generateRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const useCheckboxes = <T,>(
p0: Record<string, any>[], getCheckedRows: ((arg: Record<string, any>[]) => void) | undefined, defaultCheckedRows: Record<string, any>[] | undefined, rows: T[], getCheckedItems?: (rows: T[]) => void,
) => {
  const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>(
    [],
  );
  const [checkedItems, setCheckedItems] = useState<T[]>([]);

  useEffect(() => {
    if (getCheckedItems) {
      getCheckedItems(checkedItems);
    }
  }, [checkedItems, getCheckedItems]);

  const handleCheckboxChangeAll = (event: ChangeEvent<HTMLInputElement>) => {
    let itemsIndexes: number[] = [];
    if (event.target.checked) {
      itemsIndexes = generateRange(0, rows.length - 1);
      setSelectedItemsIndexes(itemsIndexes);
    } else {
      setSelectedItemsIndexes([]);
    }
    const selectedItems = itemsIndexes.map((index) => rows[index]);
    setCheckedItems(selectedItems);
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
  ) => {
    setSelectedItemsIndexes((prevSelectedItems) => {
      let itemsIndexes: number[] = [];
      if (event.target.checked) {
        itemsIndexes = [...prevSelectedItems, rowIndex];
      } else {
        itemsIndexes = prevSelectedItems.filter((index) => index !== rowIndex);
      }
      return itemsIndexes;
    });
  };

  const checkAllBoxProps = {
    onChange: handleCheckboxChangeAll,
    checked: selectedItemsIndexes.length === rows?.length,
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
    setTimeout(() => {
      setCheckedItems([]);
      setSelectedItemsIndexes([]);
    }, 0); // Immediate delay to prevent an immediate re-trigger
  };

  return { checkAllBoxProps, checkBoxProps, checkedItems, removeChecks };
};

export default useCheckboxes;
