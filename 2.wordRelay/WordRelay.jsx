const React = require('react');
const { useState, useRef } = React; // 구조분해(비구조화 할당)

const WordRelay = () => {
    const [state, setState] = useState({
        word: '김범진',
        value: '',
        result: ''
    });
    const inputName = useRef();
    const { word, value, result } = state;

    const onChange = (e) => {
        setState({
            word: word,
            value: e.target.value,
            result: '',
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setState({
                word: value,
                value: '',
                result: '딩동댕',
            })
            inputName.current.focus();
        } else {
            setState({
                word: word,
                value: '',
                result: '땡',
            })
            inputName.current.focus();
        }

    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>{word}</div>
                <input onChange={onChange} value={value} ref={inputName}/><button>클릭</button>
                {result}
            </form>
        </>
    )
}

// export default WordRelay;
module.exports = WordRelay;