import { CardValueProps } from '../../../types';

const Value: React.FC<CardValueProps> = (props) => {
  const {
    value,
    lineBelow = false,
    lineColor,
    denominator,
    isPercentage = false,
  } = props;
  return (
    <div
      style={{
        color: '#1B1B1B',
        fontWeight: 600,
        fontSize: '24px',
        ...(lineBelow && {
          textDecoration: 'underline',
          textUnderlineOffset: 11,
          textDecorationColor: lineColor,
        }),
      }}
    >
      {value}
      {isPercentage && '%'}
      {denominator && (
        <span style={{ fontSize: '18px', color: '#475367', fontWeight: 600 }}>
          /{denominator}
        </span>
      )}
    </div>
  );
};

export default Value;
