import React from 'react';
import CardGroup from './card-group';
import SectionCardContainer from './container';

const SectionWithCards: React.FC<{
  title: string;
  period?: string;
  headerDivider?: boolean;
  cardsData: any[];
}> = ({ title, period, headerDivider = false, cardsData }) => {
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
