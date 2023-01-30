import { gql } from '@apollo/client';

export const CREATE_PROMPT = gql`
  mutation createPrompt($text: String!) {
    createPrompt(text: $text) {
      id
      text
      promptGeneratedTexts {
        id
        text
        index
        promptId
        userId
        rank
      }
    }
  }
`;

export const RANK_PROMPT_GENERATED_TEXT = gql`
  mutation rankPromptGeneratedText($id: Int!, $rank: Int!) {
    rankPromptGeneratedText(id: $id, rank: $rank) {
      id
      rank
    }
  }
`;

export const EDIT_PROMPT_GENERATED_TEXT = gql`
  mutation editPromptGeneratedText($id: Int!, $textEdited: String!) {
    editPromptGeneratedText(id: $id, textEdited: $textEdited) {
      id
      textEdited
    }
  }
`;
