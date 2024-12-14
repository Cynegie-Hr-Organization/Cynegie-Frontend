import { MoreVert } from '@mui/icons-material';
import { Button } from '@mui/material';

const MoreOptionsButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <MoreVert
        sx={{
          borderWidth: '0.5px',
          borderRadius: '4px',
          padding: '2px',
          fill: '#000',
        }}
      />
    </Button>
  );
};

export default MoreOptionsButton;
