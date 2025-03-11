import React from "react";
import { Link } from "react-router-dom";
import DeckList from "../components/DeckList";

function Home({ decks, handleDelete }) {
  return (
    <div className="home">
      <Link className="btn btn-secondary" to="/decks/new">
      <span className="oi oi-plus"></span> Create Deck
      </Link>
      <DeckList decks={decks} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
