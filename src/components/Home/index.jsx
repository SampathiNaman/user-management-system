import { useState, useEffect, useCallback, useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSun,
  faMoon,
  faArrowDownAZ,
  faArrowUpZA,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Background,
  Title,
  Text,
  IconContainer,
} from "../../GlobalStyles";
import {
  Wrapper,
  SearchContainer,
  SearchInput,
  ThemeIconContainer,
  FlexCol,
} from "./styledComponents";

import UserCard from "../UserCard";
import ThemeContext from "../../context/ThemeContext";
import PaginationBar from "../PaginationBar";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const sortOrderConstants = {
  none: "NONE",
  ascending: "ASCENDING",
  descending: "DESCENDING",
}

const PAGE_CAPACITY = 6;
const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_PAGES = 1;

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);  //This state is used to store the users after filtering and sorting
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState(sortOrderConstants.none);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(DEFAULT_TOTAL_PAGES);

  const [apiState, setApiState] = useState(apiStatusConstants.initial);
  const [error, setError] = useState("");
  
  const { theme, handleThemeChange } = useContext(ThemeContext);

  const sortByName = (data = filteredUsers, reverse = false) => {
    return [...data].sort((a, b) => {
      if (a.name < b.name) return reverse ? 1 : -1;
      if (a.name > b.name) return reverse ? -1 : 1;
      return 0;
    });
  };

  const filterUsers = (data=users) => {
    if (searchInput === "") {
      return data;
    }
    return data.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase()));
  }

  const sortUsers = (data = filteredUsers, order=sortOrder, filterAgain=false) => {
    switch (order) {
      case sortOrderConstants.ascending:
        return sortByName(data, false);
      case sortOrderConstants.descending:
        return sortByName(data, true);
      default:
        return filterAgain ? filterUsers(data) : data;  //When filterAgain is true, data is sorted back to original order
    }
  }

  const sortClickHandler = (order) => {
    const newOrder = order === sortOrder ? sortOrderConstants.none : order;
    const sortedUsers = sortUsers(filteredUsers, newOrder, true);
    setSortOrder(newOrder);
    setFilteredUsers(sortedUsers);
  }

  const searchHandler = () => {
    const newFilteredUsers = filterUsers();
    const sortedUsers = sortUsers(newFilteredUsers, sortOrder, false);
    setFilteredUsers(sortedUsers);
    setCurrentPage(DEFAULT_PAGE);
    setTotalPages(Math.max(DEFAULT_TOTAL_PAGES, Math.ceil(newFilteredUsers.length / PAGE_CAPACITY)));
  };
  
  // Filter when ENTER key is pressed
  const searchKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  }

  const fetchUsers = useCallback(async () => {
    try {
      setApiState(apiStatusConstants.inProgress);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      if (!data || data.length === 0) throw new Error("No users found");

      setUsers(data);
      setFilteredUsers(data);
      setTotalPages(Math.ceil(data.length / PAGE_CAPACITY));
      setApiState(apiStatusConstants.success);
    } catch (err) {
      setUsers([]);
      setFilteredUsers([]);
      setTotalPages(DEFAULT_TOTAL_PAGES);
      setApiState(apiStatusConstants.failure);
      setError(`${err.message}. Click here to try again.`);
    } finally {
      setCurrentPage(DEFAULT_PAGE);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const renderLoader = () => (
    <Row>
    <FlexCol xs={12} className="d-flex justify-content">
      <IconContainer theme={theme}>
        <Spinner animation="border" role="status" />
      </IconContainer>
    </FlexCol>
    </Row>
  );

  const renderNoUsers = () => (
    <Row>
    <FlexCol xs={12}>
      <Title theme={theme}>No users found!</Title>
    </FlexCol>
    <FlexCol xs={12}>
      <Text theme={theme}>Try searching for other users</Text>
    </FlexCol>
    </Row>
  );

  const renderUsers = () => {
    const currentPageUsers = filteredUsers.slice((currentPage - 1) * PAGE_CAPACITY, currentPage * PAGE_CAPACITY);
    return (
    <>
    <Row>
      {currentPageUsers.length === 0
        ? renderNoUsers()
        : currentPageUsers.map((user) => <UserCard key={user.id} user={user} />)
      }
    </Row>
      {totalPages>1 && (<Row><FlexCol xs={12}><PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} /></FlexCol></Row>)}
    </>
  )};

  const renderError = () => (
    <Row>
    <FlexCol>
      <Text theme={theme}>{error}</Text>
      <IconContainer theme={theme} isclickable="true">
        <FontAwesomeIcon icon={faRotateRight} size="lg" onClick={fetchUsers} />
      </IconContainer>
    </FlexCol>
    </Row>
  );

  const renderContent = () => {
    switch (apiState) {
      case apiStatusConstants.success:
        return renderUsers();
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.failure:
        return renderError();
      default:
        return null;
    }
  };

  return (
    <Background theme={theme}>
      <Wrapper>
        <ThemeIconContainer
          onClick={handleThemeChange}
          theme={theme}
          isclickable="true"
        >
          <FontAwesomeIcon
            icon={theme === "dark" ? faSun : faMoon}
            size="lg"
            className="d-block d-md-none"
          />
          <FontAwesomeIcon
            icon={theme === "dark" ? faSun : faMoon}
            size="2x"
            className="d-none d-md-block"
          />
        </ThemeIconContainer>

        <Title theme={theme} className="w-75 w-md-100">
          Welcome! Here are your users
        </Title>
        <Container>
          <Row>
            <Col className="d-flex align-items-center mb-3 mb-md-4">
              <SearchContainer theme={theme}>
                <SearchInput
                  type="search"
                  placeholder="Search users"
                  onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={searchKeyDownHandler}
                  value={searchInput}
                  theme={theme}
                />
                <IconContainer
                  onClick={searchHandler}
                  theme={theme}
                  isclickable="true"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </IconContainer>
              </SearchContainer>
              <IconContainer
                onClick={() => sortClickHandler(sortOrderConstants.ascending)}
                theme={theme}
                isclickable="true"
              >
                <FontAwesomeIcon icon={faArrowDownAZ} size="lg" />
              </IconContainer>
              <IconContainer
                onClick={() => sortClickHandler(sortOrderConstants.descending)}
                theme={theme}
                isclickable="true"
              >
                <FontAwesomeIcon icon={faArrowUpZA} size="lg" />
              </IconContainer>
            </Col>
          </Row>
          {renderContent()}
        </Container>
      </Wrapper>
    </Background>
  );
};

export default Home;
