import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { characters } from "../data/characters";
import "../styles/characterPage.css";

function CharacterPage() {
  const { id } = useParams();

  const character = characters.find((char) => char.id === Number(id));

  const [combos, setCombos] = useState(
    character ? character.communityCombos : []
  );
  const [showForm, setShowForm] = useState(false);
  const [comboInput, setComboInput] = useState("");

  if (!character) {
    return <h1>Character not found</h1>;
  }

  const handleAdd = () => {
    if (!comboInput.trim()) {
      alert("Enter a combo first");
      return;
    }

    setCombos([
      ...combos,
      { username: "You", combo: comboInput },
    ]);

    setComboInput("");
    setShowForm(false);
  };

  return (
    <section className="character-page">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      {/* HERO */}
      <div
        className="character-hero"
        style={{
          backgroundImage: `url(${character.image})`,
          backgroundSize: "cover",
          backgroundPosition: character.imagePosition || "center",
        }}
      >
        <div className="hero-overlay">
          <p className="eyebrow">Character Profile</p>
          <h1>{character.name}</h1>
          <p>{character.title}</p>
        </div>
      </div>

      {/* INFO */}
      <div className="info-layout">
        <div className="info-box">
          <h2>Creator Info</h2>
          <p><strong>Created By:</strong> {character.createdBy}</p>
          <p><strong>Role:</strong> {character.creatorRole}</p>
        </div>

        <div className="info-box">
          <h2>Character Info</h2>
          <p>{character.description}</p>
          <p><strong>Style:</strong> {character.fightingStyle}</p>
          <p><strong>Difficulty:</strong> {character.difficulty}</p>
        </div>
      </div>

      {/* ADD COMBO */}
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
              maxLength={120}   // ✅ LIMIT
              onChange={(e) => setComboInput(e.target.value)}
            />

            <button onClick={handleAdd}>Submit Combo</button>
          </div>
        )}
      </div>

      {/* COMMUNITY COMBOS */}
      <div className="community-section">
        <h2>Community Combos</h2>

        {combos.length === 0 && (
          <p>No combos yet — be the first!</p>
        )}

        {combos.map((entry, index) => (
          <div key={index} className="combo-card">
            <p className="combo-user">{entry.username}</p>
            <p className="combo-text">{entry.combo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CharacterPage;