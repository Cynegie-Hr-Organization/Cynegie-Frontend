import { ChartCenterTextValueProps } from '../../types';

const CenterTextValue: React.FC<ChartCenterTextValueProps> = ({
  value,
  isPercentage = false,
  denominator,
}) => {
  return (
    <div style={{ fontSize: '24px', fontWeight: 600, color: '#000000' }}>
      {value}
      {isPercentage && '%'}
      {denominator && <span></span>}
    </div>
  );
};

export default CenterTextValue;
