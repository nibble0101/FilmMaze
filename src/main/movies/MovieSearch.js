import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const queryUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const queryExtension = "&query=";

export default function MovieSearch(props) {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const changeHandle = (e) => {
    setValue(e.target.value);
  };
  const submitHandle = (e) => {
    if (!value) {
      alert("Enter movie title before submitting!");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setQuery(value);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const url =
      queryUrl +
      process.env.REACT_APP_API_KEY +
      queryExtension +
      encodeURI(query);
    async function fetchData() {
      const data = await fetch(url).then((response) => response.json());
      setData(data.results);
    }
    fetchData();
  }, [query]);
  if (data.length) {
    return (
      <Redirect
        push
        to={{
          pathname: `/movies/search/all/${query.replace(/\s+/g, "")}`,
          state: { data: data },
        }}
      />
    );
  }

  return (
    <div className="main-search">
      <form onSubmit={submitHandle}>
        <input
          type="text"
          name="search"
          value={value}
          onChange={changeHandle}
          placeholder="Enter movie title..."
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
