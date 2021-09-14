/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
// let lastSongPlayed;
// function playSong(songId) {
//     try{
//     lastSongPlayed.classList.remove("now-playing");
//     }finally{
//     const song=document.getElementById(songId+"song")
//     song.classList.add("now-playing")
//     setTimeout(()=>song.classList.remove("now-playing"),findSong(songId).duration*1000);
//     setTimeout(()=>playSong(player.songs[(player.songs.indexOf(findSong(songId))+1)].id),findSong(songId).duration*1000);
//     lastSongPlayed=song;
//     }
// }

/**
 * Creates a song DOM element based on a song object.
 */
//  function createSongElement({ id, title, album, artist, duration, coverArt }) {
//     const nameEl=createElement("span", [title],["song-name"]);
//     const albumEl=createElement("span",[album],["album-name"])
//     const artistEl = createElement("span", [artist],["artist"]);
//     const durationEl = createElement("span", ["" + secToDur(duration)] ,["duration", "short-duration"], {onclick: `console.log('${duration}')`});
//     const coverImageArtUrl = getSongImage(id);
//     const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});
//     return createElement("div", [nameEl,albumEl,"Artist: ", artistEl, "Duration: ", durationEl, imgEl],["song"],{id:id+"song", onclick: `playSong(${id})` });
//   }

/**
 * Creates a playlist DOM element based on a playlist object.
 */
// function createPlaylistElement({ id, name, songs }) {
//     const nameEl=createElement("span", [name,":"],["playlist-name"]);
//     const quantityEl=createElement("span",[songs.length],["num-of-song"])
//     const attrs = {id:id}
//     return createElement("div", [nameEl,"Number Of Songs:",quantityEl,"Playlist Duration:",secToDur(playlistDuration(id))], ["playlist"],{id:id+"pl"})
// }

// function getSongImage(id){
//     return findSong(id).coverArt
// }

// function secToDur(sec){
//     return((Math.floor(sec/60))<10? "0": "")+`${Math.floor(sec/60)}:` +((sec%60)<10? "0": "")+`${sec%60}`
// }
// function findSong(id,mPlayer=player){ 
//     for(let song of mPlayer.songs){
//       if (song.id===id){
//         return song;
//       }
//     }
//     throw "ID not found";
// }
// function findPlaylist(id,mPlayer=player){ 
//     for(let Playlist of mPlayer.playlists){
//       if (Playlist.id===id){
//         return Playlist;
//       }
//     }
//     throw "ID not found";
// }
  
// function playlistDuration(id) {
//     let plDuration=0;
//     for(let songID of findPlaylist(id).songs){
//       plDuration+=(findSong(songID).duration);
//     }
//     return (plDuration);          
// }
/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
//  function createElement(tagName, children = [], classes = [], attributes = {}) {
//     const el = document.createElement(tagName);
//     // Children
//     for(const child of children) {
//         el.append(child);
//     }
//     // Classes
//     for(const cls of classes) {
//       el.classList.add(cls);
//     }
//     // Attributes
//     for (const attr in attributes) {
//       el.setAttribute(attr, attributes[attr]);
//     }
//     return el;
//   }
// function appendingSongs(player){
//     const songEl=document.getElementById("songs")
//     for(song of player.songs){
//         songEl.append(createSongElement(song));
//     }
// }

// function appendingPlaylists(player){
//     const playListEl=document.getElementById("playlists")
//     for(playlist of player.playlists){
//         playListEl.append(createPlaylistElement(playlist));
//     }
// }
// appendingPlaylists(player)
// appendingSongs(player)
