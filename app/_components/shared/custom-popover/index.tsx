import React, { useState } from "react";
import { Popover as MuiPopover } from "@mui/material";
import { PopoverProps, PopoverType } from "./types";
import MoreOptionsPopoverContent from "./content/more-options";
import FilterPopoverContent from "./content/filter";

const Popover: React.FC<PopoverProps> = (props) => {
  const {
    type,
    getTriggerButtonClick,
    triggerButton,
    moreOptions,
    filters,
    addItemsSelectContent,
    onCloseAction,
    onResetClick,
    onFilterClick,
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    getTriggerButtonClick?.();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    onCloseAction?.();
    setAnchorEl(null);
  };

  const handleResetClick = () => {
    onResetClick?.();
    setAnchorEl(null);
  };

  const handleFilterClick = () => {
    onFilterClick?.();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {React.cloneElement(triggerButton as React.ReactElement, {
        onClick: handleButtonClick,
      })}
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {type === PopoverType.moreOptions ? (
          <MoreOptionsPopoverContent
            options={moreOptions}
            itemClick={handleClose}
            dataToReturnOnItemClick={props.dataToReturnOnItemClick}
          />
        ) : type === PopoverType.addItems ? (
          <>{addItemsSelectContent}</>
        ) : (
          <FilterPopoverContent
            filters={filters}
            formFilters={props.formFilter}
            onResetClick={handleResetClick}
            onFilterClick={handleFilterClick}
          />
        )}
      </MuiPopover>
    </>
  );
};

export default Popover;
