import React from "react";

interface Props {
    valid: boolean
    liftDone: boolean
}

export class ValidityImg extends React.Component<Props> {



    render() {
        const {valid, liftDone} = this.props;

        const redCircle = <img style={{width: 180}}  src="/img/red-circle-icon.png" alt=""/>
        const greenCircle = <img style={{width: 180}}  src="/img/green-circle-icon.png" alt=""/>

        if(liftDone) {
            if (valid) {
                return [greenCircle, greenCircle, greenCircle];
            } else {
                return [redCircle, redCircle, redCircle];
            }
        }

    }
}