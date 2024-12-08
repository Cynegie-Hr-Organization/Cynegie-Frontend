import Dot from '@/app/_components/shared/dot';

type DotLegend = {
  dotColor?: string;
  label?: string;
  value?: number;
  countedItemName?: string;
};

const DotLegend: React.FC<DotLegend> = (props) => {
  return (
    <div className='flex justify-between items-center font-normal text-sm text-[#1A1919] '>
      <div className='flex items-center gap-2'>
        <Dot color={props.dotColor} width={18.29} height={18.36} />
        <div>{props.label}</div>
      </div>
      {props.countedItemName && (
        <div>{`${props.value} ${
          props.countedItemName + (!(props.value == 1) ? 's' : '')
        }`}</div>
      )}
    </div>
  );
};

export default DotLegend;
