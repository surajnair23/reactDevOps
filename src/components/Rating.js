
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navigate from "./Navigate";
import Col from "react-bootstrap/Col";
import { Row } from 'react-bootstrap';

export class Rating extends Component {
  constructor(props){
    super(props);
    this.state={
      email:null,
      ratings:[],
      musiclist:[]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    if(localStorage.getItem("email")){
      this.setState({email:localStorage.getItem("email")},console.log("r:Get email from app component "+localStorage.getItem("email")));}
    else{
      this.props.history.push('/unauthorized');
    }
    
  }

  componentDidMount(){
    const url = '/getUserRatings?email='+this.state.email;
    fetch(url, { 
            method: 'GET'
        })
        .then(
            (response)=>{ 
              if(response.ok){
                response.json().then(data=>{
                  this.setState({
                    ratings: data.map(item => ({
                        song_name: item.song_name,
                        song_artist: item.song_artist,
                        rate:item.rate,
                        comment:item.comment
                    })
                    )})
                })
              }
             }
          );
  }

  handleClick(){
    const url = '/getRecommendByUserName?email='+this.state.email;
    fetch(url, { 
            method: 'GET' 
        }) 
        .then(
          (response)=>{ return response.json() }
        )
        .then(data=>{
            if(data!==null){
                this.setState({
                    musiclist: data.map(item => ({
                        song_name: item.song_name,
                        song_artist: item.song_artist,
                        strength:item.strength
                    })
                    )})
        }
    }
        )
        .catch(e=>alert("No recommendation for you as of now"));
  }
  render() {
    return (
        <Container fluid>
        <Navigate/>
        <Container fluid="lg">
        <Container fluid="lg">
        <Col md={4}>
        <Form>
          <Row>
          <Form.Group controlId="recommendation">
            <Form.Label style={{fontSize: '27px',fontWeight: 'bold'}}>Recommend music based on other users' and your ratings</Form.Label>
          </Form.Group>
          <Button variant="dark" onClick={this.handleClick}>Get recommendation</Button>
          </Row>
        </Form>
        </Col><br/><br/><br/>
        <Container fluid="lg">
        {(this.state.musiclist.map(( listValue, index ) => {
          return (
            <Row key={index}>
              <Col key={index} >Num {index+1} suggested music: </Col>
              <Col >
               Song name : {listValue.song_name}
               </Col >
               <Col >
               Song artist : {listValue.song_artist}
               </Col>
               <Col >
               Recommended strength : {listValue.strength}
               </Col ><br/><br/>
            </Row>
          );
        }))}
        </Container>
      </Container>
          <Container fluid="lg"><br/><br/>
            {this.state.ratings.map(( listValue, index ) => {
          return (
            <Row key={index}>
               <Col style={{ color: 'red' }}>
               Song name : {listValue.song_name}
               </Col >
               <Col style={{ color: 'red' }}>
               Song artist : {listValue.song_artist}
               </Col>
               <Col style={{ color: 'blue' }}>
               Your rating : {listValue.rate}
               </Col>
               <Col style={{ color: 'blue' }}>
               Your comment : {listValue.comment}
               </Col><br/>
            </Row>
          );
        })}
          </Container>
        </Container>
        </Container>
      );
  }
}

  export default withRouter(Rating);