import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AppAlertDialog({
  children,
  header,
  description,
  cancelText,
  confirmText,
  cancelAction,
  confirmAction,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  // title: string,
  description: string;
  cancelText?: string;
  confirmText: string;
  cancelAction?: () => void;
  confirmAction: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {header}
            {/* {title} */}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-center justify-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center sm:justify-center mt-5">
          {cancelText && (
            <AlertDialogCancel onClick={cancelAction}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            className="btn-primary text-white"
            onClick={confirmAction}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
