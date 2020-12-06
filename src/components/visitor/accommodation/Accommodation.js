import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Spinner } from "react-bootstrap";
import { BASE_URL, headers } from "../../../constants/api";
import AccommodationItem from "./AccommodationItem";
import Search from "./Search";

const Accommodation = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [filteredAccommodations, setFilteredAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = BASE_URL + 'establishments';
    const options = { headers };

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                setAccommodations(json)
                setFilteredAccommodations(json);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Search
    const filterAccommodation = (e) => {
        const searchValue = e.target.value.toLowerCase();

        const filteredArray = accommodations.filter((specificAccommodation) => {
            const lowerCaseName = specificAccommodation.name.toLowerCase();

            if (lowerCaseName.startsWith(searchValue)) {
                return true;
            }
            return false;
        });
        setFilteredAccommodations(filteredArray);
    }
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
                <title>Holidaze | Accommodation</title>
            </Helmet>

            <Search handleSearch={filterAccommodation} />
            <Row>
                {filteredAccommodations.map(accommodation => {
                    const { id, image, name, price } = accommodation;
                    return (
                        <Col sm={6} md={4} lg={3} key={id}>
                            <AccommodationItem
                                id={id}
                                image={image}
                                name={name}
                                price={price}
                            />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}

export default Accommodation;