import React from "react";
import {Container} from "@mui/material";
import {io} from 'socket.io-client';
import {SharedState} from "./Judge";
import {ValidityImg} from "./ValidityImg";
import Paper from "@mui/material/Paper";

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
            <Container maxWidth="xl" sx={{ textAlign: 'center', fontSize: '115px'}}>
                <Paper style={{padding: '10px', marginBottom: '50px'}}>
                    {this.state.weight} kg
                </Paper>
                <Paper hidden={this.state.valid !== undefined}>
                    {this.state.time} Sek
                </Paper>
                <Paper hidden={this.state.valid === undefined}>
                    <ValidityImg valid={this.state.valid} />
                </Paper>

            </Container>


        )
    }
}