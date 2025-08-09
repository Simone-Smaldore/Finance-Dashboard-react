import React from 'react';
import styled from '@emotion/styled';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { spendingData } from '../../data';

const Container = styled(Card)`
  h3 {
    margin-bottom: 1.5rem;
  }
`;

const IndicatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  height: calc(100% - 3rem);
`;

const Indicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`;

const PercentageText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  font-weight: 600;
`;

const Label = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SingleIndicator: React.FC<{ data: { name: string; percentage: number; color: string; } }> = ({ data }) => {
    const chartData = [
        { value: data.percentage },
        { value: 100 - data.percentage }
    ];
    return (
        <Indicator>
            <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={'70%'}
                            outerRadius={'100%'}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                        >
                            <Cell fill={data.color} />
                            <Cell fill={"#ffffff22"} />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <PercentageText>{data.percentage}%</PercentageText>
            </ChartWrapper>
            <Label>{data.name}</Label>
        </Indicator>
    )
}


const SpendingParams: React.FC = () => {
  return (
    <Container>
      <h3>Spending parameters</h3>
      <IndicatorsGrid>
        {spendingData.map(item => (
            <SingleIndicator key={item.name} data={item} />
        ))}
      </IndicatorsGrid>
    </Container>
  );
};

export default SpendingParams;
