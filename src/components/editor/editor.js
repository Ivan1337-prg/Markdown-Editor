import { useState } from 'react';
import TitleBar from '../title-bar/title-bar';
import { useMarkdown } from '../../providers/markdown-provider';
import './editor.css';

const Editor = () => {
  const [markdown, setMarkdown] = useMarkdown();
  const [words, setWords] = useState(0);
  const [chars, setChars] = useState(0);

  const getWordsCount = (str) => {
    if (!str || str.trim() === '') return 0; 
    const matches = str.match(/(\w+)/g);
    return matches ? matches.length : 0; 
  };

  const getCharsCount = (str) => {
    return str ? str.length : 0;
  };

  const updateMarkdown = (event) => {
    const value = event.target.value;

    setMarkdown(value);
    setWords(getWordsCount(value));
    setChars(getCharsCount(value));
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    const file = new Blob([markdown || ''], { type: 'text/plain' }); 
    link.href = URL.createObjectURL(file);
    link.download = 'Untitled.md';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="editor__wrap">
      <TitleBar title="Editor" aside={`${words} Words ${chars} Characters`} />
      <textarea
        className="editor"
        value={markdown || ''} 
        onChange={updateMarkdown}
      />
      <button onClick={downloadFile}>Download File</button>
    </div>
  );
};

export default Editor;
