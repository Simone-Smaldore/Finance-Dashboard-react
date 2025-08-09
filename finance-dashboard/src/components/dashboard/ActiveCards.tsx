import React from 'react';
import styled from '@emotion/styled';
import Card from '../common/Card';

const ActiveCardsContainer = styled(Card)`
  h3 {
    margin-bottom: 1.5rem;
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardDetails = styled.div`
  p {
    margin: 0;
  }
  .balance {
    font-weight: 600;
  }
  .bank {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text}99;
  }
`;

const CardExpiry = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text}99;
`;

const ActiveCards: React.FC = () => {
  return (
    <ActiveCardsContainer>
      <h3>Active cards</h3>
      <CardInfo>
        <CardDetails>
          <p className="balance">$ 25,558</p>
          <p className="bank">Bank of America</p>
        </CardDetails>
        <CardExpiry>12/25</CardExpiry>
      </CardInfo>
      <CardInfo>
        <CardDetails>
          <p className="balance">$ 10,250</p>
          <p className="bank">Chase</p>
        </CardDetails>
        <CardExpiry>08/26</CardExpiry>
      </CardInfo>
    </ActiveCardsContainer>
  );
};

export default ActiveCards;
