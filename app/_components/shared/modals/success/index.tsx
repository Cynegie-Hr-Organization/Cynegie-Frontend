/* eslint-disable @typescript-eslint/no-unused-vars */

<<<<<<< HEAD
import { FC } from "react";

import { GoodIcon } from "@/public/icons";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import Image from "next/image";
=======
import { FC } from 'react';


import { GoodIcon } from '@/public/icons';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/app/_components/ui/alert-dialog';
import Image from 'next/image';
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

type SuccessModalTypes = {
  open: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  description: string;
  link?: string;
  btnText?: string;
  secondBtnText?: string;
  secondBtnLink?: string;
  btnOneclassName?: string;
  btnTwoclassName?: string;
};

export const SuccessModal: FC<SuccessModalTypes> = ({
  open,
  onClose,
  description,
  title,
  link,
  btnText,
  secondBtnLink,
  secondBtnText,
  btnTwoclassName,
  btnOneclassName,
}) => {
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      {/* <AlertDialogTrigger>{children}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <div className="flex items-center justify-center">
          <div className="border-4 rounded-full border-LightMistGray">
            <div className="border-4 border-[#cedafc] rounded-full p-1 bg-[#cedafc]">
              <div className="bg-FreeSpeechBlue rounded-full lg:w-[86px] w-[63px] h-[63px] lg:h-[86px] flex justify-center items-center">
                <Image
                  src={GoodIcon}
                  alt="good icon"
                  height={40}
                  width={40}
                  className="lg:w-[60px] lg:h-[54.69px] w-[54px] h-[46px]"
                />
              </div>
            </div>
          </div>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center leading-[19.2px] mb-1">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full flex flex-col md:flex-row gap-2 justify-center px-2">
            <AlertDialogAction
              onClick={() => {
<<<<<<< HEAD
                router.push(link ? link : "/app-permission-request");
=======
                router.push(link ? link : '/app-permission-request');
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
                onClose();
              }}
              className={`bg-PersianBlue hover:bg-PersianBlue text-white ${btnOneclassName} w-[216px]`}
            >
<<<<<<< HEAD
              {btnText ? btnText : "Continue to App Dashboard"}
=======
              {btnText ? btnText : 'Continue to App Dashboard'}
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
            </AlertDialogAction>
            {secondBtnText && (
              <AlertDialogAction
                onClick={() => {
<<<<<<< HEAD
                  router.push(secondBtnLink ? secondBtnLink : "");
=======
                  router.push(secondBtnLink ? secondBtnLink : '');
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
                  onClose();
                }}
                className={`bg-PersianBlue hover:bg-PersianBlue text-white w-[216px] ${btnTwoclassName}`}
              >
                {secondBtnText}
              </AlertDialogAction>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
