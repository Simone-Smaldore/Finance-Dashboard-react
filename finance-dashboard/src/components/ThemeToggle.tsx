import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span:before {
    transform: translateX(30px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.toggleColor};
  transition: 0.4s;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 5px;

  &:before {
    content: '';
    position: absolute;
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.text};
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const IconWrapper = styled.div`
    margin:0 8px;
`;

interface ThemeToggleProps {
    onToggleTheme: () => void;
    currentTheme: 'dark' | 'light';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggleTheme, currentTheme }) => {
    return (
        <ToggleWrapper>
            <IconWrapper>
                <FaMoon />
            </IconWrapper>

            <Switch>
                <Checkbox
                    type="checkbox"
                    checked={currentTheme === 'light'}
                    onChange={onToggleTheme}
                />
                <Slider />
            </Switch>
            <IconWrapper>
                <FaSun />
            </IconWrapper>
        </ToggleWrapper>
    );
};

export default ThemeToggle;
