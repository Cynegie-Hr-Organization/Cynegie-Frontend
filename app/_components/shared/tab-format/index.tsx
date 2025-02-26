import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import React, { useState } from "react";
import ButtonGroup from "../button-group";
import Button from "../button-group/button";
import { ButtonType } from "../page/heading/types";
import { TabFormatProps } from "./types";

const TabFormat: React.FC<TabFormatProps> = ({
  tabs,
  type,
  actionButton,
  customTabValue,
  customHandleChange,
  hasButtons,
  getTab,
}) => {
  const [value, setValue] = useState(0);
  const handleChange = (event?: React.SyntheticEvent, newValue?: number) => {
    event?.preventDefault();
    setValue(newValue ?? 0);
    getTab?.(newValue ?? 0);
  };

  const popoverTabs = tabs?.map((tab, index) => ({
    name: tab.name,
    onClick: (e: React.SyntheticEvent) => handleChange(e, index),
  }));

  const popoverAction = {
    name: actionButton?.text ?? "",
    onClick: actionButton?.onClick ?? (() => {}),
  };

  return (
    <div className="w-full">
      <TabContext value={customTabValue ?? value}>
        {type !== "button" && (
          <TabList onChange={customHandleChange ?? handleChange}>
            {tabs?.map((tab, index) => (
              <Tab
                className="!normal-case"
                sx={{ borderBottom: 1, borderColor: "divider" }}
                key={index}
                label={tab.name}
                value={index}
              />
            ))}
          </TabList>
        )}
        {type === "button" && (
          <>
            <div className="hidden md:flex md:items-center">
              <div className="flex flex-grow gap-6">
                {tabs?.map((tab, index) => (
                  <Button
                    key={index}
                    type={
                      value === index
                        ? ButtonType.outlinedBlue
                        : ButtonType.outlined
                    }
                    text={tab.name}
                    onClick={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
              {actionButton && <Button {...actionButton} />}
            </div>
            <div className="block md:hidden">
              <Button
                type={ButtonType.actions}
                text={tabs?.[value].name}
                popoverOptions={
                  actionButton
                    ? popoverTabs?.concat(popoverAction)
                    : popoverTabs
                }
              />
            </div>
          </>
        )}
        <div className="mx-[-25]">
          {tabs?.map((tab, index) => (
            <TabPanel key={index} value={index}>
              {tab.component}
            </TabPanel>
          ))}
        </div>
      </TabContext>
      {type === "multi-step-form" && hasButtons && (
        <div className="mt-4">
          <ButtonGroup
            leftButton={{
              type: ButtonType.outlined,
              text: "Save & Continue Later",
            }}
            rightButton={{ type: ButtonType.disabled, text: "Add Employee" }}
            position="end"
          />
        </div>
      )}
    </div>
  );
};

export default TabFormat;
