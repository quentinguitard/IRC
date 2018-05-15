import React, { Component } from "react";
import io from "socket.io-client";

const socketUrl = "http://localhost:4000/";

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            name: "",
            channels: []
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleSubmit(event) {
        const socket = io(socketUrl);

        let arg = this.state.message.split(" ");

        socket.emit("message", this.state.message, this.state.name);
        console.log(event);
        event.preventDefault();
        this.setState({ message: "" });
        return false;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Nickname:
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                    />
                </label>
                <label>
                    Message:
                    <input
                        type="text"
                        value={this.state.message}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
