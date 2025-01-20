import { createGlobalStyle, styled } from "styled-components";
import {colors} from "./styles/theme";

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }
    
  body {
    padding: 0px;
    margin: 0px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

`;

export const Background = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme==='dark' ? colors.bgDark : colors.bgLight};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

export const Title = styled.h1`
  color: ${props => props.theme==='dark' ? colors.primaryDark : colors.primaryLight};
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 42px;
    margin-bottom: 30px;
  }
`;

export const Text = styled.p`
  color: ${props => props.theme==='dark' ? colors.textDark : colors.textLight};
  font-size: 14px;
  padding: 0px;
  margin: 0px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export const IconContainer= styled.div`
  color: ${props => props.theme==='dark' ? colors.primaryDark : colors.primaryLight};
  background-color: transparent;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props?.isclickable==="true" ? 'pointer' : 'default'};

  :active {
    transform: scale(0.9);
  }

  @media (min-width: 768px) {
    height: 50px;
    width: 50px;
  }
`;

export default GlobalStyles;
