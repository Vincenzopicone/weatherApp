import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import moment from "moment";

function CardWeather() {
  moment("it");
  const dispatch = useDispatch();
  const currentCityName = useSelector((city) => city.name);
  const currentCountry = useSelector((country) => country.country);
  const currentWeather = useSelector((current) => current.weather);
  const currentTemp = useSelector((current) => current.temp);
  const currentWind = useSelector((current) => current.wind);
  const key = process.env.REACT_APP_KEY;

  const getCity = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&appid=${key}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "CITY", payload: data.name });
        dispatch({ type: "COUNTRY", payload: data.sys });
        dispatch({ type: "WEATHER", payload: data.weather[0] });
        dispatch({ type: "TEMP", payload: data.main });
        dispatch({ type: "WIND", payload: data.wind });
      } else {
        alert("La città non esiste");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCity();
  }, [currentCityName]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center p-0">
      <Row className="my-2">
        <Col xs={6} className="text-center">
          <h2 className="cardWeather fw-bold text-uppercase text-light p-2">
            {currentCityName}, {currentCountry.country}{" "}
          </h2>
          <h6 className="text-light text-uppercase fst-italic">
            {currentWeather.description} <span></span>
          </h6>
        </Col>
        <Col
          xs={3}
          className="text-light text-uppercase text-center d-flex align-items-center"
        >
          <h2>{currentTemp?.temp?.toPrecision(2)}°</h2>
        </Col>
        <Col xs={3}>
          <img
            className="img-fluid"
            src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt="CurrentIcon"
          />
        </Col>
      </Row>
      <Row className="text-light text-center">
        <Col xs={6}>
          <div> MIN: {currentTemp?.temp_min?.toPrecision(2)}°</div>
        </Col>
        <Col xs={6}>
          <div> MAX: {currentTemp?.temp_max?.toPrecision(2)}°</div>
        </Col>
      </Row>
      {/* <Row className="text-light">
        <Col xs={6} className="text-end">
          <h5> ALBA:{moment.utc(currentCountry.sunrise).format("HH:mm")}</h5>
        </Col>
        <Col xs={6}>
          <h5>
            {" "}
            TRAMONTO:
            {moment.utc(parseInt(currentCountry.sunset)).format("HH:mm")}
          </h5>
        </Col>
      </Row> */}
      <Row className="d-flex justify-content-around text-center mt-3 text-light">
        <Col xs={5} className="border border-tertiary rounded py-3 m-1">
          <h5 className=""> Percepita</h5>
          <h3> {currentTemp?.feels_like?.toPrecision(2)}°</h3>
        </Col>
        <Col xs={5} className="border border-tertiary rounded py-3 m-1">
          <h5> Vento</h5>
          <h3>{currentWind.speed} km/h</h3>
        </Col>
        <Col xs={5} className="border border-tertiary rounded py-3 m-1">
          <h5> Pressione</h5>
          <h3>{currentTemp.pressure} hPa</h3>
        </Col>
        <Col xs={5} className="border border-tertiary rounded py-3 m-1">
          <h5> Umidità</h5>
          <h3>{currentTemp.humidity} hPa</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default CardWeather;
