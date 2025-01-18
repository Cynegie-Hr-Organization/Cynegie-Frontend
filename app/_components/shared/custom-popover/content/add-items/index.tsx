import SearchField from "@/app/_components/employee/input-fields/search";
import {
  InputFieldProps,
  InputFieldType,
} from "@/app/_components/employee/modal/types";
import SvgIcon from "@/app/_components/icons/container";
import { icon } from "@/constants";
import useCheckboxes from "@/hooks/useCheckboxes";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import Popover from "../..";
import Button from "../../../button-group/button";
import InputField from "../../../form/input-field";
import { ButtonType } from "../../../page/heading/types";
import { PopoverType } from "../../types";
import AddItemsLabel from "./label";

export type AddItemsProps = {
  addText: string;
  addedItems?: AddedItem[];
  allItems?: string[];
  type?: "no-select" | "select" | "multi-select";
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
  middleField?: InputFieldProps;
  disabled?: boolean;
  disabledValue?: string;
  gridCols?: { xs?: number; sm?: number; md?: number; lg?: number };
};

export type AddedItem = {
  name: string;
  value: string | number;
};

const AddItems: React.FC<AddItemsProps> = ({
  addText,
  addedItems,
  allItems,
  type = "select",
  inputFieldType = "text",
  showFieldLabels = true,
  hasSecondaryField,
  inputFieldPlacehdoler,
  secondaryFieldPlaceholder,
  startIndexToShowDelete = 0,
  secondaryFieldStartAdornment,
  secondaryFieldName,
  inputFieldName,
  disabled,
  secondaryFieldType,
  hasSelectOptions,
  middleField,
  disabledValue,
  gridCols,
}) => {
  const getAvailableItems = (items: string[]) => {
    return allItems?.filter((item) => !items.includes(item));
  };

  const [localAddedItems, setLocalAddedItems] = useState<AddedItem[]>(
    addedItems ?? []
  );

  const handleSearchQuery = (query: string) => {
    console.log("Search Query:", query); // Replace with actual search logic
  };

  const [availableItems, setAvailableItems] = useState<string[]>(() => {
    const itemNames = addedItems?.map((item) => item.name);
    return getAvailableItems(itemNames ?? []) ?? [];
  });

  const [searchQuery, setSearchQuery] = useState<string | number | undefined>(
    ""
  );

  const [showAddField, setShowAddField] = useState(false);

  const [addFieldValue, setAddFieldValue] = useState<
    string | number | undefined
  >("");

  const displayedAvailableItems = availableItems
    .filter(
      (item) => typeof searchQuery === "string" && item.includes(searchQuery)
    )
    .map((item) => ({ name: item }));

  const { checkedItems, checkBoxProps, removeChecks } = useCheckboxes<
    Record<string, any>
  >(
    availableItems.map((item) => ({ name: item })), // p0
    undefined // getCheckedRows
    // undefined, // defaultCheckedRows
    // availableItems.map((item) => ({ name: item })) // rows
  );
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
      const checkedItemsToAdd: AddedItem[] = checkedItems.map((item) => ({
        name: item as unknown as string,
        value: "",
      }));
      setLocalAddedItems([...localAddedItems, ...checkedItemsToAdd]);
      setAvailableItems(
        getAvailableItems([
          ...checkedItems,
          ...localAddedItems.map((localItem) => localItem.name),
        ] as string[]) ?? []
      );
      removeChecks();
    }
  };

  const handleNoSelectAddItem = () => {
    setLocalAddedItems([
      ...localAddedItems,
      { name: inputFieldName ?? "", value: "" },
    ]);
  };

  const handleAddDoc = () => {
    setShowAddField(false);
    if (typeof addFieldValue == "string")
      setLocalAddedItems([
        ...localAddedItems,
        { name: addFieldValue, value: "" },
      ]);
    setAddFieldValue("");
  };

  const deleteButton = (item: AddedItem) => {
    return (
      <button onClick={() => handleDeleteClick(item)}>
        <SvgIcon path={icon.bin} width={24} height={24} />
      </button>
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
        <div
          key={index}
          className={`grid grid-cols-${gridCols?.xs} sm:grid-cols-${gridCols?.sm} md:grid-cols-${gridCols?.md} lg:grid-cols-${gridCols?.lg} gap-4 items-center`}
        >
          <div>
            <InputField
              type={inputFieldType}
              label={inputFieldName ?? showFieldLabels ? item.name : undefined}
              disabled={disabled}
              defaultValue={
                hasSecondaryField && inputFieldType !== "select"
                  ? item.name
                  : disabled
                  ? `${disabledValue} ${index + 1}`
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
          {middleField && <InputField {...middleField} />}
          {hasSecondaryField && (
            <div>
              <InputField
                {...(secondaryFieldName && { label: secondaryFieldName })}
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
            className={`${
              hasSecondaryField
                ? middleField
                  ? "mt-8"
                  : inputFieldType === "select"
                  ? "mt-8"
                  : "mt-2"
                : inputFieldType == "drag-upload"
                ? "mt-0"
                : "mt-6"
            }`}
          >
            {showDeleteButton(startIndexToShowDelete, index, item)}
          </div>
        </div>
      ))}
      {type == "no-select" && (
        <AddItemsLabel
          text={addText}
          onClick={
            inputFieldType == "drag-upload"
              ? () => setShowAddField(true)
              : handleNoSelectAddItem
          }
        />
      )}
      {showAddField && (
        <div className="flex gap-4 items-center">
          <InputField
            type="text"
            placeholder="Name of Document"
            setValue={setAddFieldValue}
          />
          <div className="mt-2">
            <Button
              type={ButtonType.outlined}
              text="Add"
              onClick={handleAddDoc}
            />
          </div>
        </div>
      )}
      {type !== "no-select" && (
        <Popover
          type={PopoverType.addItems}
          triggerButton={
            <AddItemsLabel
              text={addText}
              onClick={
                () => setSearchQuery("") /**Reset query on open popover*/
              }
            />
          }
          addItemsSelectContent={
            <>
              <div className="flex flex-col gap-2 w-[200px] py-2">
                {!(availableItems.length < 1) && (
                  <div className="mx-2 mt-1">
                    <SearchField getSearchQuery={handleSearchQuery} />
                  </div>
                )}
                {displayedAvailableItems.map((item) => (
                  <div key={item.name} className={`flex gap-1 items-center`}>
                    <Checkbox {...checkBoxProps(item)} />
                    {item.name}
                  </div>
                ))}
                {(availableItems.length < 1 ||
                  displayedAvailableItems.length < 1) && (
                  <div className="p-2 font-[600]">None</div>
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

export default AddItems;
