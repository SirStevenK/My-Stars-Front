import * as React from "react";
import './Header.css'

export interface HeaderProps {
    resetDisplay: Function
}
export interface HeaderState {
}

export interface Header extends React.Component<HeaderProps, HeaderState> {
    resetDisplay: Function
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props:any) {
        super(props);
        this.resetDisplay = this.props.resetDisplay
    }

    render() {
        return (
            <div id="header">
                <a onClick={() => this.resetDisplay()}><img className="header-img" src="/public/images/mystarsTopLogo.png"/></a>
            </div>
        )
    }
}