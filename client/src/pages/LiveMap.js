import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import L, { marker } from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Col, Row, Container } from 'react-bootstrap';
import POITable from '../components/PoiTable';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import '../styles/LiveMap.css';

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

export default function LiveMap() {
  pois = useSelector(state => state.pois);

  const [passedPois, setPassedPois] = useState(pois);

  // Slider value state
  const [sliderValue, setSliderValue] = useState(240);
  radius = sliderValue

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
  
  // function groupClick(event) {
  //   console.log('clicked on', event);
  // }
  
  function drawRadius(){
    if (map.hasLayer(circle)) {
        circle.remove();
    }
    circle = L.circle([lat, long], {
        color: 'red',
        radius: radius
    }).addTo(map)
  }
  
  function update() {
    if (long > -117.396437) {
      clearInterval(interval);
      return;
    }
    long += 0.00035;
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

  function valuetext(value) {
    return `${value} meters`;
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    event.preventDefault();
    drawRadius();
  };

  return (
    <>
      <Container className='live-map-container'>
        <h1 style={{ textAlign: 'center' }}>Live Map</h1>
        <Row>
          <Col>
            <p>
              <font size='+3'>Dynamic POI Table</font>
            </p>{' '}
            <POITable pois={passedPois} />
          </Col>
          <Col>
            <div id='mapid' style={{ marginTop: '14rem' }}>
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
            <Row style={{ marginTop: '0rem' }}>
              <div id='Button' className='mapControls'>
                <Button
                  className='simBtn1'
                  variant='contained'
                  color='primary'
                  onClick={restartSim}
                >
                  Run Sim
                </Button>

                <p style={{ marginTop: '1rem' }}>
                  Search Radius: {sliderValue} meters
                </p>

                <Slider
                  defaultValue={240}
                  getAriaValueText={valuetext}
                  aria-labelledby='discrete-slider-small-steps'
                  step={20}
                  marks
                  min={200}
                  max={600}
                  valueLabelDisplay='auto'
                  style={{ marginTop: '2rem' }}
                  value={typeof sliderValue === 'number' ? sliderValue : 0}
                  onChange={handleSliderChange}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
