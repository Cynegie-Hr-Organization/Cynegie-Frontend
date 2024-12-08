import Button from './button';
import { ButtonGroupPosition, ButtonGroupProps } from './types';

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { leftButton, rightButton, position } = props;

  const getPosition = (position: ButtonGroupPosition) => {
    switch (position) {
      case 'center':
        return 'center';
      case 'start':
        return 'start';
      case 'end':
        return 'end';
      default:
        return 'end';
    }
  };

  return (
    <div>
      {leftButton && rightButton && (
        <div className={`flex justify-${getPosition(position)}`}>
          <div className='flex flex-row gap-4'>
            {[leftButton, rightButton].map((buttonProps) => (
              <Button key={buttonProps.text} {...buttonProps} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
