import IconWithData from "@/app/_components/shared/icon-with-data";
import { color, icon } from "@/constants";

const AddItemsLabel: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button>
      <div onClick={onClick}>
        <IconWithData
          icon={icon.circlePlus}
          data={text}
          color={color.info.dark}
        />
      </div>
    </button>
  );
};

export default AddItemsLabel;
