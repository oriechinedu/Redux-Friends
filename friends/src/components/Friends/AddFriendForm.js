import React from "react";
import styled from "styled-components";
import Spinner from "../UI/Spinner/Spinner";
import axiosWithAuth from "../../axios";
import { connect } from "react-redux";
import { addNewFriend, updateFriend } from "../../store/actions";
import {toastr} from 'react-redux-toastr'


const FormWrapper = styled.div`
  width: 400px;
  padding: 1rem;
  margin: 4rem auto;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  @media (max-width: 500px) {
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input,
    button {
      padding: 0.5rem 1rem;
      margin: 0.5rem auto;
      outline: none;
      border-radius: 6px;
      width: 80%;
      border: 1px solid #ccc;
      font-size: 1.3rem;
      @media (max-width: 500px) {
        width: 100%;
      }
    }
    button {
      cursor: pointer;
      font-weight: 400;
      &:hover {
        background-color: #ccc;
        color: white;
      }
    }
  }
`;

const initialState = {
  form: {
    email: "",
    name: "",
    age: "",
    id: ""
  },
  isUpdating: false
};
const apiUrl = "http://localhost:5000/api/friends";
class FriendForm extends React.Component {
  state = {
    ...initialState
  };

  componentDidMount() {
    if (this.props.match.params.friendId) {
      axiosWithAuth()
        .get(`${apiUrl}/${this.props.match.params.friendId}`)
        .then(res =>
          this.setState(prevState => ({
            ...prevState,
            form: {
              ...res.data
            },
            isUpdating: true
          }))
        );
    }
  }

  updateFriend = payload => {
    this.props
      .updateFriend(this.state.form)
      .then(() => {
        toastr.success('Success', 'Friend updated successfully')
        this.setState(prevState => ({
          ...prevState,
          isLoading: false,
          form: initialState.form,
          isUpdating: false
        }));
        this.props.history.push("/friends");
      })
      .catch(err => {
        toastr.error('Error', this.props.error)
      });
  };
  
  inputChangeHandler = ({ target }) => {
    const targetValue = target.value;
    const targetName = target.name;
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [targetName]: targetValue
      }
    }));
  };
  submitHandler = e => {
    e.preventDefault();
    if (this.state.isUpdating) {
      this.updateFriend(this.state.form);
    } else {
      const { email, age, name } = this.state.form;
      if (email && age && name) {
        this.props
          .addNewFriend({
            name,
            age,
            email
          })
          .then(data => {
            toastr.success('Success', 'Friend added successfully')
            this.props.history.push("/friends");
          })
          .catch(err => {
            toastr.error('Error', this.props.error)
          });
        this.setState(prevState => ({
          ...prevState,
          form: { ...initialState.form }
        }));
      } else {
        toastr.error('Error', 'All fields are Required')
      }
    }
  };
  render() {
    return (
      <FormWrapper>
        {this.props.isLoading && <Spinner />}
        {this.props.error && <p style={{ color: "red" }}>{this.props.error}</p>}
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="name"
            onChange={this.inputChangeHandler}
            placeholder="Name"
            value={this.state.form.name}
          />
          <input
            type="number"
            name="age"
            onChange={this.inputChangeHandler}
            placeholder="Age"
            value={this.state.form.age}
          />
          <input
            type="email"
            name="email"
            onChange={this.inputChangeHandler}
            placeholder="Email"
            value={this.state.form.email}
          />
          <button>{this.state.isUpdating ? "Update" : "Add Friend"}</button>
        </form>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.rootReducer.isLoading,
    error: state.rootReducer.error
  };
};
export default connect(
  mapStateToProps,
  { addNewFriend, updateFriend }
)(FriendForm);
