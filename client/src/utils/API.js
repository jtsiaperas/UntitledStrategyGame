import axios from "axios";

export default {
  // Gets all books
  getSaves: function(id) {
    return axios.get(`/api/load/${id}`);
  },
  // Gets the book with the given id
  getCharacters: function(faction) {
    return axios.get("/api/articles/" + faction);
  },
  // Deletes the book with the given id
  deleteSave: function(id) {
    return axios.delete("/api/save/" + id);
  },
  // Saves a book to the database
  saveGame: function(game) {
    return axios.post("/api/save", game,);
  },
  getArenas: function() {
    return axios.get("/api/arenas");
  },
  saveUser: function(user) {
    return axios.post("/api/user",user,);
  }
};