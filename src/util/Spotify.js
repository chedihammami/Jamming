const CLIENT_ID = 'c9e1239b113849e299383a1174dc3316' ; 
const REDIRECT_URI = 'http://localhost:3000' ; 
export const spotify = { 
  ACCESS_TOKEN : '' , 
   getAccessToken()
   { 
       if (this.ACCESS_TOKEN) 
       return this.ACCESS_TOKEN; 
    const regex = /access_token=([^&]*)/ ; 
    let access = window.location.href.match(regex); 
    if (access) 
    {
       this.ACCESS_TOKEN = access[0].substring(access[0].indexOf('=')+1); 
       let expiration_time = window.location.href.match(/expires_in=([^&]*)/); 
       expiration_time = expiration_time[0].substring(expiration_time[0].indexOf('=')+1) ; 
       window.setTimeout(() => this.ACCESS_TOKEN = '', expiration_time * 1000);
       window.history.pushState('Access Token', null, '/');

    }else 
     {
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`); 
     }
   }, 
   search: function(term) 
   { 
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: 'Bearer ' + this.ACCESS_TOKEN }}) ; 
         
   }, 
   getUserID: function() 
   { 
      return fetch('https://api.spotify.com/v1/me' , { headers: { Authorization: 'Bearer ' + this.ACCESS_TOKEN }}) ;     
   } , 
   createPlayList: function(userId,playListname) 
   { 
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists` , { headers: { Authorization: 'Bearer ' + this.ACCESS_TOKEN } , method: "POST" ,  body: JSON.stringify({
         name: playListname
    })  }  )
   }, 
   saveTrackstoPlayList: function(playListId,uris) 
   { 
     return fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks`, { headers: { Authorization: 'Bearer ' + this.ACCESS_TOKEN } , method: "POST" ,  body: JSON.stringify({
        uris: uris
   })  } )
   } 
  
}
