import { characters } from "../data/characters";
import CharacterCard from "../components/CharacterCard";
import "../styles/home.css";

function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <p className="eyebrow">Fan-made fighting game hub</p>
        <h1>Welcome to FinalFrontier</h1>
        <p>
          Explore original characters, view their details, and check out combo
          lists created by the community.
        </p>
      </div>

      <div className="character-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  );
}

export default Home;