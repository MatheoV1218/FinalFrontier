import { useParams, Link } from "react-router-dom";
import { characters } from "../data/characters";
import { useState } from "react";
import "../styles/characterPage.css";

function CharacterPage() {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [comboInput, setComboInput] = useState("");

  const character = characters.find((char) => char.id === Number(id));

  if (!character) {
    return (
      <section className="character-page">
        <h1>Character not found</h1>
        <Link to="/" className="back-link">
          Back to Characters
        </Link>
      </section>
    );
  }

  return (
    <section className="character-page">
      <Link to="/" className="back-link">
        ← Back to Characters
      </Link>

      <div className="character-hero">
        <div>
          <p className="eyebrow">Character Profile</p>
          <h1>{character.name}</h1>
          <p>{character.title}</p>
        </div>
      </div>

      <div className="info-layout">
        <div className="info-box">
          <h2>Creator Info</h2>
          <p>
            <strong>Created By:</strong> {character.createdBy}
          </p>
          <p>
            <strong>Role:</strong> {character.creatorRole}
          </p>
        </div>

        <div className="info-box">
          <h2>Character Info</h2>
          <p>{character.description}</p>
          <p>
            <strong>Style:</strong> {character.fightingStyle}
          </p>
          <p>
            <strong>Difficulty:</strong> {character.difficulty}
          </p>
        </div>

        <div className="add-combo-section">
          <button
            className="add-combo-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Combo
          </button>

          {showForm && (
            <div className="add-combo-form">
              <textarea
                placeholder="Enter your combo..."
                value={comboInput}
                onChange={(e) => setComboInput(e.target.value)}
              />

              <button type="button">Submit Combo</button>
            </div>
          )}
        </div>

        <div className="community-section">
          <h2>Community Combos</h2>

          {character.communityCombos.map((entry, index) => (
            <div key={index} className="combo-card">
              <p className="combo-user">{entry.username}</p>
              <p className="combo-text">{entry.combo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CharacterPage;