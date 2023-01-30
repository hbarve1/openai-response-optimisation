import { Card, TextField, Button } from '@mui/material';
import * as React from 'react';

const PromptInputCard = ({ onSubmit }) => {
  const [value, setValue] = React.useState('');

  const onClick = () => {
    onSubmit({ value });
    // setValue('');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        id="prompt-textarea"
        label="Prompt"
        placeholder="Prompt"
        multiline
        style={{ width: '100%', margin: '8px 0', padding: '0 8px' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="contained"
        style={{
          width: 'fit-content',
          alignSelf: 'flex-end',
          margin: '8px',
        }}
        onClick={onClick}
      >
        Generate
      </Button>
    </Card>
  );
};

export default PromptInputCard;
