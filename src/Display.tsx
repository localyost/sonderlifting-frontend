import React from "react";
import {Container, Grid} from "@mui/material";
import {io} from 'socket.io-client';
import {JudgeState} from "./Judge";
import {ValidityImg} from "./ValidityImg";

const socket = io("ws://localhost:5000", {

})

interface DisplayState extends JudgeState {
    valid: boolean,
    liftDone: boolean;
}

export class Display extends React.Component<any, DisplayState> {

    constructor(props: any) {
        super(props);
        this.state = { time: 60, weight: 0, valid: false, liftDone: false };
    }

    componentDidMount() {
        socket.on('VALUES', (message) => {
            this.setState(message);
        })

        socket.on('TIMER_START', (time) => {
            this.setState({liftDone: false});
            this.startTimer();
        })

        socket.on('TIMER_STOP', () => {
            this.setState({liftDone: true});
            this.stopTimer();
        })
        socket.on('VALID', (valid) => {
            this.setState({valid});
        })
    }

    intervalId: NodeJS.Timer | undefined;


    startTimer() {
        if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.setState({time: this.state.time - 1});
                if(this.state.time <= 0) {
                    this.stopTimer();
                }
            }, 1000);
        }

    }

    stopTimer() {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Grid container item justifyContent="center">
                    <Grid item>
                        Weight: {this.state.weight}
                    </Grid>
                    <Grid item>
                        Time: {this.state.time}
                    </Grid>
                </Grid>
                <ValidityImg valid={this.state.valid} liftDone={this.state.liftDone} />
            </Container>
        )
    }
}