import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { characters } from "../data/characters";
import type { User } from "@supabase/supabase-js";
import "../styles/characterPage.css";

function CharacterPage({ user }: { user: User | null }) {
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
      {
        username: user?.user_metadata?.username || "Unknown",
        combo: comboInput,
      },
    ]);

    setComboInput("");
    setShowForm(false);
  };
const formatCombo = (combo: string) => {
  // split into: normal text + (parentheses blocks)
  const segments = combo.split(/(\([^)]*\))/g);

  return segments.map((segment, segIndex) => {
    // if it's a move name like (Dandy Punch)
    if (segment.startsWith("(") && segment.endsWith(")")) {
      return (
        <span key={segIndex} className="combo-text-default">
          {segment}
        </span>
      );
    }

    // otherwise parse normally
    const parts =
      segment.match(/j\.\([PKSHD](?:\s*or\s*[PKSHD])*\)|j\.[0-9]+[PKSHD]|j\.[PKSHD]|c\.S|f\.S|[0-9]+[PKSHD]|[PKSHD]|RC|xN|or|>|\/|\S+/gi) || [];

    const getMoveClass = (part: string) => {
      const move = part.toUpperCase();

      if (move.startsWith("J.(")) return "move-slash";
      if (move.endsWith("P")) return "move-punch";
      if (move.endsWith("K")) return "move-kick";
      if (move.endsWith("S")) return "move-slash";
      if (move.endsWith("H")) return "move-heavy";
      if (move.endsWith("D")) return "move-dust";

      return "combo-text-default";
    };

    return parts.map((part, index) => {
      if (/^(j\.\([PKSHD](?:\s*or\s*[PKSHD])*\)|j\.[0-9]+[PKSHD]|j\.[PKSHD]|c\.S|f\.S|[0-9]+[PKSHD]|[PKSHD])$/i.test(part)) {
        return (
          <span key={`${segIndex}-${index}`} className={getMoveClass(part)}>
            {part}
          </span>
        );
      }

      if (part === ">" || part === "/") {
        return (
          <span key={`${segIndex}-${index}`} className="combo-symbol">
            {part}
          </span>
        );
      }

      return (
        <span key={`${segIndex}-${index}`} className="combo-text-default">
          {part}
        </span>
      );
    });
  });
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

      {/* 🔐 ADD COMBO (AUTH PROTECTED) */}
      {user ? (
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
                maxLength={120}
                onChange={(e) => setComboInput(e.target.value)}
              />

              <button onClick={handleAdd}>Submit Combo</button>
            </div>
          )}
        </div>
      ) : (
        <p style={{ marginTop: "20px", color: "#93c5fd" }}>
          Login to add your own combos
        </p>
      )}

      {/* COMMUNITY COMBOS */}
      <div className="community-section">
        <h2>Community Combos</h2>

        {combos.length === 0 && (
          <p>No combos yet — be the first!</p>
        )}

        {combos.map((entry, index) => (
          <div key={index} className="combo-card">
            <p className="combo-user">{entry.username}</p>
            <p className="combo-text">{formatCombo(entry.combo)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CharacterPage;