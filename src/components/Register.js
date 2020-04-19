import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



export class Register extends Component {
    constructor(props){
      super(props);
      this.state={
        validated:false,
        valid:false,
        fname:"",
        lname:"",
        email:"",
        age:0,
        city:"",
        state:"",
        zip:"",
        aboutme:"",
        psw:"",
        error:"",
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleRoute = this.handleRoute.bind(this);

    }

    handleClick(event){
      var me = this;
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      this.setState({validated:true})
      const user = {
        fname:this.state.fname,
        lname:this.state.lname,
        password:this.state.psw,
        email:this.state.email,
        gender:this.select1.value,
        age:this.state.age,
        city:this.state.city,
        state:this.select2.value,
        zip:this.state.zip,
        aboutMe:this.state.aboutme
      }
      event.preventDefault();
      fetch("/newUser",{method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)})
      .then(
        response=>{
          if(response.ok){
              me.props.handleLogin(user.email);
              window.location="/home";
          }
          else{
            alert("Email has been registered");
        }}
        );
    }
    
    handleRoute(){
      this.props.history.push("/");
    }

    render() {
      return (
        <Container fluid="lg">
        <Jumbotron fluid style={{backgroundImage: 'url("https://cdn.vox-cdn.com/thumbor/BSHSENmkOeTcuCzWso2TMXwp7ok=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/66560568/acastro_181016_1777_music_0001.0.jpg")'}}>
        <h1 style={{ color: 'white' }}>Music Recommender</h1>
        <h6  style={{ color: 'white' }}>Come be a part of the journey!!!</h6>
        </Jumbotron>
        <Container fluid="lg">
        {this.state.error}
        <Col md={8}>
          <Form validated={this.state.validated} onSubmit={this.handleClick.bind(this)}>
          <Form.Row>
            <Col>
              <Form.Control placeholder="First name" required onChange={e => this.setState({fname:e.target.value})}/>
            </Col>
            <Col>
              <Form.Control placeholder="Last name" required onChange={e => this.setState({lname:e.target.value})}/>
            </Col>
          </Form.Row><br/>
          <Form.Row>
              <Col>
                <Form.Control type="password" placeholder="password" required onChange={e => this.setState({psw:e.target.value})}/>
              </Col>
          </Form.Row><br/>
          <Form.Row>
            <Col md={10}>
              <Form.Control type="email" placeholder="Enter Email" required onChange={e => this.setState({email:e.target.value})}/>
            </Col>
            <Col md={2}>
              <Form.Control type="number" placeholder="Age" required onChange={e => this.setState({age:e.target.value})}/>
            </Col>
            <Col md={3}><br/>
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" required ref={select => { this.select1 = select }}>
              <option>Female</option>
              <option>Male</option>
              <option>Others</option>
              </Form.Control>
            </Col>
          </Form.Row><br/>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control  placeholder="City" required onChange={e => this.setState({city:e.target.value})}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select" required ref={select => { this.select2 = select }}
              placeholder="State...">
                <option disabled>State....</option>
                <option>Massachusetts</option>
                <option>New York</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Control type="number" placeholder="Zip" required onChange={e => this.setState({zip:e.target.value})}/>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea"  placeholder="About me" rows="3" maxLength="300" onChange={e=>this.setState({aboutme:e.target.value})}/>
            <Form.Text className="text-muted">
              Maximum of 300 characters
            </Form.Text>
          </Form.Group>
          <Form.Row>
            <Col md="4">
              <Button variant="dark" onClick={this.handleRoute} style={{margin:'10px'}}>Back</Button>
              <Button type="submit">Register</Button>
            </Col>
          </Form.Row>
          </Form>
        </Col>
        </Container>
        </Container>
      );
    }
  }
export default withRouter(Register);
