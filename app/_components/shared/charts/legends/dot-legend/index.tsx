import Dot from '@/app/_components/shared/dot';

type DotLegend = {
  type?: 'meeting-indicator';
  dotColor?: string;
  label?: string;
  value?: number;
  countedItemName?: string;
};

const DotLegend: React.FC<DotLegend> = (props) => {
  const isMeetingIndicator = props.type === 'meeting-indicator';
  return (
    <div className='flex justify-between items-center font-normal text-sm text-[#1A1919] '>
      <div className='flex items-center gap-2'>
        <Dot
          color={props.dotColor}
          width={isMeetingIndicator ? 8 : 18.29}
          height={isMeetingIndicator ? 8 : 18.36}
        />
        <div className={`${isMeetingIndicator && 'text-[#5C6675]'}`}>
          {props.label}
        </div>
      </div>
      {props.countedItemName && (
        <div>{`${props.value ?? ''} ${
          props.countedItemName +
          (!(props.value == 1) ? `${props.value ? 's' : ''}` : '')
        }`}</div>
      )}
    </div>
  );
};

export default DotLegend;
