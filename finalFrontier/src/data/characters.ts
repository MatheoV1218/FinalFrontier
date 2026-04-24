export type ComboEntry = {
  username: string;
  combo: string;
};

export type Character = {
  id: number;
  name: string;
  title: string;
  createdBy: string;
  creatorRole: string;
  description: string;
  fightingStyle: string;
  difficulty: string;
  communityCombos: ComboEntry[];
};

export const characters: Character[] = [
  {
    id: 1,
    name: "Kael Vortex",
    title: "Gravity Breaker",
    createdBy: "Matheo",
    creatorRole: "Character Designer",
    description:
      "Kael bends gravity to launch enemies and chain aerial combos.",
    fightingStyle: "Air combos, mobility",
    difficulty: "Medium",
    communityCombos: [
      { username: "Player1", combo: "Light > Light > Heavy > Gravity Kick" },
      { username: "ComboKing", combo: "Dash > Heavy > Gravity Pull > Slam" },
    ],
  },
  {
    id: 2,
    name: "Nyra Blaze",
    title: "Solar Duelist",
    createdBy: "Alex",
    creatorRole: "Designer",
    description: "Fire-based rushdown fighter.",
    fightingStyle: "Pressure",
    difficulty: "Easy",
    communityCombos: [
      { username: "FireMain", combo: "Light > Medium > Flame Strike" },
    ],
  },
  {
    id: 3,
    name: "Riven Hollow",
    title: "Shadow Blade",
    createdBy: "Jordan",
    creatorRole: "Lore",
    description: "Teleporting shadow assassin.",
    fightingStyle: "Mixups",
    difficulty: "Hard",
    communityCombos: [
      { username: "ShadowGod", combo: "Teleport > Light > Heavy" },
    ],
  },

  // --- ADDING MORE CHARACTERS ---
  {
    id: 4,
    name: "Zane Frost",
    title: "Ice Phantom",
    createdBy: "Chris",
    creatorRole: "Designer",
    description: "Freezes enemies and controls space.",
    fightingStyle: "Zoning",
    difficulty: "Medium",
    communityCombos: [{ username: "Frosty", combo: "Ice Shot > Dash > Slam" }],
  },
  {
    id: 5,
    name: "Drako Steel",
    title: "Iron Titan",
    createdBy: "Leo",
    creatorRole: "Dev",
    description: "Heavy tank character.",
    fightingStyle: "Defense",
    difficulty: "Easy",
    communityCombos: [{ username: "TankMain", combo: "Heavy > Grab > Slam" }],
  },
  {
    id: 6,
    name: "Luna Veil",
    title: "Moon Assassin",
    createdBy: "Sophie",
    creatorRole: "Artist",
    description: "Fast stealth fighter.",
    fightingStyle: "Speed",
    difficulty: "Hard",
    communityCombos: [{ username: "NightFox", combo: "Dash > Light > Crit" }],
  },
  {
    id: 7,
    name: "Volt Striker",
    title: "Storm Runner",
    createdBy: "Ryan",
    creatorRole: "Designer",
    description: "Lightning-fast combos.",
    fightingStyle: "Rushdown",
    difficulty: "Medium",
    communityCombos: [{ username: "Zap", combo: "Light spam > Shock finisher" }],
  },
  {
    id: 8,
    name: "Mira Bloom",
    title: "Nature Weaver",
    createdBy: "Ella",
    creatorRole: "Writer",
    description: "Heals and traps enemies.",
    fightingStyle: "Support",
    difficulty: "Easy",
    communityCombos: [{ username: "Healer", combo: "Trap > Root > Burst" }],
  },
  {
    id: 9,
    name: "Orion Pax",
    title: "Cosmic Knight",
    createdBy: "Jay",
    creatorRole: "Dev",
    description: "Space-based attacks.",
    fightingStyle: "Balanced",
    difficulty: "Medium",
    communityCombos: [{ username: "StarBoy", combo: "Light > Cosmic Slash" }],
  },
  {
    id: 10,
    name: "Kairo Fang",
    title: "Beast King",
    createdBy: "Noah",
    creatorRole: "Designer",
    description: "Savage melee attacks.",
    fightingStyle: "Aggressive",
    difficulty: "Hard",
    communityCombos: [{ username: "WolfMain", combo: "Claw > Bite > Roar" }],
  },
];