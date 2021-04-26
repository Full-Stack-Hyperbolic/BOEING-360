import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import homeImage from '../media/homeImg.png';
import Button from 'react-bootstrap/Button';

import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <Container fluid>
      <Row className='Home__mainRow'>
        <Col xxs={4} className='Home__left'>
          <h1 className='home__title'>See the world like never before.</h1>
          <Row className='btn__row'>
            <Link to='/live-cam'>
              <Button variant='light'>Live-360</Button>{' '}
            </Link>
            <Link to='/live-map'>
              <Button variant='outline-light'>Live-Map</Button>{' '}
            </Link>
          </Row>
        </Col>
        <Col className='Home__right'>
          <img className='homeImg' src={homeImage} alt='' />
        </Col>
      </Row>
    </Container>
  );
}
