import * as React from "react";
import './DeezerPlugin.css'
import { DeezerProps } from '../constants'

interface DeezerPluginProps {
    toRun: DeezerProps
}

interface DeezerPluginState {
    toRun: DeezerProps,
    autoplay: boolean
}

export class DeezerPlugin extends React.Component<DeezerPluginProps, DeezerPluginState> {
    constructor(props:any) {
        super(props);
        this.state = {
            toRun: this.props.toRun,
            autoplay: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: DeezerPluginProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <div id="deezer-plugin">
                <iframe  scrolling="no" frameBorder={0} allowTransparency={true} src={"https://www.deezer.com/plugins/player?format=square&autoplay=" + "false" + "&playlist=false&width=300&height=300&color=ff0000&layout=dark&size=medium&type=" + this.state.toRun.type +  "&id=" + this.state.toRun.id + "&app_id=1"} width="300" height="300"></iframe>
            </div>
        )
    }
}