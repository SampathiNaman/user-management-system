import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Background, Title, Text } from '../../GlobalStyles';
import {Button} from './styledComponents';

import ThemeContext from '../../context/ThemeContext';

const NotFound = () => {
  const {theme} = useContext(ThemeContext);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }

  return (
    <Background theme={theme}>
      
      <Title theme={theme}>Page not found</Title>
      <Text theme={theme} className='text-center px-4'>
        The page you are looking for does not exist. Please check the URL or go back to the homepage.
      </Text>
      <Button onClick={goToHome} type="button" theme={theme}>Go to Home</Button>
    </Background>
  )};


export default NotFound;
