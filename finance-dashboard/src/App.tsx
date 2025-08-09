/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { ThemeProvider, Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import IndicatorCard from './components/dashboard/IndicatorCard';
import DissentionChart from './components/dashboard/DissentionChart';
import ActiveCards from './components/dashboard/ActiveCards';
import CategoryChart from './components/dashboard/CategoryChart';
import SpendingParams from './components/dashboard/SpendingParams';
import TransactionsList from './components/dashboard/TransactionsList';
import Investments from './components/dashboard/Investments';
import IncomeExpensesChart from './components/dashboard/IncomeExpensesChart';
import { monthlyTrend } from './data';
import { lightTheme, darkTheme } from './theme';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.body};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex-grow: 1;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 1.5rem;

  .dissention-chart { grid-column: 1 / 3; }
  .transactions { grid-column: 1 / 2; }
  .investments { grid-column: 2 / 4; }
  .income-expenses-chart { grid-column: 1 / 4; }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    .dissention-chart { grid-column: 1 / 3; }
    .transactions { grid-column: 1 / 2; }
    .investments { grid-column: 1 / 3; }
    .income-expenses-chart { grid-column: 1 / 3; }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .dissention-chart,
    .transactions,
    .investments,
    .income-expenses-chart {
      grid-column: 1 / 2;
    }
  }
`;


function App() {
  const [theme, setTheme] = useState('dark');
  const isDarkTheme = theme === 'dark';
  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Global
        styles={css`
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background: ${currentTheme.body};
            color: ${currentTheme.text};
            font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            transition: all 0.25s linear;
          }
          a {
            color: ${currentTheme.accent};
            text-decoration: none;
          }
        `}
      />
      <AppContainer>
        <Sidebar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <MainContent>
          <Header />
          <ContentArea>
            <DashboardGrid>
              <IndicatorCard
                title="Total balance"
                value="$857,850"
                trendData={monthlyTrend}
                color="#a66ff0"
              />
              <IndicatorCard
                title="Total expenses"
                value="$198,110"
                trendData={monthlyTrend}
                color="#6495ed"
              />
              <ActiveCards />
              <div className="dissention-chart">
                <DissentionChart />
              </div>
              <CategoryChart />
              <SpendingParams />
              <div className="transactions">
                  <TransactionsList />
              </div>
              <div className="investments">
                  <Investments />
              </div>
              <div className="income-expenses-chart">
                <IncomeExpensesChart />
              </div>
            </DashboardGrid>
          </ContentArea>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
