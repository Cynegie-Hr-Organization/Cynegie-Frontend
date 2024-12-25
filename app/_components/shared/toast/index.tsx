import { color } from "@/constants";
import { Close } from "@mui/icons-material";

type ToastProps = {
  open: boolean;
  onClose: () => void;
  status: string;
  message: string;
};

const Toast: React.FC<ToastProps> = ({ open, onClose, status, message }) => {
  return (
    open && (
      <div
        style={{
          zIndex: 10000,
          borderLeft: `8px solid ${color.success.dark}`,
        }}
        className="common-card !rounded-lg absolute top-0 right-0 md:top-20 md:right-40"
      >
        <div className="flex gap-2">
          <div>
            <h6>{status}</h6>
            <p>{message}</p>
          </div>
          <div>
            <Close
              onClick={onClose}
              className="cursor-pointer"
              sx={{ width: 20, height: 20 }}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Toast;
