import React from 'react';
import Card from 'react-bootstrap/Card';
import musicIcon from './musicIco.ico';
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import {Button} from 'react-bootstrap';

export default function Billboard(props){

  return(
    <>
    <Card className="text-center">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Billboard_Hot_100_logo.jpg"></Image>
        {props.songs.map((song,index)=>(
        <Row key={index+400} style={{marginLeft:'30px'}}>
            <Card.Img key={index+500} variant="bottom" src={musicIcon} style={{height:'7rem',width:'7rem',marginTop:'2px'}} key={index}></Card.Img>
            <Card.Body key={index+300}>
                <Card.Title key={index} style={{color:"blue"}}>{song[0]}</Card.Title>
                <Card.Title key={index+100}>{song[1]}</Card.Title>
                <Card.Text key={index+200}>{song[2]}</Card.Text>
                <Button variant="primary" onClick={()=>props.handleRating(song[1],song[2])}>Get your rating</Button>
            </Card.Body>
        </Row>
        ))}
    </Card>
    </>
  );
}