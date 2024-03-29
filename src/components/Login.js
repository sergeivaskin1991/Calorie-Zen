import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';
import './styles/Login.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    if (!this.state.username || !this.state.password){
      return;
    }
    auth.authorize(this.state.username, this.state.password)
    .then((data) => {
      if (data.jwt){
        this.setState({email: '', password: ''} ,() => {
        this.props.handleLogin(data.user.ru_cal_goal.calGoal);
        this.props.history.push('/diary');
        })
      }
    })
    .catch(err => console.log(err));
  }
  render(){
    return(
      <div className="login">
        <p className="login__welcome">
          Добро пожаловать!
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <label htmlhtmlFor="username">
            Логин:
          </label>
          <input required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label htmlhtmlFor="password">
            Пароль:
          </label>
          <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <div className="login__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="login__link">Войти</button>
          </div>
        </form>

        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/register" className="signup__link">Зарегистрироваться</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
