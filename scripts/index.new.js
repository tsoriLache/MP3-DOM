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

let newSongId=10;
function generateSongId(){
  newSongId+=1;
  return newSongId;
}

function secToDur(sec){
  return((Math.floor(sec/60))<10? "0": "")+`${Math.floor(sec/60)}:` +((sec%60)<10? "0": "")+`${sec%60}`
}

function durationToSeconds(duration){
  checkDurationInput(duration)
  return((parseInt(duration[0])*10)+parseInt(duration[1]))*60
          +parseInt(duration[3]*10)+parseInt(duration[4])
}

function checkDurationInput(duration){   // checks digits(maximum is 59:59/minimum is 00:00),:,length.
  if(0<=parseInt(duration[0])&&parseInt(duration[0])<6&&0<=parseInt(duration[1])&&parseInt(duration[1])<=9
    &&duration[2]===":"&&0<=parseInt(duration[3])&&parseInt(duration[3])<6&&0<=parseInt(duration[4])
    &&parseInt(duration[4])<=9&&duration.length===5){
      return true
    }else {
      alert ('Duration is not in the correct format...This is the format-"mm:ss" (for example 03:13)')
      throw 'Duration is not in the correct format...This is the format-"mm:ss" (for example 03:13)'
    }
}

function playlistDuration(id) {
  let plDuration=0;
  for(let songID of findPlaylist(id).songs){
    plDuration+=(findSong(songID).duration);
  }
  return (plDuration);          
}

function updatePlaylist(){
  const list = document.getElementById("playListList");
  while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
  }
  generatePlaylists(player);
}

function sortByTitle(a, b) {
  let titleA = a.title.toUpperCase(); 
  let titleB = b.title.toUpperCase(); 
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
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
  console.log(player.songs.splice(player.songs.indexOf(findSong(songId)),1));
  for(let playlist of player.playlists){
    const songIndex=playlist.songs.indexOf(songId);
    songIndex>=0? playlist.songs.splice(songIndex,1) :songId;
  }
  document.getElementById(songId+"song").remove();
  updatePlaylist();
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
 function addSong({ title, album, artist, duration, coverArt }) {
  checkDurationInput(duration)
  newId=generateSongId();
  player.songs.push({
      id: newId,
      title: title,
      album: album,
      artist: artist,
      duration: durationToSeconds(duration),
      coverArt: coverArt
  })
  songEl.append(createSongElement(player.songs[player.songs.length-1]));
  let placeAfterThisSong=player.songs.sort(sortByTitle)[(player.songs.indexOf(findSong(newId))-1)].id;
  (document.getElementById(newId+"song")).after(document.getElementById(placeAfterThisSong+"song"))

}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {      // works-need to be written better
  if (event.target.className != "remove-button"){
    if(event.target.className !="play-button")return;
  } 
  let song = event.target.closest(".song");
  if(event.target.className === "remove-button") removeSong(parseInt(song.id.substring(0,1)))
  if(event.target.className ==="play-button") playSong(parseInt(song.id.substring(0,1)))
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {                            // works-need to be written better
  let title=document.getElementById("title").value
      ,album=document.getElementById("album").value
      ,artist=document.getElementById("artist").value
      ,duration=document.getElementById("duration").value
      ,coverArt=document.getElementById("cover-art").value
  addSong({title,album,artist,duration,coverArt})
  document.getElementById("title").value=null;
  document.getElementById("album").value=null;
  document.getElementById("artist").value=null;
  document.getElementById("duration").value=null;
  document.getElementById("cover-art").value=null;
  toggleAddSection();
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
  const nameEl = createElement("span", [title],["song-name"]);
  const albumEl = createElement("span",[album],["album-name"])
  const artistEl = createElement("span", [artist],["artist"]);
  const durationEl = createElement("span", ["" + secToDur(duration)] ,["duration", "short-duration"], {onclick: `console.log('${duration}')`});
  const playEl = createElement("button",["▶"],["play-button"],{id:"playButton"});
  const deleteEl = createElement("button",["❌"],["remove-button"],{id:"deleteButton"});
  const imgEl = createElement("img", [] ,["album-art"], {src: coverArt});
  const textEl = createElement("div",[nameEl,albumEl,"Artist: ", artistEl, "Duration: ", durationEl],["text"])
  return createElement("div",  [imgEl,playEl,deleteEl,textEl],["song"],{id:id+"song"});
}
/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
  const nameEl=createElement("span", [name,":"],["playlist-name"]);
  const quantityEl=createElement("span",[songs.length],["num-of-song"])
  const attrs = {id:id+"pl"}
  return createElement("li", [nameEl,"Number Of Songs:",quantityEl,"Playlist Duration:",secToDur(playlistDuration(id))], ["playlist"],attrs)
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
  for(song of player.songs.sort(sortByTitle)){
    songEl.append(createSongElement(song));
  }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
const playListEl=document.getElementById("playListList")
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

//Making the play and delete buttons actually do something
document.getElementById("songs").addEventListener("click" ,handleSongClickEvent );


//making add section slide.
let inputs = document.getElementById('inputs');
let cancelButton = document.getElementById('cancel-button');
let addButton = document.getElementById('add-button');
let content = document.getElementById('content-section');
let titleElem =  document.getElementById('add-sec-headline');
titleElem.onclick = toggleAddSection;
cancelButton.onclick = toggleAddSection;

function toggleAddSection() {
  inputs.classList.toggle("open");
  addButton.classList.toggle("open");
  cancelButton.classList.toggle("open");
  content.classList.toggle("close");
};