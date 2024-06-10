export class HistoryModel {
  accountId: string;
  pagination: {
    length: string;
    page: string;
  };
  dataRange: {
    startDate: string;
    endDate: string;
    startAmount: string;
    endAmount: string;
  };

  constructor(
    accountId: string,
    pagination: {
      length: string;
      page: string;
    },
    dataRange: {
      startDate: string;
      endDate: string;
      startAmount: string;
      endAmount: string;
    }
  ) {
    this.accountId = accountId;
    this.pagination = pagination;
    this.dataRange = dataRange;
  }
}
