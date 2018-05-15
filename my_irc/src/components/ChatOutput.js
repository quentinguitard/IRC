import React, { Component } from "react";
import io from "socket.io-client";

const socketUrl = "http://localhost:4000/";

export default class ChatOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { output: [] };
    }

    componentDidMount() {
        this.handleMessage();
    }

    handleMessage() {
        const socket = io(socketUrl);
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
            //console.log(self.state.output);
            // self.setState({
            //     message: msg,
            //     name: name
            // });
        });
    }

    render() {
        //const { output } = this.props;
        console.log(this.state.output);

        const messages = this.state.output.map(function(output) {
            return (
                <p key={output.message}>
                    <strong>{output.name} : </strong>
                    {output.message}
                </p>
            );
        });

        return <div>{messages}</div>;
    }
}
