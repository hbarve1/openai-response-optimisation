import PromptGeneratedText from './PromptGeneratedTextCard';

const PromptGeneratedTextList = ({ loading, error, data }) => {
  return (
    <div style={{ margin: '2px' }}>
      {loading && <p>Loading...</p>}

      {error && <p>Error :( Please try again</p>}

      {data?.createPrompt?.promptGeneratedTexts?.map(
        (promptGeneratedText, idx) => (
          <PromptGeneratedText
            promptGeneratedText={promptGeneratedText}
            key={idx}
            idx={idx}
          />
        )
      )}
    </div>
  );
};

export default PromptGeneratedTextList;
