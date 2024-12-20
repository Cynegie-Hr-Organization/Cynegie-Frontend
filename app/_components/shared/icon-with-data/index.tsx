import Image from 'next/image';
import React from 'react';

type IconWithDataProps = {
  icon: string;
  data: string | number;
  color?: string;
};

type ItemWithActionProps = {
  icon: React.ReactElement;
  action: string;
  onClick?: () => void;
  color?: string;
};

export const IconWithAction: React.FC<ItemWithActionProps> = ({
  icon,
  action,
  onClick,
  color,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex items-center gap-1 text-[${color}]`}
    >
      {icon}
      {action}
    </div>
  );
};

const IconWithData: React.FC<IconWithDataProps> = ({ icon, data, color }) => {
  return (
    <div className={`flex items-center gap-2 text-[${color}] font-bold`}>
      <div>
        <Image src={icon} alt='Message' width={16} height={16} />
      </div>
      <div>{data}</div>
    </div>
  );
};

export default IconWithData;
