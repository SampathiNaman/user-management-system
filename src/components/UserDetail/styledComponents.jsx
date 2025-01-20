import styled from 'styled-components'
import {IconContainer, Title, Text} from '../../GlobalStyles'
import { colors } from '../../styles/theme';

export const Wrapper = styled.div`
    background: transparent;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    padding: 60px 10px 20px 10px;
    
    @media (min-width: 768px) {
        justify-content: center;
        padding: 40px 20px;
    }
`;
        
export const UserDetailCard = styled.div`
    width: 90%;
    max-width: 400px;
    color: ${props => props.theme==='dark' ? colors.textDark : colors.textLight};
    background-color: ${props => props.theme==='dark' ? colors.cardBgDark : colors.cardBgLight};
    border: none;
    border-radius: 8px;
    padding: 20px;
    margin-top: 10px;
    
    @media (min-width: 768px) {
        width: 70%;
        max-width: 700px;
    margin-top: 20px;
    padding: 40px;
  }
`;

export const CardTitle = styled(Title)`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

export const CardText = styled(Text)`
  display: inline-block;
  padding-left: 10px;
`;

export const NavIconContainer = styled(IconContainer)`
    position: absolute;
    top: 20px;
    left: ${props => props?.left || 'auto'};
    right: ${props => props?.right || 'auto'};
    
    @media (min-width: 768px) {
      top: 60px;
      left: ${props => props?.leftmd || 'auto'};
      right: ${props => props?.rightmd || 'auto'};
    }
`;
