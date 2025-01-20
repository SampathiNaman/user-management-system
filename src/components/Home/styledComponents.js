import {styled} from 'styled-components';
import {Col} from 'react-bootstrap';
import { colors } from '../../styles/theme';
import { IconContainer } from '../../GlobalStyles';

export const Wrapper = styled.div`
  background-color: transparent;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding: 50px 10px 20px 10px;

  @media (min-width: 768px) {
    padding: 50px 30px;
  }
`;

export const SearchContainer = styled.div`
  background-color: ${props => props.theme==='dark' ? colors.cardBgDark : colors.cardBgLight};
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  border: 1px solid ${props => props.theme==='dark' ? colors.borderDark : colors.borderLight};
  border-radius: 8px;
  margin-right: 10px;
`;

export const SearchInput = styled.input`
  color: ${props => props.theme==='dark' ? colors.textDark : colors.textLight};
  background-color: ${props => props.theme==='dark' ? colors.bgDark : colors.bgLight};
  height: 40px;
  flex-grow: 1;
  font-size: 16px;
  border: none;
  border-right: 1px solid ${props => props.theme==='dark' ? colors.borderDark : colors.borderLight};
  border-radius: 8px 0px 0px 8px;
  outline: none;
  box-shadow: none;
  padding: 10px 20px;

  @media (min-width: 768px) {
    height: 50px;
    font-size: 18px;
  }
`;

export const ThemeIconContainer = styled(IconContainer)`
    position: absolute;
    top: 20px;
    right: 20px;

    @media (min-width: 1200px) {
      top: 30px;
      right: 10%;
    }
`;

export const FlexCol = styled(Col)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
