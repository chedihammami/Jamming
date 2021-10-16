import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'; 
import {SearchResults} from '../SearchResults/SearchResults'; 
import {Playlist} from '../Playlist/Playlist' ;
import React from 'react';
import {spotify} from '../../util/Spotify.js';
import Swal from 'sweetalert2';
export class App extends React.Component {
  constructor(props)
    {
       super(props); 
       this.state = { SearchResults : [] , 
                      playListName: 'New PlayList' , 
                      playListTracks : [] 
      } ; 
      this.addTracks = this.addTracks.bind(this) ; 
      this.removeTracks = this.removeTracks.bind(this); 
      this.changeName = this.changeName.bind(this); 
      this.savePlayList = this.savePlayList.bind(this); 
      this.search = this.search.bind(this); 
    } 
    componentDidMount()
    { 
       spotify.getAccessToken();  
    }

    addTracks(track) 
    { 
        let arr = this.state.playListTracks; 
          let i = 0 ; 
         while ( i < arr.length ) 
         { 
           if (track.id === arr[i].id)
           {
              break; 
           } 
           i++ ; 
         }
      if( i === arr.length)
       { 
          arr.push(track); 
          this.setState({
            playListTracks: arr  
         });
       }else 
        window.alert("track already exist in playlist"); 
       
    }
    removeTracks(track)
    {
      let arr = this.state.playListTracks;  
       let i = 0 ; 
        while ( i < arr.length)
        {
           if ( track.id === arr[i].id)
            break; 
            i++ ; 
        }
         if ( i !== arr.length) 
          arr.splice(i,1); 
        this.setState({
            playListTracks: arr 
        });  
    }
      changeName(name) 
      { 
        if (name) 
         {
            this.setState({
               playListName: name
            })
         }
      }
       async search(searchTerm)
      { 
        let result = await spotify.search(searchTerm); 
        let tracks = await result.json() ;
         if ( tracks['tracks'] )
         {
            let searchedTracks = tracks['tracks'].items.map(track => 
            {
                return { id: track.id , name: track.name , artist: track.artists[0].name , album: track.album.name , uri: track.uri  }
            }  
            ); 
            this.setState({ 
              SearchResults : searchedTracks 
            })
         }else 
          {
             this.setState({
                SearchResults : []
             })
          } 
      }
     async savePlayList() 
      { 
        let promiseUserId = await spotify.getUserID() ; 
        let ObjectUserId = await promiseUserId.json() ; 
        let userId = ObjectUserId.id ; 
        let promisePlayList = await spotify.createPlayList(userId,this.state.playListName); 
        let playList = await promisePlayList.json() ; 
        const playListId = playList.id; 
        const uris = this.state.playListTracks.map(track => 
          { 
             return track.uri ; 
          })

        let promisedtracktoPlaylist = await spotify.saveTrackstoPlayList(playListId,uris); 
        let adddedTrackToPlaylist = await promisedtracktoPlaylist.json(); 
           if ( adddedTrackToPlaylist) {
                    Swal.fire({
                  icon: 'success',
                  text: `Playlist ${this.state.playListName} added successfully`
                }) } else 
                 {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Problem occured connecting to Spotify`
                  })
                 }
      }

   render() 
      {
          return (
            <div>
              <h1>Ja<span className="highlight">mmm</span>ing</h1>
              <div className="App">
                  <SearchBar   onSearch={this.search}  />
                <div className="App-playlist">
                  <SearchResults searchResult={this.state.SearchResults} onAdd={this.addTracks}/>
                  <Playlist  onSave={this.savePlayList} playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTracks} changeName={this.changeName}/>
                </div>
              </div>
            </div>
          );
      } 
}


