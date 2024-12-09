import { Avatar } from '@mui/material';
import { AvatarGroupProps } from './types';

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const { avatars } = props;
  return (
    <div>
      {avatars.map((avatar, index) => (
        <Avatar key={index} src={avatar} className='w-24 h-24' />
      ))}
    </div>
  );
};

export default AvatarGroup;
