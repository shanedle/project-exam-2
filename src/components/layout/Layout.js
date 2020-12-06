import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { AuthContextProvider } from "../../context/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";
import Home from "../visitor/home/Home";
import Accommodation from "../visitor/accommodation/Accommodation";
import Detail from "../visitor/accommodation/Detail";
import Contact from "../visitor/contact/Contact";
import Login from "../auth/Login";
import Hotels from "../admin/hotel/Hotels";
import AddHotel from "../admin/hotel/AddHotel";
import EditHotel from "../admin/hotel/EditHotel";
import Messages from '../admin/message/Messages';
import Enquiries from '../admin/enquiry/Enquiries';
import Dashboard from "../admin/Dashboard";
import NavigationBar from "./NavigationBar";

function Layout() {
    return (
        <AuthContextProvider>
            <Router>
                <NavigationBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Container>
                        <Route path="/accommodation" exact component={Accommodation} />
                        <Route path="/accommodation/:id" exact component={Detail} />
                        <Route path="/contact" exact component={Contact} />

                        <Route path="/login" exact component={Login} />
                        <ProtectedRoute path="/admin" exact component={Dashboard} />
                        <ProtectedRoute path="/admin/hotels" exact component={Hotels} />
                        <ProtectedRoute path="/admin/hotels/add" exact component={AddHotel} />
                        <ProtectedRoute path="/admin/hotels/edit/:id" exact component={EditHotel} />
                        <ProtectedRoute path="/admin/messages" exact component={Messages} />
                        <ProtectedRoute path="/admin/enquiries" exact component={Enquiries} />
                    </Container>
                    <Redirect to="/" />
                </Switch>

            </Router>
        </AuthContextProvider>
    );
}

export default Layout;