import React from 'react' ; 
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList' ; 


export class Playlist extends React.Component{

        constructor(props)
        {
                super(props); 
                this.onChangeName = this.onChangeName.bind(this); 
        }
        onChangeName(e)
        {
           this.props.changeName(e.target.value) ;    
        }
        render() 
        {
             return (
                <div className="Playlist">
                  <input defaultValue={'New Playlist'} onChange={this.onChangeName}/>
                     <TrackList isRemoval={true} tracks={this.props.playListTracks} onRemove={this.props.onRemove}/>
                  <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
               </div>
                 
             ) ; 
        }
     
}