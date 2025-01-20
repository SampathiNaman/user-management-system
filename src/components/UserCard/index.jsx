import PropTypes from 'prop-types';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  UserCard,
  DetailContainer,
  CardTitle,
  CardText,
} from "./styledComponents";
import ThemeContext from "../../context/ThemeContext";
import { colors } from "../../styles/theme";

const UserDetail = (props) => {
  const { user } = props;
  const { id, name, email, address } = user;

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleCardClick = () => {
    navigate(`/user/${id}`);
  };

  return (
    <Col
      xs={12}
      md={6}
      xl={4}
      className="d-flex justify-content-center align-items-center"
    >
      <UserCard theme={theme} onClick={handleCardClick}>
        <CardTitle theme={theme}>{name}</CardTitle>
        <DetailContainer>
          <FontAwesomeIcon
            icon={faEnvelope}
            size="lg"
            color={
              theme === "dark" ? colors.secondaryDark : colors.secondaryLight
            }
          />
          <CardText theme={theme}>{email}</CardText>
        </DetailContainer>
        <DetailContainer>
          <FontAwesomeIcon
            icon={faLocationDot}
            size="lg"
            color={
              theme === "dark" ? colors.secondaryDark : colors.secondaryLight
            }
          />
          <CardText theme={theme}>{address.city}</CardText>
        </DetailContainer>
      </UserCard>
    </Col>
  );
};

UserDetail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default UserDetail;
