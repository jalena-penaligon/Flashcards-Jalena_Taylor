import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CardForm from "./CardForm";
import Deck from "./Deck";
import DeckForm from "./DeckForm";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";
import Study from "./Study";
import { listDecks } from "../utils/api";
import { deleteDeck } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listDecks()
      .then(setDecks)
      .catch(() => console.error("Error loading decks"));
  }, []);

  const handleDeleteDeck = async (id) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(id);
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home decks={decks} handleDelete={handleDeleteDeck} />}
          />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/new" element={<DeckForm mode="create" />} />
          <Route path="decks/:deckId/edit" element={<DeckForm mode="edit" />} />
          <Route
            path="/decks/:deckId/cards/new"
            element={<CardForm mode="create" />}
          />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<CardForm mode="edit" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;