import React from "react";
import {Grid, IconButton, TextField} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

export interface SharedState {
    time: number;
    weight: number;
}

interface JudgeState extends SharedState {
    lifting: boolean;
}

export class Judge extends React.Component<any, JudgeState> {

    constructor(props: any) {
        super(props);
        this.state = { time: 60, weight: 0, lifting: false };
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
        this.setState({lifting: true});
        fetch('http://localhost:5000/startTimer', this.getPostOptions()).finally(() => {
            this.setState({lifting: false});
        })
    }

    postValidity(valid: boolean) {
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valid })
        }
        fetch('http://localhost:5000/valid', postOptions)
    }

    clearData(){
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('http://localhost:5000/clear', postOptions)
    }

    render() {
        return (
            <Grid
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ backgroundColor: 'white' }}>
                <Grid container item justifyContent="center" spacing={2}>
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
                        <IconButton aria-label="Save" onClick={() => this.postValues()}>
                            <SaveIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="center" spacing={2} style={{marginTop: 50}}>
                    <Grid item>
                        <IconButton
                            color="info"
                            aria-label="Save"
                            onClick={() => this.startTimer()}
                            disabled={this.state.lifting}>
                            <PlayCircleFilledIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="success" onClick={() => (this.postValidity(true))}>
                            <ThumbUpIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="error" onClick={() => (this.postValidity(false))}>
                            <ThumbDown fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="info" onClick={() => (this.clearData())}>
                            <CancelPresentationIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}