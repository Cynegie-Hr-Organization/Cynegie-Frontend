// import { Avatar } from '@mui/material';
import { color } from "@/constants";
import { AvatarGroupProps } from "./types";
import { Avatar, AvatarGroup as RsuiteAvatarGroup } from "rsuite";

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const { avatars } = props;
  const max = 4;
  const avatarStyle = {
    border: "3px solid white",
  };
  return (
    <RsuiteAvatarGroup stack size="sm">
      {avatars
        ?.filter((_avatar, i) => i < max)
        .map((avatar, index) => (
          <Avatar
            style={avatarStyle}
            circle
            key={index}
            src={avatar}
            alt={""}
          />
        ))}
      {avatars && avatars.length > 4 && (
        <Avatar
          style={{
            ...avatarStyle,
            backgroundColor: color.grey.light,
            color: color.grey.dark,
            fontWeight: 600,
          }}
          circle
        >
          +{avatars.length - max}
        </Avatar>
      )}
    </RsuiteAvatarGroup>
  );
};

export default AvatarGroup;
