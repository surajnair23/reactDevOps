
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navigate from "./Navigate";
import Col from "react-bootstrap/Col";

export class Feedback extends Component {
  constructor(props){
    super(props);
    this.state={
      rec: 0,
      comments: null,
      email:null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    if(localStorage.getItem("email")){
      this.setState({email:localStorage.getItem("email")},console.log("f:Get email from app component "+localStorage.getItem("email")));}
    else{
      this.props.history.push('/unauthorized');
    }
  }

  handleClick(){
    fetch('/fetchList', { 
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({rec:this.state.rec,comment:this.state.comments,email:this.state.email}) 
        }) 
        .catch(error=>console.log(error))
        .then(data=>this.props.history.push("/home"));
  }

  render() {
    return (
        <Container fluid>
        <Navigate/>
        <Container fluid="lg">
          <Container fluid="lg">
            <Col md={5}>
            <Form>
              <Form.Group controlId="formBasicRange">
                <Form.Label>How likely are you to recommend our app?</Form.Label>
                <Form.Control type="range"  onChange={e=>this.setState({rec:e.target.value/10})}/>
                <Form.Text className="text-muted">
                  Scale from 0 - 10, Current score: {this.state.rec}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={e=>this.setState({comments:e.target.value})}/>
              </Form.Group>
              <Button variant="dark" onClick={this.handleClick}>Send</Button>
            </Form>
            </Col>
          </Container>
        </Container>
        </Container>
      );
  }
}

  export default withRouter(Feedback);