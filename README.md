<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>
<p align="middle">
<img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
<img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
<a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
  <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/lotto_ui.png">
</p>

## 데모 페이지

-[행운의 로또](https://sunhpark42.github.io/javascript-lotto/)

### ☝️ 미션 수행할 때 우리가 정한 목표

- 동작하는 쓰레기 코드부터 작성해보자

  - 기능 구현을 우선하고, 리팩토링을 진행한다
  - 처음부터 불필요하게 구조나 디자인 패턴을 적용하지 말자
  - 앱의 규모에 따라서 적절한 구조를 적용해보자

- `innerHTML`과 `innerText` 사용하지 않기!

  - DOM 생성은 무조건 `createElement`에서 시작하기

- UX를 조금 더 생각해보기

  - 구입 금액 입력후 Enter키를 눌러도 입력되도록 하기
  - 번호보기 토글 클릭 시 스위치 뿐만 아니라 라벨을 눌러도 동작하도록
  - 기타 등등...

- 테스트 코드를 먼저 작성하고 기능 구현하기

### 디렉토리 구조

```
src/js
  ├── object/
  │   └── Lotto.js
  ├── views/
  │   └── LottoView.js
  ├── constants.js
  ├── index.js
  └── utils.js
```

### 🎯 step1 구입 기능

- [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
  - [x] 로또 구입 금액을 입력할 때 확인 버튼을 누르거나, Enter키로 입력할 수 있다.
  - [x] 구입 금액이 1,000원 단위가 아닐 경우, 구입할 수 있는 만큼만 구입한다. (e.g. 5,500원 -> 5장)
  - [x] 구입 금액이 0원 이상 1,000원 미만일 경우 alert 메시지를 표시한다.
  - [x] -1은 입력되지 않도록 한다.
  - [x] 로또 구입 금액 입력 후, input과 버튼을 비활성화한다.
  - [x] 로또 구입 금액 입력 후, 로또 목록이 나타나야 한다.
- [x] 로또 1장의 가격은 1,000원이다.
- [x] 소비자는 **자동 구매**를 할 수 있어야 한다.
  - [x] 자동 구매는 로또를 구입할 때, 각 로또마다 번호 6개가 자동으로 생성한 뒤 가지고 있어 한다.
- [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
  - [x] 🎟️ 옆에 `1,2,3,4,5,6`과 같은 형태의 문자열도 번호를 보여줄 수 있어야 한다.
  - [x] 번호보기 토글이 꺼져있을 때는 로또의 개수만큼 🎟️가 표시되어야 한다.
  - [x] 번호보기 텍스트를 눌렀을 때도 동작되어야 한다.

### step1 테스트 항목

- [x] 사용자가 로또 구입 금액을 입력하고 확인 버튼을 누르면 금액에 맞는 로또가 화면에 보여진다.
- [x] 사용자가 토글 버튼을 누르면 로또의 번호를 볼 수 있다.
- [x] 각 로또 안의 번호가 중복되지 않았는지 확인한다.

#### 예외사항(테스트)

- [x] 1000원 이하의 금액이 들어온 경우
  - [x] 사용자가 0원을 입력하면 '최소 1000원 이상의 금액을 입력하세요.'라고 경고창을 띄운다.
- [x] 사용자가 5500 원을 입력하면 화면에 로또가 5개 보여진다.

### 🎯🎯 step2 당첨 결과 기능

- [ ] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
- [ ] 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [ ] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 🎯🎯🎯 step3 수동 구매

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - 수동 구매를 위한 input UI는 스스로 구현한다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
