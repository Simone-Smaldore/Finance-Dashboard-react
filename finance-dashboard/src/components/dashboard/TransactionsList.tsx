import React from 'react';
import styled from '@emotion/styled';
import Card from '../common/Card';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionsContainer = styled(Card)`
  h3 {
    margin-bottom: 1.5rem;
  }
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;

    &.income {
      background-color: ${({ theme }) => theme.chart.green}33;
      color: ${({ theme }) => theme.chart.green};
    }

    &.expense {
      background-color: ${({ theme }) => theme.chart.pink}33;
      color: ${({ theme }) => theme.chart.pink};
    }
  }

  .details {
    p {
      margin: 0;
    }
    .description {
      font-weight: 500;
    }
    .date {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.text}99;
    }
  }
`;

const TransactionAmount = styled.div<{ isIncome: boolean }>`
  font-weight: 600;
  color: ${({ theme, isIncome }) => isIncome ? theme.chart.green : theme.chart.pink};
`;

const transactions = [
  { description: 'Spotify Subscription', date: '28 Jan, 12:30 AM', amount: -12.50 },
  { description: 'Freelance Income', date: '25 Jan, 04:30 PM', amount: 2050.00 },
  { description: 'Grocery Shopping', date: '24 Jan, 10:00 AM', amount: -75.20 },
  { description: 'Amazon Purchase', date: '22 Jan, 08:00 PM', amount: -150.00 },
];

const TransactionsList: React.FC = () => {
  return (
    <TransactionsContainer>
      <h3>Transactions</h3>
      {transactions.map((t, index) => (
        <TransactionItem key={index}>
          <TransactionInfo>
            <div className={`icon ${t.amount > 0 ? 'income' : 'expense'}`}>
              {t.amount > 0 ? <FaArrowUp /> : <FaArrowDown />}
            </div>
            <div className="details">
              <p className="description">{t.description}</p>
              <p className="date">{t.date}</p>
            </div>
          </TransactionInfo>
          <TransactionAmount isIncome={t.amount > 0}>
            {t.amount > 0 ? `+ $${t.amount.toFixed(2)}` : `- $${Math.abs(t.amount).toFixed(2)}`}
          </TransactionAmount>
        </TransactionItem>
      ))}
    </TransactionsContainer>
  );
};

export default TransactionsList;
