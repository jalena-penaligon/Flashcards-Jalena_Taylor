import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, readCard, createCard, updateCard } from "../utils/api";
import Navigation from "./Navigation";

const CardForm = ({ mode }) => {
  const { deckId, cardId } = useParams(); 
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);

        if (mode === "edit" && cardId) {
          const fetchedCard = await readCard(cardId, abortController.signal);
          setFormData({ front: fetchedCard.front, back: fetchedCard.back });
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
    return () => abortController.abort();
  }, [deckId, cardId, mode]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "edit") {
      await updateCard({ id: cardId, deckId, ...formData });
      navigate(`/decks/${deckId}`);
    } else {
      await createCard(deckId, formData);
      setFormData({ front: "", back: "" }); 
    }
  };

  if (!deck) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <Navigation 
        currentPage={mode === "edit" ? "Edit Card" : "Add Card"}
        previousPage={deck.name}
        previousPageUrl={`/decks/${deck.id}`}
      />

      <h2>{deck.name}: {mode === "edit" ? "Edit Card" : "Add Card"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Front</label>
          <textarea
            name="front"
            className="form-control"
            rows="3"
            value={formData.front}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Back</label>
          <textarea
            name="back"
            className="form-control"
            rows="3"
            value={formData.back}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            {mode === "edit" ? "Cancel" : "Done"}
          </Link>
          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Save Changes" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
