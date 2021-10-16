import React from 'react' ; 
import './TrackList.css' ; 
import {Track} from '../Track/Track';
export class TrackList extends React.Component{
     

     render() 
     { 
          return (
            
            <div className="TrackList">
                  {this.props.tracks.map(element => {return  <Track onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} key={element.id+"3s"} id={element.id} uri={element.uri} name={element.name} artist={element.artist} album={element.album}/>} )}
             </div>
          ) ; 
     }
}