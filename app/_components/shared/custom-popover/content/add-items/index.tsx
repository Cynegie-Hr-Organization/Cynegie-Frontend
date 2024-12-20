import useCheckboxes from '@/hooks/useCheckboxes';
import React, { useState } from 'react';
import InputField from '../../../form/input-field';
import { ButtonType } from '../../../page/heading/types';
import { Checkbox } from '@mui/material';
import IconWithData from '../../../icon-with-data';
import { color, icon } from '@/constants';
import Popover from '../..';
import { PopoverType } from '../../types';
import SearchField from '@/app/_components/employee/input-fields/search';

export type AddItemsProps = {
  addText: string;
  addedItems: AddedItem[];
  allItems: string[];
};

export type AddedItem = {
  name: string;
  value: string;
};

const AddItems: React.FC<AddItemsProps> = ({
  addText,
  addedItems,
  allItems,
}) => {
  const getAvailableItems = (items: string[]) => {
    return allItems.filter((item) => !items.includes(item));
  };

  const [localAddedItems, setLocalAddedItems] =
    useState<AddedItem[]>(addedItems);

  const [availableItems, setAvailableItems] = useState<string[]>(() => {
    const itemNames = addedItems.map((item) => item.name);
    return getAvailableItems(itemNames);
  });

  const [searchQuery, setSearchQuery] = useState<string | number | undefined>(
    ''
  );

  const displayedAvailableItems = availableItems.filter(
    (item) => typeof searchQuery === 'string' && item.includes(searchQuery)
  );

  const { checkedItems, checkBoxProps, removeChecks } =
    useCheckboxes(availableItems);

  const handleDeleteClick = (item: AddedItem) => {
    //Remove deleted item from local added items
    setLocalAddedItems(
      localAddedItems.filter((localItem) => localItem !== item)
    );
    //Add deleted permission to available permissions
    if (!availableItems.includes(item.name))
      setAvailableItems([...availableItems, item.name]);
  };

  const handleAddItems = () => {
    if (checkedItems.length > 0) {
      const checkedItemsToAdd = checkedItems.map((item) => ({
        name: item,
        value: '',
      }));
      setLocalAddedItems([...localAddedItems, ...checkedItemsToAdd]);
      setAvailableItems(
        getAvailableItems([
          ...checkedItems,
          ...localAddedItems.map((localItem) => localItem.name),
        ])
      );
      removeChecks();
    }
  };

  return (
    <div className='flex flex-col gap-6 w-full'>
      {localAddedItems.map((permission, index) => (
        <InputField
          type='text'
          key={index}
          name={permission.name}
          defaultValue={permission.value}
          sideButton={{
            type: ButtonType.deleteWithIcon,
            text: '',
            onClick: () => handleDeleteClick(permission),
          }}
        />
      ))}
      <Popover
        type={PopoverType.addItems}
        triggerButton={
          <button>
            <div
              onClick={
                () => setSearchQuery('') /**Reset query on open popover*/
              }
            >
              <IconWithData
                icon={icon.circlePlus}
                data={addText}
                color={color.info.dark}
              />
            </div>
          </button>
        }
        addItemsSelectContent={
          <>
            <div className='flex flex-col gap-2 w-[200px] py-2'>
              {!(availableItems.length < 1) && (
                <div className='mx-2 mt-1'>
                  <SearchField value={searchQuery} setValue={setSearchQuery} />
                </div>
              )}
              {displayedAvailableItems.map((item, index) => (
                <div key={item} className={`flex gap-1 items-center`}>
                  <Checkbox {...checkBoxProps(index)} />
                  {item}
                </div>
              ))}
              {(availableItems.length < 1 ||
                displayedAvailableItems.length < 1) && (
                <div className='p-2 font-[600]'>None</div>
              )}
            </div>
          </>
        }
        onCloseAction={handleAddItems}
      />
    </div>
  );
};

export default AddItems;
