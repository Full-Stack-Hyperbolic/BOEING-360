import React, { useState } from 'react';
import '../styles/LiveCam.css';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import POITable from '../components/PoiTable';
import { Video, Image } from 'kaleidoscopejs';
import L, { marker } from 'leaflet';

var lat = 47.667477;
var long = -117.409321;
var markers = {};
var onMap = {};
var radius;
var pois;
var circle;
var group;
var map;
var interval;

function MyComponent(){
  map = useMap();
  for (var i = 0; i < pois.length; i++) {
    var poi = pois[i];
    if (onMap[poi.id] === undefined) {
      onMap[poi.id] = false;
    }
    if (markers[poi.id] === undefined) {
      markers[poi.id] = L.marker(poi.latlng).bindPopup('<b>Location</b><br>' + poi.name);
    }
  }
  return null;
}

function OldMap(){
  //NOTE: Leaflet marker does not function correctly on Safari/Edge browsers. Use chrome
  for (var i = 0; i < pois.length; i++) {
    var poi = pois[i];
    if (onMap[poi.id] === undefined) {
      onMap[poi.id] = false;
    }
    if (markers[poi.id] === undefined) {
      markers[poi.id] = L.marker(poi.latlng).bindPopup('<b>Location</b><br>' + poi.name);
    }
  }
  return null;
}

export default function LiveCamera() {
  const [isClicked, setClicked] = useState(true);
  const [btnText, setBtnText] = useState('Demo');
  pois = useSelector(state => state.pois);

  const [passedPois, setPassedPois] = useState(pois);

  // Slider value state
  radius = 240

  function restartSim() {
    clearInterval(interval);
    // radius = sliderValue
    long = -117.409321;
    runSim();
  }
  
  function runSim() {
    //radius = sliderValue
    interval = setInterval(update, 1000);
  }
  
  function update() {
    if (long > -117.396437) {
      clearInterval(interval);
      return;
    }
    long += 0.00025;
    if (map.hasLayer(circle)) {
      circle.remove();
    }
    circle = L.circle([lat, long], {
      color: 'red',
      radius: radius,
    }).addTo(map);
    check_pois();
  }
  
  function check_pois(){
    // group = L.featureGroup().addTo(map).on('click', groupClick);
    const updated_pois = [];
    for (var i = 0; i < pois.length; i++) {
      var poi = pois[i];
      var dist = map.distance(poi.latlng, circle.getLatLng());
      var inSide = dist < circle.getRadius();
      if (!inSide) {
        if (onMap[poi.id] === true) {
          onMap[poi.id] = false;
        }
        markers[poi.id].remove();
      }else{
        if (onMap[poi.id] === false) {
          onMap[poi.id] = true;
          markers[poi.id].addTo(map);
        }
        updated_pois.push(poi);
      }
    }
    setPassedPois(updated_pois);
  }

  var viewer = new Video({ source: 'testVideo.MP4', containerId: '#target' });

  console.log('pois', pois);

  // Live-Stream / Demo Button
  const handleClick = () => {
    setClicked(!isClicked);
    changeBtnText();
    runSim();
  };

  const changeBtnText = () => {
    if (isClicked) {
      setBtnText('Live-Stream');
    } else {
      setBtnText('Demo');
    }
  };
  return (
    <div>
      <div id='mapid' style={{ marginTop: '14rem', display: 'none'}}>
        <MapContainer center={[lat, long]} zoom={14}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {!map ? (
            <MyComponent />
            ): (
            <OldMap />
          )}
        </MapContainer>
      </div>
      <Container className='LiveCam__container'>
        <h1 style={{ textAlign: 'center' }}>Live-360</h1>

        <Row>
          <Col className='col-center'>
            <p>
              <font size='+3'>Dynamic POI Table</font>
            </p>{' '}
            <POITable pois={passedPois} />
          </Col>
          <Col className='col-center'>
            {isClicked ? (
              <div>
                <p>
                  <font size='+3'>Live Stream</font>
                </p>
                <iframe
                  src='http://192.168.0.42:9001/'
                  frameBorder='1'
                  style={{ width: '675px', height: '375px' }}
                  title='Live-360-stream'
                ></iframe>
              </div>
            ) : (
              <div>
                <p>
                  <center>Demo</center>
                </p>
                <div id='target' className='demo-demo'>
                  {/* {viewer.render()} */}

                  <div className='video-container'>
                    <div className='video-foreground'>
                      <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/XeRz8vXFrGI?autoplay=1&controls=0&modestbranding=1&rel=0&showtitle=0'
                        title='360-Demo'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        showInfo={0}
                        controls={0}
                        modestbranding
                        autoplay={true}
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className='col-center'>
            <Button onClick={handleClick}>{btnText}</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
