import React from "react";
import {Container} from "@mui/material";
import {io} from 'socket.io-client';
import {SharedState} from "./Judge";
import {ValidityImg} from "./ValidityImg";

const socket = io("ws://localhost:5000", {

})

interface DisplayState extends SharedState {
    valid: boolean | undefined,
}

export class Display extends React.Component<any, DisplayState> {

    constructor(props: any) {
        super(props);
        this.state = { time: 60, weight: 0, valid: undefined };
    }

    componentDidMount() {
        socket.on('VALUES', (message) => {
            this.setState(message);
        })

        socket.on('VALID', (valid) => {
            this.setState({valid});
        })

        socket.on('TIME', (time) => {
            this.setState({time});
        })
    }

    render() {

        return (
            <Container maxWidth="xl" sx={{ textAlign: 'center', fontSize: '115px', backgroundColor: 'white' }}>
                <div>{this.state.weight} kg</div>
                <div>{this.state.time} Sek</div>
                <ValidityImg valid={this.state.valid} />
            </Container>


        )
    }
}