import React from "react";
import Layout from "./components/layout/Layout";
import Footer from "./components/layout/Footer";
import './styles/style.scss';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="App">
          <Layout />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
