import React from "react";
import CardGroup from "./card-group";
import SectionCardContainer from "./container";
import { SectionWithCardsProps } from "./types";
import SelectField from "../../employee/input-fields/select";

const SectionWithCards: React.FC<SectionWithCardsProps> = (props) => {
  const {
    title,
    period,
    headerDivider = false,
    cardsData,
    cardsGroup,
    isCard = false,
    periodClick,
    selectFilterProps,
  } = props;
  return (
    <SectionCardContainer
      title={title}
      isCard={isCard}
      period={period}
      periodClick={periodClick}
      headerDivider={headerDivider}
    >
      {selectFilterProps && (
        <div className="w-[100px]">
          <SelectField {...selectFilterProps} />
        </div>
      )}
      {cardsData && <CardGroup cards={cardsData} />}
      {cardsGroup && <CardGroup {...cardsGroup} />}
    </SectionCardContainer>
  );
};

export default SectionWithCards;
