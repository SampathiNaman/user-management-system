import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSun,
  faMoon,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { Background, Text, IconContainer } from "../../GlobalStyles";
import {
  Wrapper,
  UserDetailCard,
  CardTitle,
  CardText,
  NavIconContainer,
} from "./styledComponents";
import ThemeContext from "../../context/ThemeContext";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [apiState, setApiState] = useState(apiStatusConstants.initial);
  const [error, setError] = useState("");

  const { theme, handleThemeChange } = useContext(ThemeContext);
  const navigate = useNavigate();

  const backClickHandler = () => {
    navigate(-1);
  };

  const fetchUserData = useCallback(async () => {
    setApiState(apiStatusConstants.inProgress);

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!response.ok) {
      setUser([]);
      setApiState(apiStatusConstants.failure);
      setError("Failed to fetch user details. Click here to try again.");
      return;
    }
    const data = await response.json();
    setUser(data);
    setApiState(apiStatusConstants.success);
    setError("");
  }, [id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const renderUserDetails = () => (
    <Wrapper>
      <CardTitle theme={theme}>{user.name}</CardTitle>
      <UserDetailCard theme={theme}>
        <CardText>
          <strong>Username: </strong> {user.username}
        </CardText>{" "}
        <br />
        <CardText>
          <strong>Email: </strong> {user.email}
        </CardText>{" "}
        <br />
        <CardText>
          <strong>Phone: </strong> {user.phone}
        </CardText>{" "}
        <br />
        <CardText>
          <strong>Website: </strong> {user.website}
        </CardText>{" "}
        <br />
        <CardText>
          <strong>Address: </strong> {user.address.street}, {user.address.suite}
          , {user.address.city}, {user.address.zipcode}
        </CardText>
        <hr />
        <CardText>
          <strong>Company: </strong> {user.company.name}
        </CardText>{" "}
        <br />
        <CardText>
          <strong>Catchphrase: </strong> {user.company.catchPhrase}
        </CardText>{" "}
        <br />
        <CardText>
          <strong>BS: </strong> {user.company.bs}
        </CardText>
      </UserDetailCard>
    </Wrapper>
  );

  const renderLoader = () => (
    <IconContainer theme={theme}>
      <Spinner animation="border" role="status" />
    </IconContainer>
  );

  const renderError = () => (
    <>
      <Text theme={theme}>{error}</Text>
      <IconContainer theme={theme} isclickable="true">
        <FontAwesomeIcon
          icon={faRotateRight}
          size="lg"
          onClick={fetchUserData}
        />
      </IconContainer>
    </>
  );

  const renderContent = () => {
    switch (apiState) {
      case apiStatusConstants.success:
        return renderUserDetails();
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
      <NavIconContainer
        onClick={backClickHandler}
        theme={theme}
        isclickable="true"
        left="20px"
        leftmd="10%"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="lg"
          className="d-block d-md-none"
        />
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2x"
          className="d-none d-md-block"
        />
      </NavIconContainer>
      <NavIconContainer
        onClick={handleThemeChange}
        theme={theme}
        isclickable="true"
        right="20px"
        rightmd="10%"
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
      </NavIconContainer>
      {renderContent()}
    </Background>
  );
};

export default UserDetail;
