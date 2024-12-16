import React from 'react';
import CardGroup from './card-group';
import SectionCardContainer from './container';
import { SectionWithCardsProps } from './types';

const SectionWithCards: React.FC<SectionWithCardsProps> = (props) => {
  const {
    title,
    period,
    headerDivider = false,
    cardsData,
    cardsGroup,
    isCard = false,
  } = props;
  return (
    <SectionCardContainer
      title={title}
      isCard={isCard}
      period={period}
      headerDivider={headerDivider}
    >
      {cardsData && <CardGroup cards={cardsData} />}
      {cardsGroup && <CardGroup {...cardsGroup} />}
    </SectionCardContainer>
  );
};

export default SectionWithCards;
