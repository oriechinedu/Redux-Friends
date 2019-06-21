import React from "react";
import styled from "styled-components";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from 'react-redux'
import { login } from '../../../store/actions'
import { Redirect } from 'react-router-dom'

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
    username: '',
    password: ''
};
class Login extends React.Component {
  state =  {
    ...initialState
  }
  inputChangeHandler = ({ target }) => {
    const targetValue = target.value;
    const targetName = target.name;
    this.setState(prevState => ({
      ...prevState,
        [targetName]: targetValue
    })
    );
  };
  submitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state
    if (username && password) {
      this.props.login(username, password);
      this.setState(prevState => ({
        ...initialState 
      }));
    }
  };

  render() {
    return (
      <React.Fragment>
       { this.props.isLoggedIn && <Redirect to="/friends" /> }
      <FormWrapper>
        {this.props.isLoading && <Spinner />}
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="username"
            onChange={this.inputChangeHandler}
            placeholder="Username"
            value={this.state.username}
          />
          <input
            type="password"
            name="password"
            onChange={this.inputChangeHandler}
            placeholder="Password"
            value={this.state.password}
          />
          <button>Login</button>
        </form>
      </FormWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    isLoggedIn: localStorage.getItem('token') || null
  }
}
export default connect(mapStateToProps, {login })(Login);
  

