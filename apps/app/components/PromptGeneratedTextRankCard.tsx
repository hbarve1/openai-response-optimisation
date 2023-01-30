import { Stack, Button } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const PromptGeneratedTextRankCard = ({ onSubmit }) => {
  const rankList = [1, 2, 3, -1];

  return (
    <Stack
      direction="row"
      spacing={1}
      style={{
        marginLeft: '4px',
        alignSelf: 'flex-start',
      }}
    >
      {rankList.map((rank) => (
        <Button
          key={rank}
          color={rank !== -1 ? 'primary' : 'error'}
          variant="contained"
          onClick={() => {
            onSubmit({ rank });
          }}
        >
          {rank !== -1 ? rank : <ThumbDownIcon />}
        </Button>
      ))}
    </Stack>
  );
};

export default PromptGeneratedTextRankCard;
