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
import {
  Control,
  FieldErrors,
  FieldName,
  FieldValues,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
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
  hookFormRegister?: UseFormRegister<FieldValues>;
  hookFormControl?: Control<FieldValues, any>;
  hookFormErrors?: FieldErrors<FieldValues>;
  hookFormName?: string;
  inputFieldIsHookForm?: boolean;
  hookFormGetValues?: UseFormGetValues<FieldValues>;
  hookFormResetField?: UseFormResetField<FieldValues>;
  hookFormWatch?: UseFormWatch<FieldValues>;
  hookFormUnregister?: UseFormUnregister<FieldValues>;
  secondaryHookFormName?: string;
  inputFieldRequired?: boolean;
  secondaryFieldRequired?: boolean;
  secondaryFieldIsHookForm?: boolean;
  inputFieldControllerRules?: Omit<
    RegisterOptions<FieldValues, FieldName<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  secondaryFieldControllerRules?: Omit<
    RegisterOptions<FieldValues, FieldName<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  getLocalAddedItems?: (items: AddedItem[]) => void;
  useNameAsDefaultValue?: boolean;
  forceInputFieldNameAsLabel?: boolean;
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
  hookFormRegister,
  hookFormErrors,
  hookFormControl,
  hookFormName,
  hookFormGetValues,
  hookFormResetField,
  hookFormWatch,
  hookFormUnregister,
  inputFieldRequired,
  secondaryFieldRequired,
  inputFieldControllerRules,
  secondaryFieldControllerRules,
  inputFieldIsHookForm,
  secondaryFieldIsHookForm,
  secondaryHookFormName,
  getLocalAddedItems,
  useNameAsDefaultValue,
  forceInputFieldNameAsLabel,
}) => {
  const getAvailableItems = (items: string[]) => {
    return allItems?.filter((item) => !items.includes(item));
  };

  const [localAddedItems, setLocalAddedItems] = useState<AddedItem[]>(
    addedItems ?? [],
  );

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const [availableItems, setAvailableItems] = useState<string[]>(() => {
    const itemNames = addedItems?.map((item) => item.name);
    return getAvailableItems(itemNames ?? []) ?? [];
  });

  const [searchQuery, setSearchQuery] = useState<string | number | undefined>(
    "",
  );

  const [showAddField, setShowAddField] = useState(false);

  const [addFieldValue, setAddFieldValue] = useState<
    string | number | undefined
  >("");

  const displayedAvailableItems = availableItems
    .filter(
      (item) => typeof searchQuery === "string" && item.includes(searchQuery),
    )
    .map((item) => ({ name: item }));

  const { checkedItems, checkBoxProps, removeChecks } = useCheckboxes<string>( // Record<string, any> |
    // availableItems.map((item) => ({ name: item })), // p0
    availableItems.map((item) => item),
    undefined // getCheckedRows
    // undefined, // defaultCheckedRows
    // availableItems.map((item) => ({ name: item })) // rows
  );
  const handleDeleteClick = (item: AddedItem) => {
    const index = localAddedItems.indexOf(item);
    hookFormResetField?.(`${hookFormName}${index}`);
    hookFormResetField?.(`${secondaryHookFormName}${index}`);
    hookFormUnregister?.(`${hookFormName}${index}`);
    hookFormUnregister?.(`${secondaryHookFormName}${index}`);
    //Remove deleted item from local added items
    getLocalAddedItems?.(
      localAddedItems.filter((localItem) => localItem !== item)
    );
    setLocalAddedItems(
      localAddedItems.filter((localItem) => localItem !== item)
    );
    setLocalAddedItems(
      localAddedItems.filter((localItem) => localItem !== item),
    );
    //Add deleted item to available items
    if (!availableItems.includes(item.name))
      setAvailableItems([...availableItems, item.name]);
  };

  const handleAddItemsWithCheckboxes = () => {
    if (checkedItems.length > 0) {
      const checkedItemsToAdd: AddedItem[] = checkedItems.map((item) => ({
        // name: typeof item === "string" ? item : item.name,
        name: item,
        value: "",
      }));
      getLocalAddedItems?.([...localAddedItems, ...checkedItemsToAdd]);
      setLocalAddedItems([...localAddedItems, ...checkedItemsToAdd]);
      setAvailableItems(
        getAvailableItems([
          ...checkedItems,
          ...localAddedItems.map((localItem) => localItem.name),
        ] as string[]) ?? [],
      );
      removeChecks();
    }
  };

  const handleNoSelectAddItem = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLocalAddedItems([
      ...localAddedItems,
      { name: inputFieldName ?? "", value: "" },
    ]);
    getLocalAddedItems?.([
      ...localAddedItems,
      { name: inputFieldName ?? "", value: "" },
    ]);
  };

  const handleAddDoc = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowAddField(false);
    if (typeof addFieldValue == "string") {
      getLocalAddedItems?.([
        ...localAddedItems,
        { name: addFieldValue, value: "" },
      ]);
      setLocalAddedItems([
        ...localAddedItems,
        { name: addFieldValue, value: "" },
      ]);
    }
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
    item: AddedItem,
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
              label={
                hookFormName ?? inputFieldName ?? showFieldLabels
                  ? forceInputFieldNameAsLabel
                    ? inputFieldName
                    : item.name
                  : undefined
              }
              hookFormName={`${hookFormName}${index}`}
              register={hookFormRegister}
              control={hookFormControl}
              errors={hookFormErrors}
              hookFormField={inputFieldIsHookForm}
              hookFormGetValues={hookFormGetValues}
              hookFormResetField={hookFormResetField}
              hookFormWatch={hookFormWatch}
              disabled={disabled}
              required={inputFieldRequired}
              controllerRules={inputFieldControllerRules}
              defaultValue={
                hasSecondaryField && inputFieldType !== "select"
                  ? item.name
                  : disabled
                  ? `${disabledValue} ${index + 1}`
                  : useNameAsDefaultValue
                  ? item.name
                  : item.value
              }
              {...(inputFieldPlacehdoler && {
                placeholder: inputFieldPlacehdoler,
              })}
              {...(hasSelectOptions && {
                options: allItems?.map((item, index) => ({
                  label: item,
                  value: useNameAsDefaultValue ? item : index,
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
                hookFormName={`${secondaryHookFormName}${index}`}
                hookFormField={secondaryFieldIsHookForm}
                defaultValue={item.value}
                placeholder={secondaryFieldPlaceholder}
                required={secondaryFieldRequired}
                controllerRules={secondaryFieldControllerRules}
                register={hookFormRegister}
                control={hookFormControl}
                errors={hookFormErrors}
                hookFormGetValues={hookFormGetValues}
                hookFormResetField={hookFormResetField}
                hookFormWatch={hookFormWatch}
                startadornment={
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
            inputFieldType == "drag-upload" ||
            inputFieldType == "drag-upload-hook-form"
              ? (e) => {
                  e.preventDefault();
                  setShowAddField(true);
                }
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
                    {/* <Checkbox {...checkBoxProps(item)} /> */}
                    <Checkbox {...checkBoxProps(item.name)} />
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
          onCloseAction={handleAddItemsWithCheckboxes}
        />
      )}
    </div>
  );
};

export default AddItems;
