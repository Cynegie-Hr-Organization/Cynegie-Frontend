import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

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
  const navigate = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      {/* <AlertDialogTrigger>{children}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <div className="flex items-center justify-center">
          <div className="border-4 rounded-full border-LightMistGray">
            <div className="border-4 border-[#cedafc] rounded-full p-1 bg-[#cedafc]">
              <div className="bg-FreeSpeechBlue rounded-full lg:w-[86px] w-[63px] h-[63px] lg:h-[86px] flex justify-center items-center">
                <Image
                  src=""
                  width={54}
                  height={46}
                  alt="good icon"
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
                navigate.push(link ? link : "/app-permission-request");
                onClose();
              }}
              className={`bg-PersianBlue hover:bg-PersianBlue text-white ${btnOneclassName} w-[216px]`}
            >
              {btnText ? btnText : "Continue to App Dashboard"}
            </AlertDialogAction>
            {secondBtnText && (
              <AlertDialogAction
                onClick={() => {
                  navigate.push(secondBtnLink ? secondBtnLink : "");
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
