import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    let income: number = 0;
    let outcome: number = 0;

    transactions.forEach(transaction => {
      const value = parseFloat(transaction.value.toString());

      if (transaction.type === 'income') income += value;
      if (transaction.type === 'outcome') outcome += value;
    });

    const balance = income - outcome;

    return {
      income,
      outcome,
      total: balance,
    };
  }
}

export default TransactionsRepository;
