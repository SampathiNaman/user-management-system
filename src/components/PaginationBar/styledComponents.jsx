import styled, {css} from 'styled-components';
import { colors } from '../../styles/theme';

export const Pagination = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    cursor: pointer;
    padding: 0px;
`;


const DarkPaginationItem = css`
color: ${props => props.active==="true" ? colors.primaryDark : colors.textDark};
background-color: ${colors.bgDark};
border: 1px solid ${colors.borderLight};

`;

const LightPaginationItem = css`
color: ${props => props.active==="true" ? colors.primaryLight : colors.textLight};
background-color: ${colors.bgLight};
border: 1px solid ${colors.borderDark};
`;

const ActivePaginationItem = css`
font-weight: bold;
transform: scale(1.1) translateY(-2px);
`;

export const PaginationItem = styled.li`
${props => props.theme==='dark' ? 
    DarkPaginationItem
    : 
    LightPaginationItem}
    ${props => props.active==="true" && ActivePaginationItem}
    display: inline-block;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 50px;
    margin: 4px;
    transition: transform 0.3s ease-in-out;
`;
    
export const PaginationControlItem = styled.li`
    background-color: transparent;
    border: 1px solid ${colors.borderDark};
    border-radius: 6px;
    padding: 0px;
    margin: auto 8px;

    :active {
        transform: scale(0.9);
    }
`;

