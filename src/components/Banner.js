import { Button, Col, Row } from "react-bootstrap";

export default function Banner({ isError }) {
    if (isError) {
      return (
        <Row>
          <Col className='p-5'>
            <h1>Page Not Found</h1>
            <p>Go back to the <a href="/">homepage</a></p>
          </Col>
        </Row>
      );
      
    }

    return (
      <Row>
        <Col className='p-5'>
          <h1>Welcome Audio Asia</h1>
            <h4 className="p-5">Purchase your favorite gears now!</h4>
        </Col>
      </Row>
    );
  }

