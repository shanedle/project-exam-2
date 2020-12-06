import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BASE_URL, headers } from "../../../constants/api";

import { IconContext } from "react-icons";
import { MdArrowBack } from "react-icons/md";

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);

    const url = BASE_URL + "establishments";

    const options = { headers };

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                // handle error
                if (json.error) {
                    setHotels([]);
                    setError(json.message);
                } else {
                    setHotels(json);
                }
            })
            .catch((error) => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin | Hotel</title>
            </Helmet>

            <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                <NavLink to="/admin/" exact className="nav-link"><MdArrowBack /> Back to Admin Dashboard</NavLink>
            </IconContext.Provider >

            <div className="text-center my-3">
                <h2>Hotel List</h2>
                <p>Click name to edit hotel.</p>
            </div>

            {error && <div className="error">{error}</div>}
            <ul>
                {hotels.map((hotel) => {
                    return (
                        <li key={hotel.id}>
                            <NavLink to={`/admin/hotels/edit/${hotel.id}`}>{hotel.name}</NavLink>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default Hotels;
