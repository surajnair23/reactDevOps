import React, { Component } from "react";
import { withRouter} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigate from "./Navigate";
import Billboard from "./Billboard";
import _ from 'lodash';
import { Form,Col,Button} from 'react-bootstrap';
export class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      songList:[],
      error:"no",
      email:null,
      id:1,
      rating:1,
      comment:"a",
      song_name:"",
      song_artist:""
    };
    this.handleRating = this.handleRating.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentWillMount() {

    if(localStorage.getItem("email")){
      let e=localStorage.getItem("email");
      this.setState({email:e},console.log("Home get email from app component "+e));
        fetch('/billboard100', { 
            method: 'POST'
        }) 
        .then(
          (response)=>{ return response.json() }
        )
        .catch(error=>{this.setState({error:error})})
        .then(data=>this.setState({songList:data}));
    }
    else{
      this.props.history.push('/unauthorized');
    }
  }
  componentDidMount() {
  }

  handleRating(name,artist){
    const url = '/getRating2?email='+this.state.email+"&song_name="+name+"&song_artist="+artist;
    fetch(url, { 
            method: 'GET' 
        }) 
        .then(
          (response)=>{ return response.json() }
        )
        .then(data=>{
          if(data===-1){
            alert(" You haven't rated it ");
          }
          else{
            alert(" Your rating is : "+data);
          }
        }
        );
  }

  handleEdit(){
    this.state.songList.forEach((e)=>{
      if(e[0]===this.state.id+"."){
        if (window.confirm('You chose : '+e[1]+' written by '+e[2]+" , click OK to confirm")){
          const url='/newRating1?email='+this.state.email;
    fetch(url, { 
            method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify({comment:this.state.comment,
            rate:this.state.rating,song_name:e[1],song_artist:e[2]}) 
        }) 
        .then(
          (response)=>{ return response.json() }
        );
        }
      }
    }); 
  }
  
  render() {
    
        return (
          <Container fluid>
          <Navigate/>
          <Container fluid="lg">
          <Container>
            <Form>
            <Form.Row>
            <Col>
            <Form.Group as={Col} controlId="idid">
            <Form.Label>Select music id to rate</Form.Label>
            <Form.Control as="select" required onChange={e=>this.setState({id:e.target.value})}>
            { _.range(1, 101).map(value => <option key={value} value={value}>{value}</option>) }
            </Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group as={Col} controlId="rating">
            <Form.Label>Star</Form.Label>
            <Form.Control as="select" required onChange={e=>this.setState({rating:e.target.value})}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </Form.Control>
            </Form.Group>
            </Col>
            </Form.Row>
            <Form.Row>
            <Col>
            <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea"  placeholder="Your comments" rows="2" onChange={e=>this.setState({comment:e.target.value})}/>
            </Form.Group>
            </Col>
            </Form.Row>
            <Form.Row>
            <Col md={5}>
            <Button variant="info" onClick={this.handleEdit} style={{margin:'10px'}}>Submit</Button>
            </Col>
            </Form.Row>
            </Form>
            </Container><br/><br/>
            <Container fluid="lg">
            <Billboard handleRating={this.handleRating}  songs={this.state.songList}/>
            </Container>
          </Container>
          </Container>
        );
  }

}

export default withRouter(Home);