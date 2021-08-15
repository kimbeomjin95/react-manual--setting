const React = require('react');
const { useState, useRef } = React; // 구조분해(비구조화 할당)

const WordRelay = () => {
  const [word, setWord] = useState('김범진');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const inputName = useRef();

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setResult('딩동댕');
      setValue('');
      inputName.current.focus();
    } else {
      setValue('');
      setResult('땡');
      setValue('');
      inputName.current.focus();
    }
  };
  return (
    <>
      <div><b>{word}</b></div>
      <form onSubmit={onSubmit}>
        <label id='label' htmlFor='wordInput'>글자를 입력하세요</label><br/>
        <input
          id="wordInput"
          className="wordInput"
          onChange={onChange}
          value={value}
          ref={inputName}
        />
        <button>클릭</button>
        <div>{result}</div>
      </form>
    </>
  );
};

// export default WordRelay;
module.exports = WordRelay;
