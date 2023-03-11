import {Container, Col, Row} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import CardWeather from "./CardWeather";
import Next5Days from "./Next5Days";
import Form from 'react-bootstrap/Form';



    
const Gallery = () => {  

  const dispatch = useDispatch()
  const search = useSelector((search)=> search.search)


  const handleChange = (e) => {
    console.log("change", e)
      
  } 
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch ({type: "CITY", payload: search})  
  }

  
    return (
    <Container className="p-5">
      <Row className="d-flex justify-content-center my-4">
         <Form className="w-50"  onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
          <Form.Control type="search" placeholder="Inserisci la città" /* value={} */ onChange={ (e)=> handleChange (dispatch({type: "SEARCH", payload: e.target.value}))}/>
          </Form.Group>
          </Form>
      </Row>   

      <Container className="d-flex flex-column justify-content-center align-item-center m-0 p-0">
        <CardWeather md={6}/> 
        <Next5Days md={6}/>
      </Container>  

    </Container>

    )
}

export default Gallery;