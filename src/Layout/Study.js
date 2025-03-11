import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Navigation from "./Navigation";
import StudyCard from "../components/StudyCard";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);
        setCards(fetchedDeck.cards || []);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  if (!deck) return <p>Loading...</p>;

  if (cards.length < 2) {
    return (
      <div className="container mt-4">
        <Navigation currentPage="Study" previousPage={deck.name} previousPageUrl={`/decks/${deck.id}`} />

        <h2>Study: {deck.name}</h2>
        <p>Not enough cards. You need at least 2 cards to study.</p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Navigation currentPage="Study" previousPage={deck.name} previousPageUrl={`/decks/${deck.id}`} />
      <h2>Study: {deck.name}</h2>
      <StudyCard cards={cards} currentCardIndex={currentCardIndex} setCurrentCardIndex={setCurrentCardIndex} />
    </div>
  );
};

export default Study;
