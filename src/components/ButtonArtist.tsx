import * as React from "react";
import './ButtonArtist.css'

export interface ButtonArtistProps {
    artistID: string,
    artistName: string,
    active: boolean,
    deleteFunction: Function,
    toggleFunction: Function
}
export interface ButtonArtistState {
    artistID: string,
    artistName: string
    active: boolean,
}

export interface ButtonArtist extends React.Component<ButtonArtistProps, ButtonArtistState> {
    deleteFunction: Function,
    toggleFunction: Function
}

export class ButtonArtist extends React.Component<ButtonArtistProps, ButtonArtistState> {
    constructor(props:any) {
        super(props);
        this.state = {
            artistID: this.props.artistID,
            artistName: this.props.artistName,
            active: this.props.active,
        }
        
        this.deleteFunction = this.props.deleteFunction
        this.toggleFunction = this.props.toggleFunction
    }

    UNSAFE_componentWillReceiveProps(nextProps:ButtonArtistProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <div onClick={e => {if (e.currentTarget.className.indexOf("button-artist") != -1) this.toggleFunction(this.state.artistID)}} className={(this.state.active) ? "button-artist active noselect" : "button-artist inactive noselect"}>{this.state.artistName}<i onClick={e => {if (e.currentTarget.className.indexOf("close") != -1) this.deleteFunction(this.state.artistID);}} className="icon close" /></div>
        )
    }
}