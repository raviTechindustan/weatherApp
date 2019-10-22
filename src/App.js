import React, { Component } from 'react';
import './App.css';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

toast.configure();
export default class App extends Component {
  
  state = { 
    city:"",
    country:"",
    values: {}
  }
  
  handleChange= (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value || ""
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { country, city } = this.state;
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${'4163ecffb3c05eb8e1dd96d31899bb1c'}`).then(res => {
    this.setState({
      values: res.data
    })
    toast.success("city found")
  }).catch(err => {
      console.log(err , "err here");
    })
  }
  convert = (value = 0) => {
    let defaults = 273.15;
    if(value){
      let final = (value - defaults) + "°C"
      return final;
    } else {
      return null;
    }
  }

  render() {
    const { values } = this.state;
    const { name = '', weather = [], main= {} } = values;
    const {description = ""} = weather.length ? weather[0] : "";
    const { temp = 0 } = main
    let temperature = this.convert(temp);

    return (
      <div className="App">
        <Container>
          <Row>
            <Col md={6}>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Enter City</Form.Label>
                  <Form.Control type="text" name="city" value={this.state.city} placeholder="Enter city" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Enter Country</Form.Label>
                  <Form.Control type="text" name="country" value={this.state.country} placeholder="Enter Country" onChange={(e) => this.handleChange(e)} />
                </Form.Group>
                <Form.Control type="submit" value="Submit"/>
              </Form>
            </Col>
            <Col md={6}>
              <h2>{name}</h2>
              <h3>{temperature}</h3>
              <h3>{description}</h3>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

