import styled from 'styled-components';
import { colors } from '../../styles/theme';

export const Button = styled.button`
  color: ${props => props.theme==='dark' ? colors.primaryDark : colors.primaryLight};
  background-color: ${props => props.theme==='dark' ? colors.bgDark : colors.bgLight};
  border: 1px solid ${props => props.theme==='dark' ? colors.borderDark : colors.borderLight};
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 40px;
  cursor: pointer;

  :hover {
    font-weight: bold;
    transform: scale(1.1);
  }

  :active {
    transform: scale(0.9);
  }

`;