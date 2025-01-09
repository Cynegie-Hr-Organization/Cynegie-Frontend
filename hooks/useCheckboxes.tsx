import { ChangeEvent, useState } from "react";

const useCheckboxes = <T,>(
  rows: T[],
  getCheckedItems?: (rows: T[]) => void,
  defaultCheckedItems?: T[]
) => {
  const [checkedItems, setCheckedItems] = useState<T[]>([]);

  const handleCheckboxChangeAll = (event: ChangeEvent<HTMLInputElement>) => {
    let items = rows;
    if (event.target.checked) {
      items = rows;
    } else {
      items = [];
    }
    setCheckedItems(items);
    getCheckedItems?.(items);
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
  };

  const checkAllBoxProps = {
    onChange: handleCheckboxChangeAll,
    checked: checkedItems.length === rows.length,
    indeterminate: checkedItems.length > 0 && checkedItems.length < rows.length,
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
  };

  return {
    checkAllBoxProps,
    checkBoxProps,
    checkedItems,
    removeChecks,
  };
};

export default useCheckboxes;
