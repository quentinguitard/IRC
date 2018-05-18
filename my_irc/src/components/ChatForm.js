import React, { Component } from "react";
import io from "socket.io-client";

const socketUrl = "http://localhost:4000/";

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            name: "",
            channels: "general"
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
        event.preventDefault();
        const socket = this.props.socket;

        let arg = this.state.message.split(" ");

        if (arg[0] == "/join") {
            socket.emit("unsubscribe", this.state.channels);
            this.setState({ channels: arg[1] });
            socket.emit("subscribe", arg[1]);
        } else if (arg[0] == "/leave") {
            console.log(this.state.channels);
            socket.emit("unsubscribe", this.state.channels);
            this.setState({ channels: "general" });
        } else {
            socket.emit(
                "message",
                this.state.message,
                this.state.name,
                this.state.channels
            );
        }

        console.log(this.state.channels);
        this.setState({ message: "" });
        return false;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Nickname:
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChangeName}
                        />
                    </label>

                    <label>
                        Message:
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.message}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <input type="submit" value="Submit" className="btn btn-dark" />
            </form>
        );
    }
}
