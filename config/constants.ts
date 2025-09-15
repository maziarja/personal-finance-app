export const PAGE_SIZE = 10;

export const CHALLENGE_DATE = {
  year: 2024,
  month: 8,
  day: 18,
  hours: 23,
  min: 59,
  sec: 59,
};

export const TRANSACTIONS_LIMIT = 3;
export const DUE_SOON_RANGE = 5;

export const TRANSACTION_PERIOD_START = new Date(
  CHALLENGE_DATE.year,
  CHALLENGE_DATE.month - 1,
  0,
  CHALLENGE_DATE.hours,
  CHALLENGE_DATE.min,
  CHALLENGE_DATE.sec,
);

export const TRANSACTION_PERIOD_END = new Date(
  CHALLENGE_DATE.year,
  CHALLENGE_DATE.month,
  0,
  CHALLENGE_DATE.hours,
  CHALLENGE_DATE.min,
  CHALLENGE_DATE.sec,
);

export const TRANSACTION_LIMIT_FOR_OVERVIEW = 5;
export const POT_LIMIT_FOR_OVERVIEW = 4;
