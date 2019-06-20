import React from "react";
import styled from "styled-components";
import Friend from "./Friend";
import Spinner from "../UI/Spinner/Spinner";
import { fetchFriends } from '../../store/actions/'
import { connect } from "react-redux";


const FriendsContainer = styled.section`
  width: 800px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin: auto;
  flex-direction: column;
  @media (max-width: 500px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const FriendsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;
class Friends extends React.Component {
  
  componentDidMount() {
    this.props.fetchFriends()
  }
  render() {
    return (
      <FriendsContainer>
        {this.props.isLoading && <Spinner />}
        {this.props.error && (
          <p style={{ color: "red" }}>{this.props.errorMessage}</p>
        )}
        <FriendsWrapper>
          {this.props.friends &&
            this.props.friends.map(friend => (
              <Friend
                key={friend.id}
                friend={friend}
              />
            ))}
        </FriendsWrapper>
      </FriendsContainer>
    );
  }
}
const mapStateTpProps = (state) => {
  return {
    friends: state.friends,
    isLoading: state.isLoading,
    error: state.error,
    isLoggedIn: localStorage.getItem('token') || null
  }
}
export default connect(mapStateTpProps, { fetchFriends} )(Friends)
