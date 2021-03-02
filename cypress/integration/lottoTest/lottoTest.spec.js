import { getRandomNumber } from '../../../src/js/utils/utils.js';
import LottoProcessor from '../../../src/js/utils/lottoProcessor.js';
import { LOTTO_NUMBERS } from '../../../src/js/utils/constants.js';
import Lotto from '../../../src/js/Lotto.js';

describe('로또 게임 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  const price = 5000;
  const lottoTotalCount = price / 1000;
  const LOTT0_LENGTH = 7;

  function clickAfterTypePrice() {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
  }

  function typeManualNumberAndConfirm() {
    cy.get('.manual-wrapper').each(manualTicket => {
      cy.wrap(manualTicket)
        .find('.manual-number')
        .each((manualNumber, innerIdx) => {
          cy.wrap(manualNumber).type(innerIdx + 10); // type random number
        });
      // 버튼이 위에서부터 하나씩 사라지기 때문에 항상 0번째 index를 클릭
      cy.get('.manual-input-btn').eq(0).click();
    });
  }

  function typeNotEnoughManualInput() {
    // 로또 1장만 입력 후 구매 확정 (오류 테스트)
    cy.get('.manual-wrapper')
      .eq(0)
      .find('.manual-number')
      .each((manualNumber, idx) => {
        cy.wrap(manualNumber).type(idx + 10); // type random number
      });
    cy.get('.manual-input-btn').eq(0).click();
  }

  function typeWinningNumber() {
    const numbers = new Set();
    while (numbers.size < LOTT0_LENGTH) {
      numbers.add(getRandomNumber(1, LOTTO_NUMBERS.LOTTO_MAX_NUM));
    }

    cy.get('.winning-number').each((winningNumber, idx) => {
      cy.wrap(winningNumber).type([...numbers][idx]);
    });
  }

  it('프로그램을 시작하면 구매 방식(자동/수동) 선택지와 구입금액 입력폼이 보인다.', () => {
    cy.get('#purchase-type').should('be.visible');
    cy.get('#input-price-form').should('be.visible');
    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#winning-numbers-form').should('not.be.visible');
  });

  it('구매 방식(자동/수동) 선택지를 클릭하면 버튼의 배경색이 서로 바뀐다.', () => {
    cy.get('#auto-btn').click();
    cy.get('#auto-btn').should('have.class', 'btn-cyan');
    cy.get('#manual-btn').click();
    cy.get('#manual-btn').should('have.class', 'btn-cyan');
  });

  it('수동 구매를 선택하고 금액을 입력하면, 금액만큼의 번호 입력 폼을 보여준다.', () => {
    cy.get('#manual-btn').click();
    clickAfterTypePrice();

    cy.get('.manual-wrapper').should('have.length', lottoTotalCount);
  });

  it('수동 구매 번호를 모두 올바르게 입력하면, 확정된 로또 티켓을 보여준다.', () => {
    cy.get('#manual-btn').click();
    clickAfterTypePrice();
    typeManualNumberAndConfirm();

    cy.get('.manual-wrapper').each(manualTicket => {
      cy.wrap(manualTicket).find('.lotto-detail').should('be.visible');
    });
  });

  it('수동 구매 후 남는 금액 발생 시 자동 구매 진행 확인창이 뜬다. ', () => {
    const alertStub = cy.stub();
    cy.on('window:confirm', alertStub);

    cy.get('#manual-btn').click();
    clickAfterTypePrice();
    typeNotEnoughManualInput();

    cy.get('#manual-confirm-btn')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          '남은 금액은 자동구매로 진행됩니다. 계속하시겠습니까?'
        );
      });
  });

  it('수동 구매 후 남는 금액으로 자동 구매 동의 시 자동 구매를 진행한다. ', () => {
    const alertStub = cy.stub();
    cy.on('window:confirm', alertStub);

    cy.get('#manual-btn').click();
    clickAfterTypePrice();
    typeNotEnoughManualInput();

    cy.get('#manual-confirm-btn')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          '남은 금액은 자동구매로 진행됩니다. 계속하시겠습니까?'
        );
      });

    cy.on('window:confirm', () => true);
    cy.get('#purchased-lottos').should('be.visible');
  });

  it('자동 구매 시 로또 구입 금액을 입력하고 확인 버튼을 누르면 사용자가 구매한 로또와 지난 주 당첨 로또 입력폼이 보인다.', () => {
    clickAfterTypePrice();

    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#winning-numbers-form').should('be.visible');
  });

  it('자동 구매 시 사용자가 로또 구입 금액 입력 후 enter를 누르면 사용자가 구매한 로또와 지난 주 당첨 로또 입력폼이 보인다.', () => {
    cy.get('#input-price').type(`${price}{enter}`);
    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#winning-numbers-form').should('be.visible');
  });

  it('사용자가 구매한 로또의 개수와 개수 만큼의 로또 이모지를 보여준다.', () => {
    clickAfterTypePrice();

    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#total-purchased').should('have.text', lottoTotalCount);
    cy.get('#lotto-icons')
      .children('.lotto-wrapper')
      .should('have.length', lottoTotalCount);
    cy.get('#winning-numbers-form').should('be.visible');
  });

  it('번호 보기 스위치 off 상태에서는 로또 아이콘들이 가로로, on에서는 세로로 정렬된다.', () => {
    clickAfterTypePrice();

    cy.get('.switch').click();
    cy.get('#lotto-icons').should('have.class', 'flex-col');
    cy.get('.switch').click();
    cy.get('#lotto-icons').should('not.have.class', 'flex-col');
  });

  it('번호 보기 스위치가 off이면 구매한 로또의 번호가 보이지 않고, on이면 번호가 보인다.', () => {
    clickAfterTypePrice();

    cy.get('.switch').click();
    cy.get('.lotto-wrapper').children('.lotto-detail').should('be.visible');
    cy.get('.switch').click();
    cy.get('.lotto-wrapper').children('.lotto-detail').should('not.be.visible');
  });

  it('당첨 숫자를 모두 입력하면, 결과 확인 버튼이 활성화된다.', () => {
    clickAfterTypePrice();
    typeWinningNumber();

    cy.get('#show-result-btn').should('not.be.disabled');
  });

  it('결과 확인 버튼을 누르면 modal 창이 보이고, x 버튼을 누르면 modal 창이 닫힌다.', () => {
    clickAfterTypePrice();
    typeWinningNumber();

    cy.get('#show-result-btn').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('modal 영역 밖을 click 하면 modal 창이 닫힌다', () => {
    clickAfterTypePrice();
    typeWinningNumber();

    cy.get('#show-result-btn').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-inner').click();
    cy.get('.modal').should('be.visible');
    cy.get('h1').click(-50, -50, { force: true }); // modal 영역 밖을 클릭한 경우
    cy.get('.modal').should('not.be.visible');
  });

  const lottoNumsArr = [
    [21, 6, 43, 29, 35, 16], // 1등 (6개 일치)
    [21, 6, 43, 29, 35, 17], // 2등 (5개 + 보너스)
    [17, 44, 28, 43, 7, 33], // 탈락
    [41, 33, 4, 25, 11, 30], // 탈락
    [21, 6, 43, 37, 26, 15], // 5등 (3개 일치)
    [27, 13, 39, 29, 35, 16], // 5등 (3개 일치)
  ];

  const winningNumbers = [21, 6, 43, 29, 35, 16, 17];

  it('로또 당첨 결과를 올바르게 계산한다.', () => {
    const lottos = [];
    const rankCounts = [1, 1, 0, 0, 2];

    lottoNumsArr.forEach(lottoNums => {
      const lotto = new Lotto(lottoNums);
      lottos.push(lotto);
    });

    const lottoProcessor = new LottoProcessor(lottos, winningNumbers);
    lottoProcessor.checkMatchingNums();

    expect(lottoProcessor.rankCounts).to.deep.equal(rankCounts);
  });

  it('수익률을 올바르게 계산한다.', () => {
    const lottos = [];
    const sum = 2030010000;
    const purchasedPrice = 6000;
    const earningRate = (sum / purchasedPrice - 1) * 100;

    lottoNumsArr.forEach(lottoNums => {
      const lotto = new Lotto(lottoNums);
      lottos.push(lotto);
    });

    const lottoProcessor = new LottoProcessor(lottos, winningNumbers);
    lottoProcessor.checkMatchingNums();
    lottoProcessor.calculateEarningRate(purchasedPrice);

    expect(lottoProcessor.earningRate).to.be.equal(earningRate);
  });

  it('두개의 숫자를 입력하면, 자동으로 다음 숫자 칸으로 focus가 이동한다.', () => {
    clickAfterTypePrice();

    for (let i = 0; i < LOTT0_LENGTH; i++) {
      cy.get('.winning-number')
        .eq(i)
        .type(String(10 + i));

      if (i === LOTT0_LENGTH - 1) break;

      cy.get('.winning-number')
        .eq(i + 1)
        .should('be.focused');
    }
  });

  it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
    clickAfterTypePrice();
    typeWinningNumber();

    cy.get('#show-result-btn').click();
    cy.get('.modal').should('be.visible');

    cy.get('#reset-btn').click();
    cy.get('.modal').should('not.be.visible');

    cy.get('#input-price-form').should('be.visible');
    cy.get('#input-price').should('have.value', '');

    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#winning-numbers-form').should('not.be.visible');
    cy.get('.winning-number').each(winningNumber => {
      cy.wrap(winningNumber).should('have.value', '');
    });
  });
});