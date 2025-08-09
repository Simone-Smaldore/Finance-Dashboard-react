import React from 'react';
import styled from '@emotion/styled';
import Card from '../common/Card';

const InvestmentsContainer = styled(Card)`
    h3 {
        margin-bottom: 1.5rem;
    }
`;

const InvestmentItem = styled.div`
    margin-bottom: 1.5rem;
    &:last-child {
        margin-bottom: 0;
    }
`;

const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;

    .value {
        color: ${({ theme }) => theme.text}99;
    }
`;

const ProgressBar = styled.div<{ color: string, percentage: number }>`
    height: 8px;
    width: 100%;
    background-color: ${({ theme }) => theme.body};
    border-radius: 4px;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        height: 100%;
        width: ${({ percentage }) => percentage}%;
        background-color: ${({ color }) => color};
        border-radius: 4px;
    }
`;

const investments = [
    { name: 'Stocks and bonds', value: 250000, total: 500000, color: '#a66ff0' },
    { name: 'Cryptocurrency', value: 120000, total: 200000, color: '#6495ed' },
    { name: 'Contributions', value: 80000, total: 150000, color: '#ff69b4' },
    { name: 'Assets', value: 400000, total: 600000, color: '#3cb371' },
];

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

const Investments: React.FC = () => {
    return (
        <InvestmentsContainer>
            <h3>Investments</h3>
            {investments.map(item => (
                <InvestmentItem key={item.name}>
                    <ItemHeader>
                        <span>{item.name}</span>
                        <span className="value">{formatCurrency(item.value)}</span>
                    </ItemHeader>
                    <ProgressBar color={item.color} percentage={(item.value / item.total) * 100} />
                </InvestmentItem>
            ))}
        </InvestmentsContainer>
    );
};

export default Investments;
