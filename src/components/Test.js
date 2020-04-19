import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navigate from './Navigate';
import {Form} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

export class Test extends Component {

    render() {
    return(
      <Container fluid="lg">
        <Jumbotron fluid style={{backgroundImage: 'url("https://cdn.vox-cdn.com/thumbor/BSHSENmkOeTcuCzWso2TMXwp7ok=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/66560568/acastro_181016_1777_music_0001.0.jpg")'}}>
        <h1 style={{ color: 'white' }}>Music Recommender</h1>
        </Jumbotron>
        <Container fluid="lg">
        <Navigate/>
        <Form.Row>
              <Col>
                <Form.Control type="password" placeholder="password" required onChange={e => this.setState({psw:e.target.value})}/>
              </Col>
          </Form.Row>
      </Container>
      </Container>
    );
    }
  }

  export default withRouter(Test);