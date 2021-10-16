import React from 'react' ; 
import "./Track.css";

export class Track extends React.Component{
    constructor(props)
    {
       super(props); 
       this.interactTrack = this.interactTrack.bind(this); 
    }
    renderAction() 
    {
         if (this.props.isRemoval) 
          return '-'; 
          return '+' ; 
    }
    interactTrack()
    { 
      if ( this.props.isRemoval)
      this.props.onRemove({id: this.props.id, name:this.props.name , album:this.props.album , artist:this.props.artist,uri:this.props.uri});
      else 
       this.props.onAdd({id: this.props.id, name:this.props.name , album:this.props.album , artist:this.props.artist,uri:this.props.uri}); 
      
    }
     render() 
     {
          return (
            <div className="Track">
            <div className="Track-information">
              <h3>{this.props.name}</h3>
              <p>{this.props.artist} | {this.props.album}</p>
            </div>
            <button className="Track-action" onClick={this.interactTrack}> {this.renderAction()} </button>
          </div>
          ) ; 
     }
}