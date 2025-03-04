import Button from "./button";
import { ButtonGroupPosition, ButtonGroupProps } from "./types";

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { leftButton, rightButton, position } = props;

  const getPosition = (position: ButtonGroupPosition) => {
    switch (position) {
      case "center":
        return "center";
      case "start":
        return "start";
      case "end":
        return "end";
      default:
        return "end";
    }
  };

  return (
    <div>
      {leftButton && rightButton && (
        <div
          className={`flex justify-center sm:justify-${getPosition(position)}`}
        >
          <div className="flex flex-col items-center sm:flex-row justify-center gap-5 sm:gap-5">
            {[leftButton, rightButton].map((buttonProps, index) => (
              <Button key={index} {...buttonProps} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
