작업 내용에 대해서 타임라인으로 전부 기록해야한다.

회의록 남겨야한다.

참고사항 : WBS

# h1을 출력한다.

## h2을 출력한다.

### h3을 출력한다.

#### h4을 출력한다.

##### h5을 출력한다.

###### h6을 출력한다.

    탭을 이용해서 들여쓰기를 하면 회색으로 뭉쳐진다?

```
이래도 하나로 뭉쳐진다. 탬플릿 리터럴 3개
```

```javascript
const temp = "javascript를 출력할 수 있다";
```

1. 순서있다
2. 순서있다
3. 순서있다

- 순서 없다
  - 확인중
- 순서 없다
- 순서 없다

---

3개여도 되네...

<img width="100px" src="./140020_141031_1512.jpg" ></img>

```mermaid
  gitGraph
  commit id: "72일 추가"
  branch develop
  checkout develop
  commit
  commit
  commit
  checkout main
  merge develop
  commit
  commit
```

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'default' , 'themeVariables': {
              'git0': '#ff0000',
              'git1': '#00ff00',
              'git2': '#0000ff',
              'git3': '#ff00ff',
              'git4': '#00ffff',
              'git5': '#ffff00',
              'git6': '#ff00ff',
              'git7': '#00ffff'
} } }%%
  gitGraph
        commit
        branch hotfix
        checkout hotfix
        commit
        branch develop
        checkout develop
        commit id:"ash" tag:"abc"
        branch featureB
        checkout featureB
        commit type:HIGHLIGHT
        checkout main
        checkout hotfix
        commit type:NORMAL
        checkout develop
        commit type:REVERSE
        checkout featureB
        commit
        checkout main
        merge hotfix
        checkout featureB
        commit
        checkout develop
        branch featureA
        commit
        checkout develop
        merge hotfix
        checkout featureA
        commit
        checkout featureB
        commit
        checkout develop
        merge featureA
        branch release
        checkout release
        commit
        checkout main
        commit
        checkout release
        merge main
        checkout develop
        merge release
```

```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```
