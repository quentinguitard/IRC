import React, { Component } from "react";
import Layout from "./components/Layout";

class App extends Component {
    render() {
        return (
            <div className="container border pt-4 mt-5 mb-5 pb-5">
                <Layout title="My IRC" />
            </div>
        );
    }
}

export default App;
