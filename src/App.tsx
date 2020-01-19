import * as React from "react";

import { Header } from './components/Header'
import { Body } from './components/Body'
import { DeezerPlugin } from './components/DeezerPlugin'
import { DeezerProps } from './constants'

export interface AppProps { }
export interface AppState {
    toRun: DeezerProps,
    display: string,
    artistSelected: string
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props:any) {
        super(props);
        this.state = {
            toRun: {id: "0", type: "tracks"},
            display: "fil",
            artistSelected: "-1"
        }
        if (!localStorage.getItem("mystars")) localStorage.setItem("mystars", "")
    }

    resetDisplay = () => {
        this.setState({display: "fil", artistSelected: "-1"});
    }

    setDisplay = (display:string, artistSelected:string) => {
        this.setState({display, artistSelected});
    }

    updateToRun = (toRun:DeezerProps) => {
        this.setState({toRun});
    }

    render() {
        return (
            <div>
                <Header resetDisplay={this.resetDisplay} />
                <Body display={this.state.display} artistSelected={this.state.artistSelected} updateToRun={this.updateToRun} setDisplay={this.setDisplay}/>
                <DeezerPlugin toRun={this.state.toRun} />
            </div>
        )
    }
}