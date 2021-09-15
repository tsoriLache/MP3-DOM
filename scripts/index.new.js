/*support functions */
function findSong(id,mPlayer=player){ 
  for(let song of mPlayer.songs){
    if (song.id===id){
      return song;
    }
  }
  throw "ID not found";
}

function findPlaylist(id,mPlayer=player){ 
  for(let Playlist of mPlayer.playlists){
    if (Playlist.id===id){
      return Playlist;
    }
  }
  throw "ID not found";
}

function secToDur(sec){
  return((Math.floor(sec/60))<10? "0": "")+`${Math.floor(sec/60)}:` +((sec%60)<10? "0": "")+`${sec%60}`
}

function playlistDuration(id) {
  let plDuration=0;
  for(let songID of findPlaylist(id).songs){
    plDuration+=(findSong(songID).duration);
  }
  return (plDuration);          
}

/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 let lastSongPlayed;
 function playSong(songId) {
     try{
     lastSongPlayed.classList.remove("now-playing");
     }finally{
     const songElement=document.getElementById(songId+"song")
     const song=findSong(songId);
     songElement.classList.add("now-playing");
     setTimeout(()=>songElement.classList.remove("now-playing"),song.duration*1000);
     setTimeout(()=>playSong(player.songs[(player.songs.indexOf(song)+1)].id),song.duration*1000);
     lastSongPlayed=songElement;
     }
 }

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
  const nameEl=createElement("span", [title],["song-name"]);
  const albumEl=createElement("span",[album],["album-name"])
  const artistEl = createElement("span", [artist],["artist"]);
  const durationEl = createElement("span", ["" + secToDur(duration)] ,["duration", "short-duration"], {onclick: `console.log('${duration}')`});
  const imgEl = createElement("img", [] ,["album-art"], {src: coverArt});
  return createElement("div", [nameEl,albumEl,"Artist: ", artistEl, "Duration: ", durationEl, imgEl],["song"],{id:id+"song", onclick: `playSong(${id})` });
}
console.log(createSongElement(player.songs[0]))
/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
  const nameEl=createElement("span", [name,":"],["playlist-name"]);
  const quantityEl=createElement("span",[songs.length],["num-of-song"])
  const attrs = {id:id+"pl"}
  return createElement("div", [nameEl,"Number Of Songs:",quantityEl,"Playlist Duration:",secToDur(playlistDuration(id))], ["playlist"],attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
  const el = document.createElement(tagName);
  // Children
  for(const child of children) {
      el.append(child);
  }
  // Classes
  for(const cls of classes) {
    el.classList.add(cls);
  }
  // Attributes
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr]);
  }
  return el;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
const songEl=document.getElementById("songs") 
function generateSongs(player) {
  for(song of player.songs){
    songEl.append(createSongElement(song));
  }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
const playListEl=document.getElementById("playlists")
function generatePlaylists(player) {
  for(playlist of player.playlists){
    playListEl.append(createPlaylistElement(playlist));
  }
}

// Creating the page structure
generateSongs(player)
generatePlaylists(player)

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
