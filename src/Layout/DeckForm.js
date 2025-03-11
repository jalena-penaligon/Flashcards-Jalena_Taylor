import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, createDeck, updateDeck } from "../utils/api";
import Navigation from "./Navigation";

const DeckForm = ({ mode }) => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        if (mode === "edit" && deckId) {
          const fetchedDeck = await readDeck(deckId, abortController.signal);
          setFormData({ name: fetchedDeck.name, description: fetchedDeck.description });
        }
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId, mode]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "edit") {
      await updateDeck({ id: deckId, ...formData });
      navigate(`/decks/${deckId}`);
    } else {
      const newDeck = await createDeck(formData);
      navigate(`/decks/${newDeck.id}`);
    }
  };

  return (
    <div className="container mt-4">
      <Navigation 
        currentPage={mode === "edit" ? "Edit Deck" : "Create Deck"}
        previousPage={mode === "edit" ? formData.name : ""}
        previousPageUrl={mode === "edit" ? `/decks/${deckId}` : ""}
      />

      <h2>{mode === "edit" ? "Edit Deck" : "Create Deck"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Deck Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            placeholder="Brief description of the deck"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-secondary">
            {mode === "edit" ? "Cancel" : "Done"}
          </Link>
          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Save Changes" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckForm;
