/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { DeleteIcon } from "@/assets/icons";

type DeleteTypes = {
  open: boolean; // Control the open state from the parent
  onClose: () => void; // Callback to close the modal
  // children: React.ReactNode;
  title: string;
  description: string;
  cancelText?: string;
  continueText?: string;
};

export const DeleteModal: FC<DeleteTypes> = ({
  open,
  onClose,
  // children,
  description,
  title,
  cancelText,
  continueText,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      {/* <AlertDialogTrigger>{children}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <div className="flex items-center justify-center">
          <div className="border-4 rounded-full border-LightMistGray">
            <div className="p-1 border-4 rounded-full border-DustyRose bg-DustyRose">
              <div>
                <img src={DeleteIcon} alt="Delete icon" />
              </div>
            </div>
          </div>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {cancelText ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClose}
            className="text-white bg-FieryRed"
          >
            {continueText ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
