import React from "react";
import { Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <div className="main-footer">
      <Container>
        <Row className="justify-content-center text-center">
          <p>
            &copy;{new Date().getFullYear()} Holidaze developed by Shane Le
          </p>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;