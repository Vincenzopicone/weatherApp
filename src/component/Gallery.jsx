import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CardWeather from "./CardWeather";
import Next5Days from "./Next5Days";
import Form from "react-bootstrap/Form";

const Gallery = () => {
  const dispatch = useDispatch();
  const search = useSelector((search) => search.search);

  const handleChange = (e) => {
    console.log("change", e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "CITY", payload: search });
  };

  return (
    <Container fluid>
      <Row className="sticky-top text-center bg-light">
        <h1>WeatherApp</h1>
      </Row>
      <Row className="d-flex justify-content-center my-4">
        <Col
          xs={12}
          sm={9}
          md={6}
          lg={4}
          className="d-flex justify-content-center"
        >
          <Form className="w-50" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                className="rounded-pill text-center"
                type="search"
                placeholder="Inserisci la città"
                onChange={(e) =>
                  handleChange(
                    dispatch({ type: "SEARCH", payload: e.target.value })
                  )
                }
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="d-flex flex-column justify-content-center align-items-center m-0 p-0">
        <CardWeather />
      </Row>
      <Row className="d-flex flex-wrap justify-content-center align-items-center text-center text-light">
        <h2 className="my-3">Prossimi 5 giorni</h2>
        <Next5Days />
      </Row>
    </Container>
  );
};

export default Gallery;
