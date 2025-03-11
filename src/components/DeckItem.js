import React from "react";
import { Link } from "react-router-dom";

const DeckItem = ({ deck, handleDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{deck.name}</h3>
        <small className="text-muted">{deck.cards?.length || 0} cards</small>
      </div>
      <div className="card-body">
        <p>{deck.description}</p>
        <div className="buttons">
          <Link className="btn btn-primary" to={`/decks/${deck.id}`}>
            <span className="oi oi-eye"></span> View
          </Link>
          <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
            <span className="oi oi-book"></span> Study
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(deck.id)}
          >
            <span className="oi oi-trash"></span> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckItem;
