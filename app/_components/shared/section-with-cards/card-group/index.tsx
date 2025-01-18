import SvgIcon from "@/app/_components/icons/container";
import { icon } from "@/constants";
import { Grid2 } from "@mui/material";
import { CardGroupProps } from "../types";
import Card from "./card";

const CardGroup: React.FC<CardGroupProps> = ({
  cards: data,
  gridItemSize,
  cardLargeLabelText,
  cardValueBelow,
  loading,
}) => {
  return (
    <Grid2 className="h-full" container spacing={2}>
      {data?.map((card, index) => (
        <Grid2
          key={index}
          size={gridItemSize ?? { xs: 12, sm: 6 }}
          sx={{
            height: { xs: "fit-content", sm: `${/*100%*/ "fit-content"}` },
          }}
        >
          <Card
            value={card.value}
            valueBelow={card.valueBelow ?? cardValueBelow}
            icon={
              card.icon ?? <SvgIcon path={icon.square} width={16} height={16} />
            }
            iconColorVariant={card.iconColorVariant}
            iconContainerHeight={27.11}
            iconContainerWidth={27.11}
            labelText={card.labelText}
            largeLabelText={card.largeLabelText ?? cardLargeLabelText}
            hasIcon={card.hasIcon || card.icon ? true : false}
            denominator={card.denominator}
            isPercentage={card.isPercentage}
            additionalInfo={card.additionalInfo}
            loading={loading}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CardGroup;
