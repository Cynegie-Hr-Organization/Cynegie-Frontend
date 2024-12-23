import Value from './value';
import CardLabel from './label';
import React from 'react';
import { CardProps } from '../../types';

const Card: React.FC<CardProps> = (props) => {
  const {
    value,
    icon,
    iconColorVariant,
    iconContainerHeight,
    iconContainerWidth,
    labelText,
    valueBelow = true,
    lineBelowValue = false,
    valueLineColor,
    hasIcon = false,
    denominator,
    isPercentage = false,
    largeLabelText = false,
    additionalInfo,
  } = props;
  return (
    <div
      className={`flex ${
        valueBelow ? 'flex-col-reverse' : 'flex-col'
      } gap-4 common-card h-full`}
    >
      <Value
        lineBelow={lineBelowValue}
        lineColor={valueLineColor}
        value={value}
        denominator={denominator}
        isPercentage={isPercentage}
        additionalInfo={additionalInfo}
      />
      <CardLabel
        icon={icon}
        iconColorVariant={iconColorVariant}
        iconContainerHeight={iconContainerHeight}
        iconContainerWidth={iconContainerWidth}
        text={labelText}
        largeText={largeLabelText}
        hasIcon={hasIcon}
      />
    </div>
  );
};

export default Card;
