import {useContext} from 'react'
import PropTypes from 'prop-types';
import {Pagination, PaginationControlItem, PaginationItem} from './styledComponents'

import ThemeContext from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconContainer } from '../../GlobalStyles';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const PaginationBar = (props) => {
    const { currentPage, setCurrentPage, totalPages } = props;

    const {theme} = useContext(ThemeContext);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
  return (
    <Pagination theme={theme}>
    <PaginationControlItem as="button"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >      <IconContainer theme={theme} isclickable="true">
    <FontAwesomeIcon icon={faAngleLeft} size='xl' />
    </IconContainer></PaginationControlItem>
    {[...Array(totalPages)].map((_, index) => (
      <PaginationItem
        theme={theme}
        key={index + 1}
        active={index + 1 === currentPage ? "true" : "false"}
        onClick={() => handlePageChange(index + 1)}
        >
        {index + 1}
      </PaginationItem>
    ))}
    <PaginationControlItem as="button"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <IconContainer theme={theme} isclickable="true">
      <FontAwesomeIcon icon={faAngleRight} size='xl' />
      </IconContainer>
    </PaginationControlItem>
    </Pagination>
    
  )
}
PaginationBar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationBar