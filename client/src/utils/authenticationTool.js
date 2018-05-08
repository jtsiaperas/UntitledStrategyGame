import axios from "axios";

export default {
  // Gets all books
  getSaves: function(user) {
    
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getNotes: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(article) {
    return axios.post("/api/articles", article);
  },
  saveNote: function(props) {
    
    return axios.post("/api/articles/"+props.id,{title: props.title, body: props.body});
  },
  searchArticles: function(query) {
    let params = query.topic+","+query.start+","+query.end;
    return axios.get("/api/scrape/" + params);
  }
};