import { ChangeEvent, useEffect, useState } from "react";

{
  /*function generateRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);*/
}
// }

const useCheckboxes = <T,>(
  rows: T[],
  getCheckedItems?: (rows: T[]) => void,
  defaultCheckedItems?: T[]
) => {
  {
    /*const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>([]);*/
  }
  const [checkedItems, setCheckedItems] = useState<T[]>([]);

  useEffect(() => {
    if (getCheckedItems) {
      getCheckedItems(checkedItems);
    }
  }, [checkedItems, getCheckedItems]);

  const handleCheckboxChangeAll = (event: ChangeEvent<HTMLInputElement>) => {
    let items = rows;
    if (event.target.checked) {
      items = rows;
    } else {
      items = [];
    }
    setCheckedItems(items);
    getCheckedItems?.(items);
    {
      /*  setSelectedItemsIndexes([]);
    }
    const selectedItems = itemsIndexes.map((index) => rows[index]);
    setCheckedItems(selectedItems);*/
    }
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    row: T
  ) => {
    let items: T[] = [];
    if (event.target.checked) {
      if (defaultCheckedItems) {
        items = [...defaultCheckedItems, row];
      } else {
        items = [...checkedItems, row];
      }
    } else {
      if (defaultCheckedItems) {
        items = defaultCheckedItems.filter((item) => item !== row);
      } else {
        items = checkedItems.filter((item) => item !== row);
      }
    }
    setCheckedItems(items);
    getCheckedItems?.(items);
    {
      /*setSelectedItemsIndexes((prevSelectedItems) => {
      let itemsIndexes: number[] = [];
      if (event.target.checked) {
        itemsIndexes = [...prevSelectedItems, rowIndex];
      } else {
        itemsIndexes = prevSelectedItems.filter((index) => index !== rowIndex);
      }
      return itemsIndexes;
    });*/
    }
  };

  const checkAllBoxProps = {
    onChange: handleCheckboxChangeAll,
    checked: checkedItems.length === rows.length,
    indeterminate: checkedItems.length > 0 && checkedItems.length < rows.length,
    /*checked: selectedItemsIndexes.length === rows?.length,
    indeterminate:
      selectedItemsIndexes.length > 0 &&
      selectedItemsIndexes.length < rows.length,*/
  };

  const checkBoxProps = (row: T) => {
    return {
      checked: defaultCheckedItems
        ? defaultCheckedItems.includes(row)
        : checkedItems.includes(row),
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleCheckboxChange(e, row),
    };
  };

  const removeChecks = () => {
    setCheckedItems([]);
    {
      /*setTimeout(() => {
      setCheckedItems([]);
      setSelectedItemsIndexes([]);
    }, 0);  // Immediate delay to prevent an immediate re-trigger*/
    }
  };

  return {
    checkAllBoxProps,
    checkBoxProps,
    checkedItems,
    removeChecks,
  };
};

export default useCheckboxes;
