import axios from "axios";
var instance = axios.create({
  baseURL:"http://localhost:3001"
});

export default {
  // Gets all books
  getSaves: function(id) {
    return instance.get(`/api/load/${id}`);
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

    return instance.post("/api/save", game);

  },
  getArenas: function() {
    return instance.get("/api/arenas");
  },
  saveUser: function(user) {

    return instance.post("/api/user");

  }
};