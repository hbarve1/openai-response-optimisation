import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import { gql, useMutation } from '@apollo/client';
import PromptInputCard from '../components/PromptInputCard';
import PromptGeneratedTextList from '../components/PromptGeneratedTextList';
import { CREATE_PROMPT } from '../graphql/gql';

// type Answer = {
//   id: number;
//   title: string;
//   rank: -1 | 0 | 1 | 2 | 3;
// };

export function Index() {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_PROMPT);

  const onSubmit = ({ value }) => {
    mutateFunction({
      variables: {
        text: value,
      },
    });
  };

  return (
    <>
      <Header />

      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" style={{ padding: '1rem' }}>
          <PromptInputCard onSubmit={onSubmit} />
          <PromptGeneratedTextList
            loading={loading}
            error={error}
            data={data}
          />
        </Container>
      </React.Fragment>
    </>
  );
}

export default Index;
