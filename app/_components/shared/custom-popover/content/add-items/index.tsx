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
import { InputFieldType } from '@/app/_components/employee/modal/types';
import Button from '../../../button-group/button';

export type AddItemsProps = {
  addText: string;
  addedItems?: AddedItem[];
  allItems?: string[];
  type?: 'no-select' | 'select' | 'multi-select';
  inputFieldType?: InputFieldType;
  inputFieldPlacehdoler?: string;
  showFieldLabels?: boolean;
  hasSecondaryField?: boolean;
  secondaryFieldPlaceholder?: string;
  hideActionOnFirstItem?: boolean;
  secondaryFieldStartAdornment?: React.ReactElement;
};

export type AddedItem = {
  name: string;
  value: string;
};

const AddItems: React.FC<AddItemsProps> = ({
  addText,
  addedItems,
  allItems,
  type = 'select',
  inputFieldType = 'text',
  showFieldLabels = true,
  hasSecondaryField,
  inputFieldPlacehdoler,
  secondaryFieldPlaceholder,
  hideActionOnFirstItem = false,
  secondaryFieldStartAdornment,
}) => {
  const getAvailableItems = (items: string[]) => {
    return allItems?.filter((item) => !items.includes(item));
  };

  const [localAddedItems, setLocalAddedItems] = useState<AddedItem[]>(
    addedItems ?? []
  );

  const [availableItems, setAvailableItems] = useState<string[]>(() => {
    const itemNames = addedItems?.map((item) => item.name);
    return getAvailableItems(itemNames ?? []) ?? [];
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
    //Add deleted item to available items
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
        ]) ?? []
      );
      removeChecks();
    }
  };

  const handleNoSelectAddItem = () => {
    setLocalAddedItems([...localAddedItems, { name: '', value: '' }]);
  };

  const deleteButton = (item: AddedItem) => {
    return (
      <Button
        {...{
          type: ButtonType.deleteWithIcon,
          text: '',
          onClick: () => handleDeleteClick(item),
        }}
      />
    );
  };

  const showDeleteButton = (
    hideActionOnFirstItem: boolean,
    index: number,
    item: AddedItem
  ) => {
    return hideActionOnFirstItem ? (
      index == 0 ? (
        <></>
      ) : (
        deleteButton(item)
      )
    ) : (
      deleteButton(item)
    );
  };

  return (
    <div className='flex flex-col gap-6 w-full'>
      {localAddedItems.map((item, index) => (
        <div key={index} className='flex items-center gap-3'>
          <InputField
            type={inputFieldType}
            name={showFieldLabels ? item.name : undefined}
            defaultValue={hasSecondaryField ? item.name : item.value}
            placeholder={inputFieldPlacehdoler}
          />
          {hasSecondaryField && (
            <InputField
              type={inputFieldType}
              defaultValue={item.value}
              placeholder={secondaryFieldPlaceholder}
              startAdornment={
                <div style={{ marginRight: 5 }}>
                  {secondaryFieldStartAdornment}
                </div>
              }
            />
          )}
          <div
            className={`${
              hasSecondaryField ? 'mt-2' : 'mt-6'
            } w-[5px] h-[20px]`}
          >
            {showDeleteButton(hideActionOnFirstItem, index, item)}
          </div>
        </div>
      ))}
      {type == 'no-select' && (
        <AddItemsLabel text={addText} onClick={handleNoSelectAddItem} />
      )}
      {type !== 'no-select' && (
        <Popover
          type={PopoverType.addItems}
          triggerButton={
            <AddItemsLabel
              text={addText}
              onClick={
                () => setSearchQuery('') /**Reset query on open popover*/
              }
            />
          }
          addItemsSelectContent={
            <>
              <div className='flex flex-col gap-2 w-[200px] py-2'>
                {!(availableItems.length < 1) && (
                  <div className='mx-2 mt-1'>
                    <SearchField
                      value={searchQuery}
                      setValue={setSearchQuery}
                    />
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
      )}
    </div>
  );
};

const AddItemsLabel: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button>
      <div onClick={onClick}>
        <IconWithData
          icon={icon.circlePlus}
          data={text}
          color={color.info.dark}
        />
      </div>
    </button>
  );
};

export default AddItems;
