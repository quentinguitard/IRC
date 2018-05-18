import React, { Component } from "react";
import ChatForm from "./ChatForm";
import ChatOutput from "./ChatOutput";

import socketIo from "socket.io-client";

const socketUrl = "http://localhost:4000/";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: socketIo(socketUrl)
        };
    }
    componentDidMount() {
        this.initSocket();
        console.log(this.state.socket, "didmount");
    }

    initSocket = () => {
        this.state.socket.on("connect", () => {
            console.log("connected");
        });
        console.log(this.state.socket, "Layout Socket");
    };
    render() {
        const { title } = this.props;
        return (
            <div className="container">
                <h1> {title} </h1>
                <ChatOutput socket={this.state.socket} />

                <ChatForm socket={this.state.socket} />
            </div>
        );
    }
}
