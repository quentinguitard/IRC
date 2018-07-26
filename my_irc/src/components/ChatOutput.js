import React, { Component } from "react";
import io from "socket.io-client";

const socketUrl = "http://localhost:4000/";

export default class ChatOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: []
        };
    }

    componentDidMount() {
        this.handleMessage();
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: "smooth" });
    }

    handleMessage() {
        console.log(this.props, "hola");
        const socket = this.props.socket;
        let self = this;
        socket.on("message", function(msg, name) {
            console.log(msg);
            self.setState({
                output: [
                    ...self.state.output,
                    {
                        message: msg,
                        name: name
                    }
                ]
            });
        });
    }

    render() {
        //const { output } = this.props;
        console.log(this.state.output);
        let count = 0;
        const messages = this.state.output.map(function(output, count) {
            return (
                <p key={output.message + count++}>
                    <strong>{output.name} : </strong>
                    {output.message}
                </p>
            );
        });

        return (
            <div className="chat-output">
                {messages}
                <div
                    ref={el => {
                        this.el = el;
                    }}
                />
            </div>
        );
    }
}
