/* import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";

function CardWeather() {
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
      <Row md={8} className="flex-column align-items-start mb-4">
        <Col md={12} className="text-center">
          <h1 className="cardWeather bg-secondary text-light p-2">
            <strong>
              {currentCityName}, {currentCountry.country}{" "}
            </strong>
          </h1>
        </Col>
        <Col md={12} className="text-center uppercase">
          <h3 className="cardWeather  bg-secondary text-light description px-3 m-3">
            {currentWeather.description}{" "}
            <span>
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                alt="CurrentIcon"
              />
            </span>
          </h3>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center w-100">
        <Col
          md={3}
          className="cardWeather  p-2 mx-3 my-2 d-flex flex-column justify-content-center align-items-center"
        >
          <h5> Attuale:</h5>
          <h3>{currentTemp?.temp?.toPrecision(2)}°</h3>
          <h5> Percepita:</h5>
          <h3>{currentTemp?.feels_like?.toPrecision(2)}°</h3>
        </Col>
        <Col
          md={3}
          className="cardWeather  p-2  mx-3 my-2  d-flex flex-column justify-content-center align-items-center"
        >
          <h5> Min:</h5>
          <h3>{currentTemp?.temp_min?.toPrecision(2)}°</h3>
          <h5> MAX:</h5>
          <h3>{currentTemp?.temp_max?.toPrecision(2)}°</h3>
        </Col>
        <Col
          md={3}
          className="cardWeather  p-2 mx-3 my-2  d-flex flex-column justify-content-center align-items-center"
        >
          <h5> Vento</h5>
          <h3>{currentWind.speed} km/h</h3>
          <h5> Pressione</h5>
          <h3>{currentTemp.pressure} hPa</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default CardWeather;
