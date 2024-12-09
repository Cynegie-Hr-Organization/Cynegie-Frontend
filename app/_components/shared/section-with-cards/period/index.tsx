import { CardPeriodProps } from '../types';

const Period: React.FC<CardPeriodProps> = (props) => {
  const { text, font } = props;
  return (
    <div
      style={{
        color: font?.color ? font.color : '#98A2B3',
        fontSize: font?.size ? font.size : '12px',
        fontWeight: font?.weight ? font.weight : 400,
      }}
    >
      {text}
    </div>
  );
};

export default Period;
