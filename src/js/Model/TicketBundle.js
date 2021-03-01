import { STANDARD_NUMBER } from "../Util/constants.js";

export default class TicketBundle {
  constructor() {
    this.ticketBundle = [];
  }

  makeAutoTicketBundle(ticketcounts) {
    for (let i = 0; i < ticketcounts; i++) {
      this.ticketBundle.push(this.generateRandomNumbers());
    }

    return this.ticketBundle;
  }

  setSelfTicket(selfPurchaseLottoNumbers) {
    this.ticketBundle.push(selfPurchaseLottoNumbers);

    return this.ticketBundle;
  }

  generateRandomNumbers() {
    const numbers = Array.from(
      { length: STANDARD_NUMBER.LOTTO_MAX_NUMBER },
      (_, i) => i + 1
    );

    numbers.sort(() => Math.random() - Math.random());

    return numbers
      .slice(0, STANDARD_NUMBER.TICKET_NUMBER_LENGTH)
      .sort((a, b) => a - b);
  }
}

// export default new TicketBundle();
