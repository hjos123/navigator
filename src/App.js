import { useState, useRef } from 'react'
import { Container,Row,Col, ListGroup,Button, Badge, Card, Spinner  } from 'react-bootstrap';
import MapView from './MapView';
import Acontecimientos from './Acontecimientos.json';
import './App.css';

const App = () => {
  const [ historia, setHistoria ] = useState([]);
  const [ coordenadas, setCoordenadas ] = useState([]);
  const [ indexCord, setIndexCord ] = useState(0);
  const [ btnCheck, setBtnCheck ] = useState(false);

  const arrayRef = useRef(historia);
  arrayRef.current = historia;

  const countRef = useRef(indexCord);
  countRef.current = indexCord;

  const coordenaRef = useRef(coordenadas);
  coordenaRef.current = coordenadas;

  const setInitFun = () => {
    if( countRef.current === 0 )
          {
            setHistoria([]);
            setCoordenadas([]);
          }

        setBtnCheck(true);

      setTimeout( () => {

        if( Acontecimientos[countRef.current].coordenadas ){
            setCoordenadas([ ...coordenaRef.current, Acontecimientos[countRef.current].coordenadas ]);
          }

        setHistoria([ ...arrayRef.current, Acontecimientos[countRef.current] ]); 
        setIndexCord(countRef.current + 1);

        if( countRef.current <  Acontecimientos.length )
          setInitFun();
        else{
            setBtnCheck(false);
            setIndexCord(0);
          }
      }, 1200 );
  }

  return(
    <Container fluid={'xxl'}>
      <Row>
        <Col md={9}> <MapView lugares={coordenadas} /> </Col>
        <Col md={3}>
          <Card style={{ width: '100%' }}>
            <Card.Header style={{ background: 'rgba(0,0,0,0.1)' }}>
              <h4 style={{ fontWeight: 'bold' }}> Simulacion de Geolocalizacion </h4>
            </Card.Header>
            <ListGroup variant="flush">
              {
                historia.length > 0 && historia.map( (elemnt, i) => <ListGroup.Item key={i} className="showDiv">
                        <Badge bg="primary">{elemnt.fecha}</Badge> <br />
                        <small className="ms-4">{elemnt.comentario}</small>
                </ListGroup.Item> )
              }
            </ListGroup>
            <Button disabled={btnCheck} onClick={() => setInitFun()}> 
              { btnCheck ? <Spinner animation="border" /> : 'Iniciar' }
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
