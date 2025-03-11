import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import CardList from "../components/CardList";
import Navigation from "./Navigation";

function Deck() {
  const { deckId } = useParams(); 
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);
        setCards(fetchedDeck.cards);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    loadDeck();
    return () => abortController.abort(); 
  }, [deckId]);

  const handleDeleteDeck = async () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deckId);
      navigate("/"); 
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card? This action cannot be undone.")) {
      await deleteCard(cardId);
      setCards(cards.filter((card) => card.id !== cardId)); 
    }
  };

  if (!deck) return <p>Loading...</p>; 

  return (
    <div className="container mt-4">
      <Navigation currentPage={deck.name} />

      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      <div className="mb-3 d-flex gap-2">
        <Link className="btn btn-secondary" to={`/decks/${deckId}/edit`}>
          <span className="oi oi-pencil"></span> Edit
        </Link>
        <Link className="btn btn-primary" to={`/decks/${deckId}/study`}>
          <span className="oi oi-book"></span> Study
        </Link>
        <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
          <span className="oi oi-plus"></span> Add Cards
        </Link>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          <span className="oi oi-trash"></span>
        </button>
      </div>

      <h3>Cards</h3>
      <div className="list-group">
        <CardList cards={cards} deckId={deckId} handleDelete={handleDeleteCard} />
      </div>
    </div>
  );
}

export default Deck;
