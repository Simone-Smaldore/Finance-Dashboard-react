import React from 'react';
import styled from '@emotion/styled';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import Card from '../common/Card';
import { categoryData } from '../../data';

const ChartContainer = styled(Card)`
  height: 250px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
`;

const CategoryChart: React.FC = () => {
  return (
    <ChartContainer>
      <Title>Categories</Title>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CategoryChart;
