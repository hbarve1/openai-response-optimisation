import { Card, Container, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import {
  EDIT_PROMPT_GENERATED_TEXT,
  RANK_PROMPT_GENERATED_TEXT,
} from '../graphql/gql';
import PromptGeneratedTextRankCard from './PromptGeneratedTextRankCard';

const PromptGeneratedTextCard = ({ promptGeneratedText, idx }) => {
  const { rank, text, id: promptGeneratedTextId } = promptGeneratedText;
  const [rankState, setRankState] = useState(rank);
  const [textState, setTextState] = useState(text);

  const [mutateFunctionForRank] = useMutation(RANK_PROMPT_GENERATED_TEXT);
  const [mutateFunctionForText] = useMutation(EDIT_PROMPT_GENERATED_TEXT);

  const onSubmit = async ({ rank }) => {
    const res = await mutateFunctionForRank({
      variables: {
        id: promptGeneratedTextId,
        rank,
      },
    });

    setRankState(res?.data?.rankPromptGeneratedText?.rank);
  };

  const onSubmitEdit = async () => {
    await mutateFunctionForText({
      variables: {
        id: promptGeneratedTextId,
        textEdited: textState,
      },
    });
  };

  return (
    <Card
      style={{
        padding: '8px 2px 2px 2px',
        marginTop: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'right',
      }}
    >
      <Container style={{ display: 'flex' }}>
        <TextField
          id={`prompt-generated-text ${promptGeneratedTextId}`}
          label={`Sample ${idx}`}
          placeholder="Placeholder"
          multiline
          style={{ width: '100%' }}
          value={textState}
          onChange={(e) => setTextState(e.target.value)}
          disabled={rankState === 0}
        />

        <PromptGeneratedTextRankCard onSubmit={onSubmit} />
      </Container>

      {rankState ? (
        <Button
          variant="contained"
          style={{
            width: 'fit-content',
            alignSelf: 'flex-end',
            margin: '8px',
          }}
          // disabled={rank === 0}
          onClick={onSubmitEdit}
        >
          Save Edits
        </Button>
      ) : null}
    </Card>
  );
};

export default PromptGeneratedTextCard;
