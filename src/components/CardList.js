import React from "react";
import CardItem from "./CardItem";

const CardList = ({ cards, deckId, handleDelete }) => {
  return (
    <>
      {cards?.map((card) => (
        <div key={card.id}>
          <CardItem card={card} deckId={deckId} handleDelete={handleDelete} />
        </div>
      ))}
    </>
  );
};

export default CardList;
