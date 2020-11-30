import React from "react";
import "./FavoriteFilm.css";

class FavoriteFilm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      poster: "",
      comment: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };
    const url = "https://post-a-form.herokuapp.com/api/movies";
    fetch(url, config)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Movie #${res.title} has been successfully added!`);
        }
      })
      .catch((e) => {
        console.error(e);
        alert("There was an error when adding the movie.");
      });
  };

  render() {
    return (
      <div className="FavoriteFilm">
        <h1>Favorite movie</h1>

        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Information</legend>
            <div className="form-data">
              <label htmlFor="title">Name of Movie</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>

            <div className="form-data">
              <label htmlFor="poster">URL</label>
              <input
                type="text"
                id="poster"
                name="poster"
                onChange={this.handleChange}
                value={this.state.poster}
              />
            </div>

            <div className="form-data">
              <label htmlFor="comment">comment</label>
              <textarea
                type="text"
                id="comment"
                name="comment"
                onChange={this.handleChange}
                value={this.state.comment}
              />
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Send" onSubmit={this.submitForm} />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default FavoriteFilm;
