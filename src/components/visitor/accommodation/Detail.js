import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Breadcrumb, Button, Col, Image, Row, Spinner, ResponsiveEmbed } from "react-bootstrap";
import { BASE_URL, headers } from "../../../constants/api";
import Booking from "./Booking";

const Detail = () => {
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    let { id } = useParams();
    const url = BASE_URL + 'establishments/' + id;
    const options = { headers };

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                setDetail(json)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        const spinnerStyle = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        return (
            <div style={spinnerStyle}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{detail.name}</title>
            </Helmet>

            <Breadcrumb>
                <Breadcrumb.Item href="/accommodation">Accommodation</Breadcrumb.Item>
                <Breadcrumb.Item active>{detail.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm={12} md={8} lg={6}>
                    <ResponsiveEmbed aspectRatio="4by3">
                        <Image src={detail.image} />
                    </ResponsiveEmbed>
                </Col>
                <Col className="d-flex flex-column" sm={12} md={4} lg={6}>
                    <div>
                        <h3>{detail.name}</h3>
                        <p>{detail.maxGuests} Max Guests</p>
                        <p>NOK {detail.price} Per Night</p>
                        <div>
                            {detail.selfCatering
                                ? <p>Self Catering.</p>
                                : <p>Non Self Catering.</p>
                            }
                        </div>
                        <p >{detail.description}</p>
                    </div>
                    <Button className="btn btn-primary mt-auto" onClick={() => setModalShow(true)}>Reserve Room</Button>

                </Col>
            </Row>

            <Booking
                id={detail.id}
                name={detail.name}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Detail;