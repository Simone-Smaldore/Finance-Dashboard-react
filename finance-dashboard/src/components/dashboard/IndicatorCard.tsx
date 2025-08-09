import React from 'react';
import styled from '@emotion/styled';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const IndicatorContainer = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text}99;
  margin-bottom: 0.5rem;
`;

const Value = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
  height: 60px;
`;

interface IndicatorCardProps {
  title: string;
  value: string;
  trendData: { name: string; value: number }[];
  color: string;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ title, value, trendData, color }) => {
  return (
    <IndicatorContainer>
      <Title>{title}</Title>
      <Value>{value}</Value>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </IndicatorContainer>
  );
};

export default IndicatorCard;
