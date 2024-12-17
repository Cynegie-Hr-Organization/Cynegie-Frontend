import { color } from '@/constants';
import { Close } from '@mui/icons-material';
import CardLabelIcon from '../section-with-cards/card-group/card/label/icon';
import SvgIcon from '../../icons/container';

type ToastProps = {
  open: boolean;
  type?: 'success' | 'error';
  onClose: () => void;
  status: string;
  message: string;
  icon?: string;
};

const Toast: React.FC<ToastProps> = ({
  open,
  type,
  onClose,
  status,
  message,
  icon,
}) => {
  return (
    open && (
      <div
        style={{
          zIndex: 10000,
          borderLeft: `8px solid ${color.success.dark}`,
        }}
        className='common-card !rounded-lg fixed top-0 right-0 md:top-20 md:right-40'
      >
        <div className='flex gap-2'>
          <CardLabelIcon
            icon={<SvgIcon path={icon ?? ''} width={9} height={9} />}
            colorVariant={type || 'success'}
            containerWidth={24}
            containerHeight={24}
          />
          <div>
            <h6>{status}</h6>
            <p>{message}</p>
          </div>
          <div>
            <Close
              onClick={onClose}
              className='cursor-pointer'
              sx={{ width: 20, height: 20 }}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Toast;
