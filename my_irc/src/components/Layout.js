import React, { Component } from "react";
import io from "socket.io-client";

const socketUrl = "http://localhost:4000/";

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null
        };
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.initSocket();
    }

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on("connect", () => {
            console.log("connected");
        });
        this.setState({ socket });
        console.log(socket);
    };
    render() {
        const { title } = this.props;
        return (
            <div className="container">
                <h1> {title} </h1>
            </div>
        );
    }
}
