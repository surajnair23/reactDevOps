import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navigate from "./Navigate";


export class Playlist extends Component {

  constructor(props){
    super(props);
    this.state={
      email:null,
      mood: null,
      playlist: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
  
    const url = '/getPlaylist?key='+this.state.mood;
    fetch(url, { 
            method: 'GET' 
        }) 
        .then(
          (response)=>{if(response.ok){
            response.json().then(data=>{
              this.setState({
                playlist: data.map(item => ({
                    title: item.playlist_name,
                    url: item.playlist_url
                })
                )})
            })
          }}
        );

        
  }

  componentWillMount() {
    if(localStorage.getItem("email")){
      this.setState({email:localStorage.getItem("email")},console.log("p:Get email from app component "+localStorage.getItem("email")));}
    else{
      this.props.history.push('/unauthorized');
    }
  }

  componentDidMount(){
    console.log("playlist email "+ this.state.email);
  }

  render() {
    return (
        <Container fluid>
        <Navigate/>
        <Container fluid="lg">
          <Container fluid="lg">
          <Row>
          <Col md={5}>
            <Form validated >
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>What's your mood today?</Form.Label>
                <Form.Control as="textarea" required rows="1" onChange={e=>this.setState({mood:e.target.value})}/>
              </Form.Group>
              <Button variant="success" onClick={this.handleClick}>Let's find you your playlist..</Button>
            </Form>
          </Col>
          </Row><br/>
          {this.state.playlist.map(( listValue, index ) => {
          return (
            <Row key={index}>
              <Col key={index} md={5}>Num {index+1} suggested {listValue.title} playlist: </Col>
              <Col key={listValue.url} md={5}>
              <li><a href={listValue.url} target="_blank">{listValue.url}</a></li>
              </Col>
            </Row>
          );
        })}
          </Container>
        </Container>
        </Container>
      );
  } 
}
  export default withRouter(Playlist);