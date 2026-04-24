import { Link } from "react-router-dom";
import type { Character } from "../data/characters";

type Props = {
  character: Character;
};

function CharacterCard({ character }: Props) {
  return (
    <Link to={`/character/${character.id}`} className="character-card">
      <img src={character.image} alt={character.name} />

      <h2>{character.name}</h2>
      <p className="character-title">{character.title}</p>

      <div className="card-info">
        <span>{character.fightingStyle}</span>
        <span>{character.difficulty}</span>
      </div>
    </Link>
  );
}

export default CharacterCard;