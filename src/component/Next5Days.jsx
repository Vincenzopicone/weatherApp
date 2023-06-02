import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";

function Next5Days() {
  moment("it");
  const dispatch = useDispatch();
  const currentCityName = useSelector((city) => city.name);
  const Next5Days = useSelector((state) => state.next5Days);
  const key = process.env.REACT_APP_KEY;

  const getCity5Days = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&appid=${key}&units=metric`
      );
      if (response.ok) {
        const daily = await response.json();
        dispatch({ type: "NEXT_5_DAYS", payload: daily });
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCity5Days();
  }, [currentCityName]);

  return (
    <Col xs={12}>
      <Row className="justify-content-center text-light">
        {Next5Days &&
          Next5Days.list
            .filter((e, i) => i % 8 === 0)
            .map((day, i) => (
              <Col
                xs={5}
                md={4}
                lg={3}
                xl={2}
                key={`key-${i}`}
                className="border m-1 rounded text-center bg-secondary"
              >
                <div className="text-center">
                  {moment().add(i, "days").format("DD-MM-yyyy")}
                </div>
                <div className="text-center mt-3">
                  <div>{day.main.temp.toFixed(0)} °</div>
                  <div>
                    {" "}
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="CurrentIcon"
                    />
                  </div>
                </div>
                <p className="fw-bold text-uppercase">
                  {day.weather[0].description}
                </p>
              </Col>
            ))}
      </Row>
    </Col>
  );
}
export default Next5Days;
