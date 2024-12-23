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
  secondaryFieldType?: InputFieldType;
  inputFieldPlacehdoler?: string;
  showFieldLabels?: boolean;
  hasSecondaryField?: boolean;
  secondaryFieldPlaceholder?: string;
  startIndexToShowDelete?: number;
  secondaryFieldStartAdornment?: React.ReactElement;
  secondaryFieldName?: string;
  inputFieldName?: string;
  hasSelectOptions?: boolean;
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
  startIndexToShowDelete = 0,
  secondaryFieldStartAdornment,
  secondaryFieldName,
  inputFieldName,
  secondaryFieldType,
  hasSelectOptions,
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

  const [showAddField, setShowAddField] = useState(false);

  const [addFieldValue, setAddFieldValue] = useState<
    string | number | undefined
  >('');

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
    setLocalAddedItems([
      ...localAddedItems,
      { name: inputFieldName ?? '', value: '' },
    ]);
  };

  const handleAddDoc = () => {
    setShowAddField(false);
    if (typeof addFieldValue == 'string')
      setLocalAddedItems([
        ...localAddedItems,
        { name: addFieldValue, value: '' },
      ]);
    setAddFieldValue('');
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
    startIndexToShowDelete: number,
    index: number,
    item: AddedItem
  ) => {
    return startIndexToShowDelete ? (
      index < startIndexToShowDelete ? (
        <></>
      ) : (
        deleteButton(item)
      )
    ) : (
      deleteButton(item)
    );
  };

  return (
    <div className={`flex flex-col gap-6 w-full`}>
      {localAddedItems.map((item, index) => (
        <div key={index} className='flex items-center gap-3 flex-wrap'>
          <div>
            <InputField
              type={inputFieldType}
              name={inputFieldName ?? showFieldLabels ? item.name : undefined}
              defaultValue={
                hasSecondaryField && inputFieldType !== 'select'
                  ? item.name
                  : item.value
              }
              {...(inputFieldPlacehdoler && {
                placeholder: inputFieldPlacehdoler,
              })}
              {...(hasSelectOptions && {
                options: allItems?.map((item, index) => ({
                  label: item,
                  value: index,
                })),
              })}
            />
          </div>
          {hasSecondaryField && (
            <div>
              <InputField
                {...(secondaryFieldName && { name: secondaryFieldName })}
                type={secondaryFieldType ?? inputFieldType}
                defaultValue={item.value}
                placeholder={secondaryFieldPlaceholder}
                startAdornment={
                  <div style={{ marginRight: 5 }}>
                    {secondaryFieldStartAdornment}
                  </div>
                }
              />
            </div>
          )}
          <div
            className={`mt-6 ${hasSecondaryField && 'mt-2'} w-[5px] h-[20px] ${
              inputFieldType === 'drag-upload' ? 'mt-[5]' : ''
            }`}
          >
            {showDeleteButton(startIndexToShowDelete, index, item)}
          </div>
        </div>
      ))}
      {type == 'no-select' && (
        <AddItemsLabel
          text={addText}
          onClick={
            inputFieldType == 'drag-upload'
              ? () => setShowAddField(true)
              : handleNoSelectAddItem
          }
        />
      )}
      {showAddField && (
        <div className='flex gap-4 items-center'>
          <InputField
            type='text'
            placeholder='Name of Document'
            setValue={setAddFieldValue}
          />
          <div className='mt-2'>
            <Button
              type={ButtonType.outlined}
              text='Add'
              onClick={handleAddDoc}
            />
          </div>
        </div>
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
