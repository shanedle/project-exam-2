import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container, Spinner, Col, Row, Jumbotron } from "react-bootstrap";
import { BASE_URL, headers } from "../../../constants/api";
import Featured from "./Featured";

// Typeahead
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Carousel
import Slider from "react-slick";
import Carousel from "./Carousel";
import { CarouselSettings } from "../../../constants/CarouselSettings";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Home = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = BASE_URL + 'establishments';
    const options = { headers };
    const history = useHistory();

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                setAccommodations(json)
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
                <title>Holidaze</title>
            </Helmet>

            <Jumbotron fluid className="jumbotron">
                <Container fluid className="text-white text-center">
                    <h1 className="display-3">Holidaze</h1>
                    <p className="lead pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </Container>
                <Container>
                    <Typeahead className="my-3"
                        id="typeahead"
                        labelKey="name"
                        onChange={selectedAccommodation => history.push(`/accommodation/${selectedAccommodation[0].id}`)}
                        options={accommodations}
                        placeholder="Search our accommodations..."
                    />
                </Container>
            </Jumbotron>
            <Container>
                <h5 className="h5 text-center my-3">Our Accommodations</h5>

                <Slider {...CarouselSettings} className="mt-2 mb-5">
                    {accommodations.map((accommodation) => {
                        const { id, image, name, price } = accommodation;
                        return (
                            <Carousel
                                key={id}
                                id={id}
                                image={image}
                                name={name}
                                price={price}
                            />
                        );
                    })}
                </Slider>

                <h5 className="h5 text-center my-3">Featured Accommodations</h5>

                <Row className="d-flex justify-content-lg-center mb-2">
                    {accommodations.slice(0, 3).map((accommodation) => {
                        const { id, image, name, price } = accommodation;
                        return (
                            <Col sm={6} md={4} key={id}>
                                <Featured
                                    id={id}
                                    name={name}
                                    image={image}
                                    price={price}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Home;
