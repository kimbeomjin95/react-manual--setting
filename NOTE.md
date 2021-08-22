1. ###`useRef`
    + 값이 바뀌어도 렌더링을 다시 시키고 싶지 않은 경우에는 useRef를 사용
    + useRef: 일반 값을 기억

1. ###`useEffect`
    + 처음 마운트(렌더링)될때 호출됨
    + <u>state별로 update할 내용이 다르다면 useEffect는 여러번 사용 가능</u>
    + 패턴1 - 처음 렌더링 될 때 호출해야 하는 경우  
        ```javascript
        useEffect(() => {
            // axios 호출
        }, [])
        ```
   
    + 패턴2 - 값이 변경된 경우만 axios를 호출해야 할 경우
       ```javascript
        const mounted = useRef(false);
        useEffect(() => {
            if (!mounted.current) { // useEffect가 실행은 되지만 아무것도 안함
                mounted.current = true;
            } else {
                // axios 호출
            }
        }, [바뀌는 값]) // 실행된 후 update 역할만 함
       ```
	
1. ###`useMemo` 
    + 함수의 리턴값을 저장, [deps]가 바뀌기 전까지
    + memo를 사용하면 자식 컴포넌트에서 props가 변경되지 않으면 리렌더링이 되지 않음
    + [deps] 배열안에 요소의 값이 변경되면 다시 useEffect 실행
    + useMemo: 복잡한 함수 결과값을 기억, 컴포넌트도 기억 가능(값이 변경되지 않음)
    + 부모컴포넌트가 렌더링될 때 자식 컴포넌트도 렌더링 되는가?<br />
      -> 무조건 변경됨, 그러므로 memo를 사용
    
1. ###`useCallback`
    + 함수 자체를 기억해서 함수컴포넌트가 재실행, [deps]가 바뀌기 전까지
	+ useCallback내에서 사용하는 state는 항상deps 에 넣어야 함
    + <u>자식 컴포넌트에 함수를 넘기려면 useCallback을 사용한 함수를 넘겨줘야 함<br />
    그래야 자식이 리렌더링 되지 않음</u>
    + 함수형 컴포넌트 내에서 사용하는 함수는 모두 useCallback
    + props 넘겨주는 데이터(onClick)는 useCallback으로 감싸는 것이 좋음
 
1. ###`map`
    + 반복문(map)를 기점으로 컴포넌트를 분리
    + 자식 컴포넌트는 데이터를 담고 있기 보단 화면 역할을 수행
    
1. ###`hook 사용법`
    + hook는 조건문 안에 절대 넣으면 안되고 함수나 반복문 안에도 넣으면 안됨<br />
    + useEffect, useCallback, useMemo 안에서 useState 사용 X
    + hook는 최상위로 선언 필요
    ```javascript
   if (조건) {
     const [state, setState] = useState(null);
   };
    ```

1. ###`useReducer`
    + 자식으로 여러개의 state를 넘어야 하는 경우 state관리가 어려우므로 useReducer를 사용하여 하나의 state와 setState로 통일을 할 수 있음
    + react는 state를 변경하면 변경된 내용을 자동으로 화면에 렌더링 해줌<br />
      앞으로 state를 하나로 모아두고, state는 action을 통해서만 변경한다<br />
      useState가 너무 많은 경우에는 useReducer를 고려해보면 좋음
    + action type은 변수로 빼놓기(상수, 대문자)<br />
      export는 자식에서 사용하기 위함
    + reducer함수(action타입을 구분하여 state를 변경)<br />
      action을 dispatch할 때 마다 reducer가 실행 됨, action의 종류가 많기 때문에 switch문을 이용(아래 예시)
      ```javascript
         const reducer = (state, action) => {
           switch (action.type) {
             case SET_WINNER:
               return {
                 // state.winner: action.winner -> 이렇게 직접 바꾸면 안되고, 새로운 객체를 만들어서 바뀐 값만 변경해줘야 함
                 ...state, // spread 문법(기존 state 얕은 복사)
                 winner: action.winner, // 바뀌는 부분만 새롭게 변경
                 // 새로운 state를 만들어서 return 해주면 react가 자동적으로 값을 변경시켜 줄 것
               };
           }
        };
      ```
    + useState, setState할 때 기존 state를 직접 바꾸는 게 아니라 새로운 state를 만들어서 바뀌는 부분만 변경 해준다.<br />
      useReducer를 사용하여 useState를 하나로 모아서 처리(initialState), setState는 dispatch로 대체가능
    + dispatch
        + dispatch안에 들어가는 것은 action 객체이자 액션을 의미
        + dispatch: action을 실행시키는 함수
        + dispatch에서 state를 변경하는 것은 비동기이다(useReducer Hook의 경우),
        + redux에서는 state 변경 하는 것이 동기적이다
        + 비동기 state를 처리하기 위해선 useEffect를 사용해야 함
        
1. ###`memo`   
    + props만 변경되지 않으면 리렌더링이 되지 않음, 반복문을 memo를 사용해주면 좋음
    
1. ###`무엇때문에 렌더링 되는지 확인하는 법(성능 최적화)`  
    ```javascript
   const ref = useRef([]);
     useEffect(() => {
       console.log(
         rowIndex === ref.current[0], // 바뀌는게 있다면 false이며, 이는 rerendering이 발생하는 이유
         rowIndex === ref.current[1],
         rowIndex === ref.current[2],
         rowIndex === ref.current[3],
       );
   	  // console.log(cellData, ref.current[2])
   	  // console.log(rowIndex, cellIndex, cellData,)
       ref.current = [rowIndex, cellIndex, cellData, dispatch]; // ref는 계속 바뀌며 가끔씩 나머지 데이터들이 안바뀌는 경우가 있음
     }, [rowIndex, cellIndex, cellData, dispatch]); // props로부터 받은 데이터 모두 넣기
    ```  