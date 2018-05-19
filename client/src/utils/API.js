import axios from "axios";
var instance = axios.create({});

export default {
  // Gets all books
  getSaves: function(id) {
    return instance.get("/api/load/"+id);
  },
  // Gets the book with the given id
  getCharacters: function(faction) {
    return instance.get("/api/characters/" + faction);
  },
  // Deletes the book with the given id
  deleteSave: function(id) {
    return instance.delete("/api/save/" + id);
  },
  // Saves a book to the database
  saveGame: function(game) {
    let profile = localStorage.getItem('profile');
    console.log(profile);
    return instance.post("/api/save", {time: Date.now(),clicked: game.clicked,acive: game.active,tiles: game.tiles, player1Army: game.player1Army, player2Army: game.player2Army, charactersPlaced: game.charactersPlaced, id:profile});
  },
  getArenas: function() {
    return instance.get("/api/arenas");
  },
  getUser: function(id) {
    return instance.get("/api/user/"+id);
  },
  saveUser: function(user) {

    return instance.post("/api/user",{user:user});

  }
};