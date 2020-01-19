import * as React from "react";
import './Body.css'

import { Fil } from './Fil'
import { Artist } from './Artist'

export interface BodyProps {
    display: string,
    artistSelected: string,
    updateToRun: Function,
    setDisplay: Function
}
export interface BodyState {
    display: string,
    artistSelected: string
}

export interface Body extends React.Component<BodyProps, BodyState> {
    updateToRun: Function,
    setDisplay: Function
}

export class Body extends React.Component<BodyProps, BodyState> {
    constructor(props:any) {
        super(props);
        this.state = {
            display: this.props.display,
            artistSelected: this.props.artistSelected
        }
        this.updateToRun = this.props.updateToRun;
        this.setDisplay = this.props.setDisplay;
    }

    UNSAFE_componentWillReceiveProps(nextProps:BodyProps) {
        this.setState(nextProps);
    }

    displayContent = () => {
        let {display} = this.state;

        if (display == "fil") return <Fil updateToRun={this.updateToRun} link={this.updateDisplay}/>
        else if (display == "artist") return <Artist updateToRun={this.updateToRun} artist={this.state.artistSelected}/>
    }

    updateDisplay = (display: string, value: string) => {
        if (display == "fil") this.setDisplay("fil", "-1");
        else if (display == "artist") this.setDisplay("artist", value);
    }


    render() {
        return (
            <div id="body">
                {this.displayContent()}
                <p className="body-bottom">My Stars - Handmade ❤️</p>
            </div>
        )
    }
}