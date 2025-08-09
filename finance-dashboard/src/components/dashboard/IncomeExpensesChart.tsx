import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceDot } from 'recharts';
import Card from '../common/Card';
import { weeklyActivityData } from '../../data';

const ChartContainer = styled(Card)`
  height: 300px;
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
`;

const IncomeExpensesChart: React.FC = () => {
    const theme = useTheme();

    if (!theme || !theme.text) {
        return (
            <ChartContainer>
                <Title>Income and expenses</Title>
                <div>Loading chart...</div>
            </ChartContainer>
        );
    }

    // Find the peak point for highlighting
    const peakIncome = weeklyActivityData.reduce((max, current) => (current.income > max.income ? current : max), weeklyActivityData[0]);

    return (
        <ChartContainer>
            <Title>Income and expenses</Title>
            <ResponsiveContainer width="100%" height="calc(100% - 3rem)">
                <LineChart data={weeklyActivityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${theme.text}22`} />
                    <XAxis dataKey="day" tick={{ fill: theme.text }} />
                    <YAxis tick={{ fill: theme.text }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme.sidebarBg,
                            borderColor: theme.accent,
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke={theme.chart.green} strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke={theme.chart.pink} strokeWidth={2} />
                    <ReferenceDot
                        x={peakIncome.day}
                        y={peakIncome.income}
                        r={8}
                        fill={theme.chart.green}
                        stroke={theme.body}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default IncomeExpensesChart;
