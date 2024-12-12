import Image from 'next/image';

type IconWithDataProps = {
  icon: string;
  data: string | number;
};

const IconWithData: React.FC<IconWithDataProps> = ({ icon, data }) => {
  return (
    <div className='flex items-center gap-1'>
      <div>
        <Image src={icon} alt='Message' width={16} height={16} />
      </div>
      <div>{data}</div>
    </div>
  );
};

export default IconWithData;
