import React from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdHotel, MdAddCircle, MdEmail, MdAssignment } from "react-icons/md";

function Dashboard() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin | Dashboard</title>
            </Helmet>


            <div className="text-center my-3">
                <h2>Admin Dashboard</h2>
            </div>

            <NavLink to="/admin/hotels">
                <Button className="btn btn-secondary my-3" block>
                    <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                        <MdHotel /> Hotels
                        </IconContext.Provider >
                </Button>
            </NavLink>
            <NavLink to="/admin/hotels/add">

                <Button className="btn btn-secondary my-3" block>
                    <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                        <MdAddCircle /> Add Hotel
                        </IconContext.Provider >
                </Button>
            </NavLink>

            <NavLink to="/admin/messages">
                <Button className="btn btn-secondary my-3" block>
                    <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                        <MdEmail /> Mail
                        </IconContext.Provider >
                </Button>
            </NavLink>

            <NavLink to="/admin/enquiries">
                <Button className="btn btn-secondary my-3" block>
                    <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                        <MdAssignment /> Enquiries
                        </IconContext.Provider >
                </Button>
            </NavLink>
        </>
    );
}

export default Dashboard;
