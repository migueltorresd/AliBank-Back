export class TransferModel {
  outComeId: string;
  inComeId: string;
  reason: string;
  amount: string;

  constructor(
    outComeId: string,
    inComeId: string,
    reason: string,
    amount: string
  ) {
    this.outComeId = outComeId;
    this.inComeId = inComeId;
    this.reason = reason;
    this.amount = amount;
  }
}
