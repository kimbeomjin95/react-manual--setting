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
    + useMemo: 복잡한 함수 결과값을 기억
    + 부모컴포넌트가 렌더링될 때 자식 컴포넌트도 렌더링 되는가?<br />
      -> 무조건 변경됨, 그러므로 memo를 사용
    
1. ###`useCallback`
    + 함수 자체를 기억해서 함수컴포넌트가 재실행, [deps]가 바뀌기 전까지
	+ useCallback내에서 사용하는 state는 항상deps 에 넣어야 함
    + <u>자식 컴포넌트에 함수를 넘기려면 useCallback을 사용한 함수를 넘겨줘야 함<br />
    그래야 자식이 리렌더링 되지 않음</u>
 
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
   }
    ```

    
    
     