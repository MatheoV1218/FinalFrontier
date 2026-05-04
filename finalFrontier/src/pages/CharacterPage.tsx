import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { characters } from "../data/characters";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import "../styles/characterPage.css";

function CharacterPage({ user }: { user: User | null }) {
  const { id } = useParams();

  const character = characters.find((char) => char.id === Number(id));
  type Combo = {
    id: string;
    username: string;
    combo: string;
    user_id: string;
    character_id: number;
  };

  const [combos, setCombos] = useState<Combo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [comboInput, setComboInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchCombos = async () => {
      if (!character) return;

      const { data, error } = await supabase
        .from("combos")
        .select("*")
        .eq("character_id", character.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching combos:", error.message);
      } else {
        setCombos(data);
      }
    };

    fetchCombos();
  }, [character]);

  if (!character) {
    return <h1>Character not found</h1>;
  }
  const handleAdd = async () => {
    const cleanCombo = comboInput.replace(/[<>]/g, "").trim();

    if (!cleanCombo) {
      alert("Enter a combo first");
      return;
    }

    if (cleanCombo.length > 120) {
      alert("Combo is too long");
      return;
    }

    if (!user) {
      alert("You must be logged in");
      return;
    }

    const { data, error } = await supabase
      .from("combos")
      .insert([
        {
          user_id: user.id,
          username: user.user_metadata?.username || "Unknown",
          character_id: character.id,
          combo: cleanCombo,
        },
      ])
      .select();

    if (error) {
      console.error("Insert error:", error.message);
      alert("Failed to add combo");
      return;
    }

    // ✅ instantly update UI
    setCombos([data[0], ...combos]);

    setComboInput("");
    setShowForm(false);
  };
  // For adding the color on the text
 

  const handleDelete = async (comboId: string) => {
    const { error } = await supabase.from("combos").delete().eq("id", comboId);

    if (error) {
      console.error("Delete error:", error.message);
      alert("Failed to delete combo");
      return;
    }

    // update UI
    setCombos(combos.filter((c) => c.id !== comboId));
  };

  const handleEdit = async (comboId: string) => {
    const cleanCombo = editText.replace(/[<>]/g, "").trim();

    if (!cleanCombo) {
      alert("Enter a combo");
      return;
    }

    const { error } = await supabase
      .from("combos")
      .update({ combo: cleanCombo })
      .eq("id", comboId);

    if (error) {
      console.error("Update error:", error.message);
      alert("Failed to update combo");
      return;
    }

    // update UI
    setCombos(
      combos.map((c) => (c.id === comboId ? { ...c, combo: cleanCombo } : c)),
    );

    setEditingId(null);
    setEditText("");
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

        {combos.length === 0 && <p>No combos yet — be the first!</p>}

        {combos.map((entry) => (
          <div key={entry.id} className="combo-card">
            <p className="combo-user">{entry.username}</p>

            {/* ✏️ EDIT MODE */}
            {editingId === entry.id ? (
              <>
                <textarea
                  className="combo-edit-textarea"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <div className="combo-actions">
                  <button
                    className="combo-btn-save"
                    onClick={() => handleEdit(entry.id)}
                  >
                    Save
                  </button>

                  <button
                    className="combo-btn-cancel"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="combo-text">{entry.combo}</p>

                {/* 🔐 ONLY SHOW IF OWNER */}
                {user?.id === entry.user_id && (
                  <div className="combo-actions">
                    <button
                      className="combo-btn-edit"
                      onClick={() => {
                        setEditingId(entry.id);
                        setEditText(entry.combo);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="combo-btn-delete"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CharacterPage;
