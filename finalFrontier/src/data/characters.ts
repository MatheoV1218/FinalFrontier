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
  image: string;
  communityCombos: ComboEntry[];
};

export const characters: Character[] = [
  {
    id: 1,
    name: "Kael Vortex",
    title: "Gravity Breaker",
    createdBy: "Matheo",
    creatorRole: "Character Designer",
    description: "Manipulates gravity to launch enemies into air combos.",
    fightingStyle: "Air combos",
    difficulty: "Medium",
    image: "https://picsum.photos/400/300?random=1",
    communityCombos: [
      { username: "Player1", combo: "Light > Heavy > Gravity Slam" },
    ],
  },
  {
    id: 2,
    name: "Nyra Blaze",
    title: "Solar Duelist",
    createdBy: "Alex",
    creatorRole: "Designer",
    description: "Fast fire-based fighter with aggressive pressure.",
    fightingStyle: "Rushdown",
    difficulty: "Easy",
    image: "https://picsum.photos/400/300?random=2",
    communityCombos: [
      { username: "FireMain", combo: "Light > Medium > Flame Burst" },
    ],
  },
  {
    id: 3,
    name: "Riven Hollow",
    title: "Shadow Blade",
    createdBy: "Jordan",
    creatorRole: "Lore Writer",
    description: "Uses shadows and teleportation to confuse enemies.",
    fightingStyle: "Mixups",
    difficulty: "Hard",
    image: "https://picsum.photos/400/300?random=3",
    communityCombos: [
      { username: "ShadowGod", combo: "Teleport > Light > Heavy" },
    ],
  },
  {
    id: 4,
    name: "Zane Frost",
    title: "Ice Phantom",
    createdBy: "Chris",
    creatorRole: "Designer",
    description: "Controls ice to slow and trap opponents.",
    fightingStyle: "Zoning",
    difficulty: "Medium",
    image: "https://picsum.photos/400/300?random=4",
    communityCombos: [
      { username: "Frosty", combo: "Ice Shot > Freeze > Slam" },
    ],
  },
  {
    id: 5,
    name: "Drako Steel",
    title: "Iron Titan",
    createdBy: "Leo",
    creatorRole: "Dev",
    description: "Heavy tank with strong defensive tools.",
    fightingStyle: "Defense",
    difficulty: "Easy",
    image: "https://picsum.photos/400/300?random=5",
    communityCombos: [
      { username: "TankMain", combo: "Heavy > Grab > Slam" },
    ],
  },
  {
    id: 6,
    name: "Luna Veil",
    title: "Moon Assassin",
    createdBy: "Sophie",
    creatorRole: "Artist",
    description: "Quick stealth-based attacks and critical hits.",
    fightingStyle: "Speed",
    difficulty: "Hard",
    image: "https://picsum.photos/400/300?random=6",
    communityCombos: [
      { username: "NightFox", combo: "Dash > Light > Critical Strike" },
    ],
  },
  {
    id: 7,
    name: "Volt Striker",
    title: "Storm Runner",
    createdBy: "Ryan",
    creatorRole: "Designer",
    description: "Lightning-fast attacks and movement.",
    fightingStyle: "Rushdown",
    difficulty: "Medium",
    image: "https://picsum.photos/400/300?random=7",
    communityCombos: [
      { username: "Zap", combo: "Light spam > Shock finisher" },
    ],
  },
  {
    id: 8,
    name: "Mira Bloom",
    title: "Nature Weaver",
    createdBy: "Ella",
    creatorRole: "Writer",
    description: "Uses nature to heal and trap enemies.",
    fightingStyle: "Support",
    difficulty: "Easy",
    image: "https://picsum.photos/400/300?random=8",
    communityCombos: [
      { username: "Healer", combo: "Trap > Root > Burst" },
    ],
  },
  {
    id: 9,
    name: "Orion Pax",
    title: "Cosmic Knight",
    createdBy: "Jay",
    creatorRole: "Dev",
    description: "Harnesses cosmic energy for balanced combat.",
    fightingStyle: "Balanced",
    difficulty: "Medium",
    image: "https://picsum.photos/400/300?random=9",
    communityCombos: [
      { username: "StarBoy", combo: "Light > Cosmic Slash" },
    ],
  },
  {
    id: 10,
    name: "Kairo Fang",
    title: "Beast King",
    createdBy: "Noah",
    creatorRole: "Designer",
    description: "Aggressive melee fighter with savage attacks.",
    fightingStyle: "Aggressive",
    difficulty: "Hard",
    image: "https://picsum.photos/400/300?random=10",
    communityCombos: [
      { username: "WolfMain", combo: "Claw > Bite > Roar" },
    ],
  },
  {
    id: 11,
    name: "Astra Nova",
    title: "Star Breaker",
    createdBy: "Mia",
    creatorRole: "Designer",
    description: "Explosive cosmic attacks with high damage.",
    fightingStyle: "Burst",
    difficulty: "Hard",
    image: "https://picsum.photos/400/300?random=11",
    communityCombos: [
      { username: "NovaMain", combo: "Charge > Blast > Finisher" },
    ],
  },
  {
    id: 12,
    name: "Gideon Flux",
    title: "Time Bender",
    createdBy: "Ethan",
    creatorRole: "Dev",
    description: "Manipulates time to reverse and extend combos.",
    fightingStyle: "Technical",
    difficulty: "Hard",
    image: "https://picsum.photos/400/300?random=12",
    communityCombos: [
      { username: "TimeLord", combo: "Rewind > Light > Heavy" },
    ],
  },
  {
    id: 13,
    name: "Vera Pulse",
    title: "Energy Sniper",
    createdBy: "Lily",
    creatorRole: "Designer",
    description: "Long-range attacks with precise aim.",
    fightingStyle: "Zoning",
    difficulty: "Medium",
    image: "https://picsum.photos/400/300?random=13",
    communityCombos: [
      { username: "SniperX", combo: "Aim > Charge > Beam" },
    ],
  },
  {
    id: 14,
    name: "Drax Void",
    title: "Abyss Walker",
    createdBy: "Zane",
    creatorRole: "Writer",
    description: "Uses void energy to drain enemies.",
    fightingStyle: "Drain",
    difficulty: "Medium",
    image: "https://picsum.photos/400/300?random=14",
    communityCombos: [
      { username: "VoidMain", combo: "Drain > Heavy > Collapse" },
    ],
  },
  {
    id: 15,
    name: "Sylas Thorn",
    title: "Poison King",
    createdBy: "Aiden",
    creatorRole: "Designer",
    description: "Applies poison damage over time.",
    fightingStyle: "DOT",
    difficulty: "Easy",
    image: "https://picsum.photos/400/300?random=15",
    communityCombos: [
      { username: "Toxic", combo: "Poison > Light > Spread" },
    ],
  },
];