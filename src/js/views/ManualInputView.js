import View from './View.js';
import { $, $$ } from '../utils/dom.js';
import { ALERT_MESSAGES, LOTTO_NUMBERS } from '../utils/constants.js';

export default class ManualInputView extends View {
  constructor($element) {
    super($element);
  }

  init(count) {
    this.count = count;
    this.manualTicketNumbers = [];

    this.createManualForms();
    this.bindManualInputEvent();
    this.bindFocusEvent();
    this.showAllConfirmButton();
    this.bindConfirmEvent();
  }

  createManualForms() {
    const manualForms = Array.from(
      { length: this.count },
      (_, idx) =>
        `<li id="manual-wrapper-${idx}" class="mx-1 my-2 text-4xl manual-wrapper">
          <form class="d-flex items-center justify-between manual-input-form">
            <span class="lotto-icon">🎟️ </span>
            ${this.createManualInput()}
            <button type="submit" class="btn btn-cyan btn-small manual-input-btn">확정</button>
          </form>
        </li>
      `
    ).join('');

    this.$element.innerHTML = manualForms;
    $('#input-price-form').insertAdjacentElement('afterend', this.$element);
  }

  createManualInput() {
    return Array.from(
      { length: LOTTO_NUMBERS.LOTTO_MANUAL_COUNT },
      (_, i) =>
        `<input
          type="number"
          class="manual-number mx-1 text-center"
          aria-label="manual-number-${i}"
          data-manual-index="${i}"
          required
          min="1"
          max="45"
        />
      `
    ).join('');
  }

  bindManualInputEvent() {
    $$('.manual-input-form').forEach((manualTicket, idx) => {
      manualTicket.addEventListener('submit', e => {
        e.preventDefault();
        this.emit('submitTicket', {
          numberInputs: [...manualTicket.getElementsByTagName('input')],
          ticketIdx: idx,
        });
      });
    });
  }

  saveTemporaryTicket(ticketNumbers, idx) {
    this.manualTicketNumbers.push(ticketNumbers);
    $(`#manual-wrapper-${idx}`).innerHTML = `
      <span class="lotto-icon">🎟️ </span>
      <span class="lotto-detail">${ticketNumbers.join(', ')}</span>
    `;
  }

  bindFocusEvent() {
    $$('.manual-number').forEach(manualNumber => {
      manualNumber.addEventListener('input', () =>
        this.moveFocus(manualNumber)
      );
    });
  }

  moveFocus($element) {
    if ($element.value.length === 2) {
      if (this.isLastManualNumber($element.dataset.manualIndex)) return;
      $element.nextElementSibling.focus();
    }
  }

  isLastManualNumber(manualIndex) {
    return Number(manualIndex) === LOTTO_NUMBERS.LOTTO_MANUAL_COUNT - 1;
  }

  showAllConfirmButton() {
    const allConfirmBtn = document.createElement('div');
    allConfirmBtn.innerHTML = `
      <div id="convert-auto-caption">${ALERT_MESSAGES.CONVERT_TO_AUTO_WARNING}</div>
      <button
        type="submit"
        id="manual-confirm-btn"
        class="mt-5 btn btn-cyan w-100"
      >
        구매 확정하기
      </button>
    `;

    this.$element.append(allConfirmBtn);
  }

  bindConfirmEvent() {
    $('#manual-confirm-btn').addEventListener('click', () => {
      this.emit('confirmAll', this.manualTicketNumbers);
    });
  }

  resetManualInputs() {
    this.$element.innerHTML = '';
  }
}