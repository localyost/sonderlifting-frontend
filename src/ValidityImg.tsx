import React from "react";

interface Props {
    valid: boolean | undefined
}

export class ValidityImg extends React.Component<Props> {

    render() {
        const {valid} = this.props;

        const redCircle = <img style={{width: 180, padding: '5px'}}  src="/img/red-circle-icon.png" alt=""/>
        const greenCircle = <img style={{width: 180, padding: '5px'}}  src="/img/green-circle-icon.png" alt=""/>

        if(valid !== undefined) {
            if (valid) {
                return [greenCircle, greenCircle, greenCircle];
            } else {
                return [redCircle, redCircle, redCircle];
            }
        }

    }
}