import React, { useState } from "react";

function StudyCard({ cards, currentCardIndex, setCurrentCardIndex }) {
  const currentCard = cards[currentCardIndex];
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false); 
    } else {
      if (window.confirm("Restart the deck?")) {
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } 
    }
  };
  return (
    <div className="card">
    <div className="card-body">
      <h5 className="card-title">
        Card {currentCardIndex + 1} of {cards.length}
      </h5>
      <p className="card-text">
        {isFlipped ? currentCard.back : currentCard.front}
      </p>
      <button className="btn btn-secondary" onClick={handleFlip}>
        Flip
      </button>
      {isFlipped && (
        <button className="btn btn-primary ms-2" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  </div>
  );
};

export default StudyCard;
