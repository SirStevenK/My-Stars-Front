import * as React from "react";
import './Artist.css'

interface ArtistInfo {
    id: string,
    name: string,
    picture: string
    nb_fan: string
    nb_album: string
}

interface AlbumInfo {
    id: string,
    title: string,
    cover: string
}

export interface ArtistProps {
    artist: string,
    updateToRun: Function
}
export interface ArtistState {
    artistID: string,
    artistInfo: ArtistInfo,
    typeSearch: string,
    startDate: string,
    endDate: string,
    searchAlbum: boolean,
    listAlbum: AlbumInfo[]
}

export interface Artist extends React.Component<ArtistProps, ArtistState> {
    updateToRun: Function
}

export class Artist extends React.Component<ArtistProps, ArtistState> {
    constructor(props:any) {
        super(props);
        this.state = {
            artistID: this.props.artist,
            artistInfo: null,
            typeSearch: "album",
            startDate: "",
            endDate: "",
            searchAlbum: false,
            listAlbum: null
        }
        
        this.updateToRun = this.props.updateToRun;

        this.getArtist(this.props.artist);
    }

    getArtist = (query:string) => {
        fetch("http://localhost:3000/getArtist?query=" + query, {method: "GET"})
        .then(async (res) => {
            let content = await res.json();
            if (content.data != -1) this.setState({artistInfo: content.data});
        });
    }

    toggleAddArtist = (id:string) => {
        let mystars_string = localStorage.getItem("mystars")
        
        let mystars:string[];
        if (mystars_string == "") mystars = [];
        else mystars = mystars_string.split(",");
        
        let index_artist = mystars.findIndex((e) => e == id)
        if (index_artist == -1) {
            mystars.push(id);
        }
        else {
            mystars.splice(index_artist, 1)
        }
        localStorage.setItem("mystars", mystars.join(","));
        this.setState({});
    }
    
    isSelectedArtist = (id:string) => {
        let mystars = localStorage.getItem("mystars").split(",");
        if (mystars.find((e) => e == id)) return true
        else return false;
    }

    resetSearchAlbum = () => {
        this.setState({listAlbum: null, searchAlbum: false});
    }

    searchAlbum = () => {
        let { artistID, startDate, endDate, typeSearch } = this.state;
        this.setState({searchAlbum: true}, () => {
            fetch("http://localhost:3000/getAlbumArtist?artist=" + artistID + "&start=" + startDate + "&end=" + endDate + "&type=" + typeSearch, {method: "GET"})
            .then(async (res) => {
                let content = await res.json();
                if (content.data != -1) this.setState({listAlbum: content.data, searchAlbum: false});
            });
        });
    }

    setTypeSearch = (typeSearch:string) => {
        this.setState({typeSearch})
    }

    render() {
        if (this.state.artistInfo == null) return <p>Recherche de l'artiste en cours</p>
        else if (this.state.searchAlbum == true) return <p>Recherche des albums</p>
        else if (this.state.listAlbum != null) return (
            <div id="artist">
                <div className="section">
                    <div onClick={() => this.resetSearchAlbum()} className="back-button">Refaire une recherche</div>
                    <p className="section-title">Liste des {(this.state.typeSearch == "album") ? "albums" : (this.state.typeSearch == "ep") ? "EP" : "singles"} de {this.state.artistInfo.name}</p>
                    {this.state.listAlbum.map((album) => <div onClick={() => this.updateToRun({id: album.id, type: "album"})} className="album-box"><img src={album.cover}></img>{album.title}</div>)}
                </div>
            </div>
        );
        else {
            let artist = this.state.artistInfo;
            let selected = this.isSelectedArtist(artist.id);
            return (
                <div id="artist">
                    <div className="section">
                        <div className="top-info">
                            <img src={artist.picture}/>
                            <p className="title">{artist.name}</p>
                            <i onClick={() => this.toggleAddArtist(artist.id)} className={(selected) ? "heart icon selected" : "heart icon outline"}/>
                        </div>
                    </div>
                    <div className="section">
                        <p className="section-title">Type</p>
                        <div>
                            <div onClick={() => this.setTypeSearch("album")} className={(this.state.typeSearch == "album") ? "type-search-button selected" : "type-search-button unselected"}>Album</div>
                            <div onClick={() => this.setTypeSearch("ep")} className={(this.state.typeSearch == "ep") ? "type-search-button selected" : "type-search-button unselected"}>EP</div>
                            <div onClick={() => this.setTypeSearch("single")} className={(this.state.typeSearch == "single") ? "type-search-button selected" : "type-search-button unselected"}>Single</div>
                        </div>
                    </div>
                    <div className="section">
                        <p className="section-title">Période</p>
                        <div className="periode-row">
                            <div className="periode-box">
                                <p>Début</p>
                                <input type="date" value={this.state.startDate} onChange={(e:React.ChangeEvent<HTMLInputElement>) => this.setState({startDate: e.target.value}) }/>
                            </div>
                            <div className="periode-box">
                                <p>Fin</p>
                                <input type="date" value={this.state.endDate} onChange={(e:React.ChangeEvent<HTMLInputElement>) => this.setState({endDate: e.target.value}) }/>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="submit-button" onClick={() => this.searchAlbum()}>Valider</div>
                    </div>
                </div>
            )
        }
    }
}