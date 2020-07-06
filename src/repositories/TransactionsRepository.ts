import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

// DTO: Data Transfer Object
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator: Balance, { value, type }: Transaction) => {
        switch (type) {
          case 'income':
            accumulator.income += value;
            accumulator.total += value;
            break;
          case 'outcome':
            accumulator.outcome += value;
            accumulator.total -= value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
