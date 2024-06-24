import React from "react";
import {Button, Container, Grid, IconButton, TextField} from "@mui/material";
import Done from '@mui/icons-material/Done';

export interface JudgeState {
    time: number;
    weight: number;
}

export class Judge extends React.Component<any, JudgeState> {

    constructor(props: any) {
        super(props);
        this.state = { time: 60, weight: 0 };
    }

    getPostOptions() {
        const {time, weight} = this.state;
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ weight, time })
        }
    }

    postValues() {
        fetch('http://localhost:5000/values',  this.getPostOptions())
    }

    startTimer() {
        fetch('http://localhost:5000/startTimer', this.getPostOptions())
    }

    postValidity(valid: boolean) {
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valid })
        }
        fetch('http://localhost:5000/valid', postOptions)
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Grid container item justifyContent="center">
                    <Grid item>
                        <TextField
                            label="Weight"
                            type="number"
                            onChange={(e) => this.setState({ weight: Number(e.target.value) })}
                            id="outlined-basic"
                            variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="number"
                            defaultValue={60}
                            onChange={(e) => this.setState({ time: Number(e.target.value) })}
                            id="outlined-basic"
                            label="Timer"
                            variant="outlined" />
                        <IconButton aria-label="delete" onClick={() => this.postValues()}>
                            <Done />
                        </IconButton>
                    </Grid>
                </Grid>
                <Button variant="contained" color="success" onClick={() => this.startTimer()}>
                    Start
                </Button>
                <Button variant="contained" color="success" onClick={event => (this.postValidity(true))}>
                    Valid
                </Button>
                <Button variant="outlined" color="error" onClick={event => (this.postValidity(false))}>
                    Invalid
                </Button>
            </Container>
        )
    }
}