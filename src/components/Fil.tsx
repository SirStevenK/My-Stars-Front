import * as React from "react";
import './Fil.css'
import { ButtonArtist } from './ButtonArtist'


interface ArtistChoice {
    id: string,
    name: string,
    picture: string
}

interface ArtistInfo {
    id: string,
    name: string,
    active: boolean
}

interface TrackInfo {
    id: string,
    title: string,
    artistName: string,
    cover: string
}

export interface FilProps {
    link: Function,
    updateToRun: Function
}
export interface FilState {
    searchInput: string,
    listArtistsFound: ArtistChoice[],
    listFavoritesArtists: ArtistInfo[],
    userMix: TrackInfo[]
}

export interface Fil extends React.Component<FilProps, FilState> {
    link: Function,
    updateToRun: Function
}

export class Fil extends React.Component<FilProps, FilState> {
    constructor(props:any) {
        super(props);
        this.state = {
            searchInput: "",
            listArtistsFound: [],
            listFavoritesArtists: [],
            userMix: []
        }
        this.link = this.props.link;
        this.updateToRun = this.props.updateToRun;
        this.getFavoritesArtists(this.getMix);
    }

    getMix = (listFavoritesArtists:ArtistInfo[]) => {
        let query = listFavoritesArtists.filter(e => e.active).map(e => e.id).join(",");
        fetch("http://localhost:3000/getMix?query=" + query, {method: "GET"}).then(async (res) => {
            let content = await res.json();
            this.setState({userMix: content.data});
        });
    }

    updateSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        this.setState({searchInput: value}, () => this.searchArtist(value))
    }

    searchArtist = (query:string) => {
        fetch("http://localhost:3000/searchArtist?query=" + query, {method: "GET"})
        .then(async (res) => {
            let content = await res.json();
            if (query == this.state.searchInput) this.setState({listArtistsFound: content.data});
        });
    }

    getFavoritesArtists = (callback:Function) => {
        let mystars_string = localStorage.getItem("mystars")
        
        fetch("http://localhost:3000/getNameArtist?query=" + mystars_string, {method: "GET"}).then(async (res) => {
            let content = await res.json();
            let listFavoritesArtists = content.data.map((e:any) => {
                return {...e, active: true}
            });
            this.setState({listFavoritesArtists, userMix: []}, callback(listFavoritesArtists));
        });

    }
    
    toggleActiveArtist = (id:string) => {
        let { listFavoritesArtists } = this.state;

        listFavoritesArtists = listFavoritesArtists.map((e) => {
            if (e.id == id) {
                e.active = !e.active;
                return e;
            }
            else return e;
        })

        this.setState({listFavoritesArtists, userMix: []}, () => this.getMix(listFavoritesArtists));
    }

    deleteArtist = (id:string) => {
        let { listFavoritesArtists } = this.state;
        let indexToDelete = listFavoritesArtists.findIndex((e) => e.id == id);
        if (indexToDelete != -1) listFavoritesArtists.splice(indexToDelete, 1);
        localStorage.setItem("mystars", listFavoritesArtists.map((e) => e.id).join(","));
        this.setState({listFavoritesArtists, userMix: []}, () => this.getMix(listFavoritesArtists));
    }
    
    render() {
        return (
            <div id="fil">
                <div className="section">
                    <p className="section-title">Rechercher un artiste</p>
                    <div>
                        <input className="input-text" type="text" placeholder="Entrer le nom d'une musique ou d'un artiste" value={this.state.searchInput} onChange={this.updateSearchInput}/>
                        {this.state.listArtistsFound.slice(0, 5).map((artist) => {
                            return (
                                <div onClick={() => this.link("artist", artist.id)} className="artist-choice" key={artist.id}><img src={artist.picture}/><p>{artist.name}</p></div>
                            )
                        })}
                    </div>
                </div>
                <div className="section">
                    <p className="section-title">Mes Musiciens préférés</p>
                    <div className="list-artist">
                        {this.state.listFavoritesArtists.map((artist) => <ButtonArtist key={artist.id} artistID={artist.id} artistName={artist.name} active={artist.active} toggleFunction={this.toggleActiveArtist} deleteFunction={this.deleteArtist} />)}
                    </div>
                </div>
                <div className="section">
                    <p className="section-title">Mon Mix</p>
                    <div>
                        {this.state.userMix.map(track=>{
                            return (
                                <div className="mix-track">
                                    <div className="image-track">
                                        <img src={track.cover}/>
                                    </div>
                                    <div className="info-track">
                                        <div>
                                            <p>{track.title}</p>
                                            <p>{track.artistName}</p>
                                        </div>
                                        <div className="play-button" onClick={() => this.updateToRun({id: track.id, type: "tracks"})}><i className="play icon"/> Play</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}