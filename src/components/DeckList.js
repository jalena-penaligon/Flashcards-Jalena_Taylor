import React from "react";
import DeckItem from "./DeckItem";

const DeckList = ({ decks, handleDelete }) => {
  return (
    <>
      {decks.map((deck) => (
        <div key={deck.id}>
          <DeckItem deck={deck} handleDelete={handleDelete} />
        </div>
      ))}
    </>
  );
};

export default DeckList;
