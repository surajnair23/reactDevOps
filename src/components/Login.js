import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';

export class Login extends Component {
    constructor(){
      super();
      this.state = {
        email:null,
        pwd:"",
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleRoute = this.handleRoute.bind(this);
    }

    componentWillMount(){
      this.props.handleLogout();
    }

    handleClick(){
      const pwd = encodeURIComponent(this.state.pwd);
      var me=this;
      const url="/login?email="+this.state.email+"&psw="+pwd;
      fetch(url,{
      method: "GET"})
      .then(response => response.json())
      .then(function(data){
        return data.email;
      })
      .then(function(emails){
        if(emails != null){
          me.props.handleLogin(emails);
          me.props.history.push({
            pathname: '/home',
            state: { email:emails }
        });
        }else{
          alert("Please enter the correct password!!");
        }
      })
      .catch(error=>console.log(error));
    }
    handleRoute(){
      this.props.history.push("/register");
    }

    render() {
    return(
      <Container fluid="lg">
        <Jumbotron fluid style={{backgroundImage: 'url("https://cdn.vox-cdn.com/thumbor/BSHSENmkOeTcuCzWso2TMXwp7ok=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/66560568/acastro_181016_1777_music_0001.0.jpg")'}}>
        <h1 style={{ color: 'white' }}>Music Recommender</h1>
        </Jumbotron>
        <Container fluid="lg">
        <Col md={4}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({email:e.target.value})}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => this.setState({pwd:e.target.value}) }/>
          </Form.Group>
          <Button variant="dark" onClick={this.handleClick}>Sign in</Button>
          <Button variant="info" onClick={this.handleRoute} style={{margin:'10px'}}>Sign Up</Button>
        </Form>
        </Col>
      </Container>
      </Container>
    );
    }
  }

  export default withRouter(Login);