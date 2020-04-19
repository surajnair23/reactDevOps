import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from "react-router-dom";

export default function Navigate(props){
  return(
    <>
    <Container fluid="lg">
    <Container fluid="lg">
    <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="/home">Music Recommender</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/home">Home</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link to="/playlist">Playlist</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link to="/rating">Rating</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link to="/feedback">Feedback</Link>
        </Nav>
        <Form inline>
        <Nav.Link href="/">Sign Out</Nav.Link>
        </Form>
    </Navbar>
    <Jumbotron fluid style={{backgroundImage: 'url("https://cdn.vox-cdn.com/thumbor/BSHSENmkOeTcuCzWso2TMXwp7ok=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/66560568/acastro_181016_1777_music_0001.0.jpg")'}}>
      <h1 style={{ color: 'white' }}>Music Recommender</h1>
    </Jumbotron>
    </Container>
    </Container>
    </>
  );
}


