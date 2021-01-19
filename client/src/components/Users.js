import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';

function Users() {
  const [state, setstate] = useState([]);
  const [msg, setmsg] = useState('')

  useEffect(() => {
      axios.get('http://localhost:4000/api/users/')
      .then((res) => {
        console.log(res.data);
        setstate(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleDelete = (id) =>{
    axios.delete("http://localhost:4000/api/users/" + id)
    .then((res) => {
      console.log(res.data);
      setmsg(`${id} is deleted successfully`);
    }) 
    .catch((err) => console.log(err));
    window.location = '/users'
  }  

  return (
    <Row className="mt-5">
      <Col lg={3} md={2} sm={1} xs={1}></Col>
      <Col lg={6} md={8} sm={10} xs={10}>
        <ListGroup>
          <ListGroup.Item variant="primary">
            <Row className="col-headers">
              <Col>Name</Col>
              <Col>Email</Col>
              <Col>Actions</Col>
            </Row>
          </ListGroup.Item>

          {state.map((item, ind) => (
            <ListGroup.Item key={ind} variant="light">
              <Row>
                <Col>{item.name}</Col>
                <Col>{item.email}</Col>
                <Col>
                  <Button 
                    variant="info"
                    size="sm"
                    as={Link}
                    to={"/single-user/" + item._id}
                  >
                    View
                  </Button>
                  <Button 
                    variant="info"
                    size="sm"
                    // as={Link}
                    // to={"/single-user/" + item._id}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))} 
        </ListGroup>
      </Col>
      <Col lg={3} md={2} sm={1} xs={1}></Col>
    </Row>
  );
}

export default Users;
