import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ card, deckId, handleDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body row">
        <div className="col"><p>{card.front}</p></div>
        <div className="col">
          <p> {card.back}</p>
          <div className="d-flex gap-2 float-right">
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">
              <span className="oi oi-pencil"></span> Edit
            </Link>
            <button className="btn btn-danger" onClick={() => handleDelete(card.id)}><span className="oi oi-trash"></span></button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CardItem; 
