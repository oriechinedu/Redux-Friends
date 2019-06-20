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

  deleteFriend = (id) => {

  }
  render() {
    return (
      <React.Fragment>
      {this.props.isLoading && <Spinner />}
      <FriendsContainer>
        <FriendsWrapper>
          {this.props.friends &&
            this.props.friends.map(friend => (
              <Friend
                key={friend.id}
                friend={friend}
                deleteFriend={this.deleteFriend}
              />
            ))}
        </FriendsWrapper>
      </FriendsContainer>
      </React.Fragment>
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
