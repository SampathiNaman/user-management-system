import styled from 'styled-components';
import {Text, IconContainer} from '../../GlobalStyles';
import {colors} from '../../styles/theme';

export const UserCard = styled.div`
  height: 150px;
  width: 80%;
  max-width: 400px;
  background-color: ${props => props.theme==='dark' ? colors.cardBgDark : colors.cardBgLight};
  border: 2px solid ${props => props.theme==='dark' ? colors.borderDark : colors.borderLight};
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme==='dark' ? '0 8px 16px rgba(255, 255, 255, 0.1)' : '0 8px 16px rgba(0, 0, 0, 0.1)'};
    cursor: pointer;
  }

  @media (min-width: 768px) {
    height: 200px;
    width: 100%;
  }
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
`;

export const CardTitle = styled(Text)`
  color: ${props => props.theme==='dark' ? colors.primaryDark : colors.primaryLight};
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const CardText = styled(Text)`
  color: ${props => props.theme==='dark' ? colors.secondaryDark : colors.secondaryLight};
  display: inline-block;
  padding-left: 10px;
`;

export const SmIconContainer = styled(IconContainer)`
  height: 20px;
  width: 20px;
`;