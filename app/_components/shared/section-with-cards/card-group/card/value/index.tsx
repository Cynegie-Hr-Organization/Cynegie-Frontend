import { CardValueProps } from '../../../types';

const Value: React.FC<CardValueProps> = (props) => {
  const {
    value,
    lineBelow = false,
    lineColor,
    denominator,
    isPercentage = false,
    additionalInfo,
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
        ...(additionalInfo && {
          display: 'flex',
          alignItems: 'center',
        }),
      }}
    >
      {<span style={{ flexGrow: 1 }}>{value}</span>}
      {isPercentage && '%'}
      {denominator && (
        <span
          style={{
            fontSize: '18px',
            color: '#475367',
            fontWeight: 600,
          }}
        >
          /{denominator}
        </span>
      )}
      {additionalInfo && (
        <span className='tiny-text self-end'>
          <span
            className={`${
              additionalInfo.left?.color &&
              `text-[${additionalInfo.left.color}]`
            }`}
          >
            {additionalInfo.left?.text ?? ''}
          </span>
          <span
            className={`${
              additionalInfo.right?.color &&
              `text-[${additionalInfo.right.color}]`
            }`}
          >
            {additionalInfo.right?.text ?? ''}
          </span>
        </span>
      )}
    </div>
  );
};

export default Value;
