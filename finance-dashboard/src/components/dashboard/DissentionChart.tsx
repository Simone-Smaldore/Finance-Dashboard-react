import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { dissentionData } from '../../data';

const ChartContainer = styled(Card)`
  height: 300px;
  padding-right: 2rem;
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
`;

const DissentionChart: React.FC = () => {
  const theme = useTheme();

  if (!theme || !theme.text) {
    return (
      <ChartContainer>
        <Title>Dissention</Title>
        <div>Loading chart...</div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <Title>Dissention</Title>
      <ResponsiveContainer width="100%" height="calc(100% - 3rem)">
        <BarChart data={dissentionData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={`${theme.text}22`} />
            <XAxis dataKey="name" tick={{ fill: theme.text }} />
            <YAxis tick={{ fill: theme.text }} />
            <Tooltip
                cursor={{ fill: `${theme.accent}1A` }}
                contentStyle={{
                    backgroundColor: theme.sidebarBg,
                    borderColor: theme.accent,
                    color: theme.text
                }}
            />
            <Bar dataKey="value" fill={theme.accent} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default DissentionChart;
