import styled from '@emotion/styled';

const Card = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  width: 100%;
`;

export default Card;
