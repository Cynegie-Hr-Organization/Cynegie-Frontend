import React from 'react';
import CardGroup from './card-group';
import SectionCardContainer from './container';
import { SectionWithCardsProps } from './types';

const SectionWithCards: React.FC<SectionWithCardsProps> = (props) => {
  const { title, period, headerDivider = false, cardsData } = props;
  return (
    <SectionCardContainer
      title={title}
      period={period}
      headerDivider={headerDivider}
    >
      <CardGroup data={cardsData} />
    </SectionCardContainer>
  );
};

export default SectionWithCards;
