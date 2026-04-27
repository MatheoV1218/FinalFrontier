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
  imagePosition?: string;
};

export const characters: Character[] = [
  {
    id: 1,
    name: "Hachimi",
    title: "Gravity Breaker",
    createdBy: "Matheo",
    creatorRole: "Character Designer",
    description: "Manipulates gravity to launch enemies into air combos.",
    fightingStyle: "Air combos",
    difficulty: "Medium",
    image: "/Tokai.png",
    communityCombos: [
      { username: "Player1", combo: "Light > Heavy > Gravity Slam" },
    ],
  },
  {
    id: 2,
    name: "King Cloud",
    title: "Air Duelist",
    createdBy: "Alex",
    creatorRole: "Designer",
    description: "On knockdown use vape clouds to pressure opponents",
    fightingStyle: "Okizeme",
    difficulty: "Easy",
    image: "/kinger_vape.png",
    communityCombos: [
      { username: "FireMain", combo: "Light > Medium > Flame Burst" },
    ],
    imagePosition: "center 35%"

  },
  {
    id: 3,
    name: "Mega Brainz",
    title: "Flying Tank",
    createdBy: "Jordan",
    creatorRole: "Lore Writer",
    description: "Slow,High Damage with devastating command grabs.",
    fightingStyle: "Grappler",
    difficulty: "Hard",
    image: "/giga.png",
    communityCombos: [
      { username: "ShadowGod", combo: "Teleport > Light > Heavy" },
    ],
    imagePosition: "center 20%"
  },
  {
    id: 4,
    name: "Triple T",
    title: "Heavenly Swordman",
    createdBy: "Chris",
    creatorRole: "Designer",
    description: "Controls ice to slow and trap opponents.",
    fightingStyle: "Rushdown",
    difficulty: "Medium",
    image: "/unnamed.png",
    communityCombos: [
      { username: "Frosty", combo: "Ice Shot > Freeze > Slam" },
    ],
    imagePosition: "center 10%"
  },
  {
    id: 5,
    name: "V1",
    title: "War Machine",
    createdBy: "Leo",
    creatorRole: "Dev",
    description: "Lightweight machine with various tools to zone",
    fightingStyle: "Zoner",
    difficulty: "Easy",
    image: "/v1.png",
    communityCombos: [
      { username: "TankMain", combo: "Heavy > Grab > Slam" },
    ],
    imagePosition: "center 40%"
  },
  {
    id: 6,
    name: "Sledge(R6)",
    title: "Guest Character",
    createdBy: "Sophie",
    creatorRole: "Artist",
    description: "wall break combo extender",
    fightingStyle: "Wall-Carry",
    difficulty: "Hard",
    image: "/sledge.png",
    communityCombos: [
      { username: "NightFox", combo: "Dash > Light > Critical Strike" },
    ],
    imagePosition: "center 10%"
  },
  {
    id: 7,
    name: "Mime and Dash",
    title: "Shadow Partner",
    createdBy: "Derpixon",
    creatorRole: "Designer",
    description: "uses puppet to create oppressive high-low mixups",
    fightingStyle: "Puppet Character",
    difficulty: "Medium",
    image: "/mime.png",
    communityCombos: [
      { username: "Zap", combo: "Light spam > Shock finisher" },
    ],
    imagePosition: "center 70%"
  },
  {
    id: 8,
    name: "JB",
    title: "Rekkas",
    createdBy: "Ella",
    creatorRole: "Writer",
    description: "versatile 3 hit string that allows for high-low mix-ups",
    fightingStyle: "Rushdown",
    difficulty: "Easy",
    image: "/justin_b.png",
    communityCombos: [
      { username: "Healer", combo: "Trap > Root > Burst" },
    ],
    imagePosition: "center 20%"
  },
  {
    id: 9,
    name: "Man of Steel",
    title: "Impenetrable Pecs",
    createdBy: "Jay",
    creatorRole: "Dev",
    description: "High risk High reward rushdown mix with autoguard mechanics",
    fightingStyle: "Parry",
    difficulty: "Medium",
    image: "/tiktok.png",
    communityCombos: [
      { username: "StarBoy", combo: "Light > Cosmic Slash" },
    ],
    imagePosition: "center 10%"
  },
  {
    id: 10,
    name: "Dolphin Tamer",
    title: "One Move",
    createdBy: "Noah",
    creatorRole: "Designer",
    description: "item thrower and high gamable character require lots of cuda cores to play",
    fightingStyle: "Unorthodox",
    difficulty: "Hard",
    image: "/arafrat.png",
    communityCombos: [
      { username: "WolfMain", combo: "Claw > Bite > Roar" },
    ],
    imagePosition: "center 10%"
  },
  {
    id: 11,
    name: "Teto",
    title: "Idol",
    createdBy: "Mia",
    creatorRole: "Designer",
    description: "red, blue, yellow stance provide flexble between range, close-range, and autoguard",
    fightingStyle: "Stance",
    difficulty: "Easy",
    image: "/teto.png",
    communityCombos: [
      { username: "NovaMain", combo: "Charge > Blast > Finisher" },
    ],
    imagePosition: "center 35%"
  },
  {
    id: 12,
    name: "Genius",
    title: "Demon-King",
    createdBy: "Ethan",
    creatorRole: "Dev",
    description: "Powerful install providing bonus damage and properties can be used to extend combos ",
    fightingStyle: "Install",
    difficulty: "Hard",
    image: "/demon-king.png",
    communityCombos: [
      { username: "TimeLord", combo: "Rewind > Light > Heavy" },
    ],
    imagePosition: "center 20%"
  },
  {
    id: 13,
    name: "kashtira",
    title: "Arise-Heart",
    createdBy: "Lily",
    creatorRole: "Designer",
    description: "balance all rounder with powerful finisher",
    fightingStyle: "All-Rounder",
    difficulty: "Easy",
    image: "/Kashtira_Arise-Heart.png",
    communityCombos: [
      { username: "SniperX", combo: "Aim > Charge > Beam" },
    ],
    imagePosition: "center 10%"
  },
  {
    id: 14,
    name: "Sugardust",
    title: "fairy",
    createdBy: "Zane",
    creatorRole: "Writer",
    description: "unique zoner with resource management with reduce damage base kit till broken",
    fightingStyle: "Zoner/Setup",
    difficulty: "Medium",
    image: "/sugar.png",
    communityCombos: [
      { username: "VoidMain", combo: "Drain > Heavy > Collapse" },
    ],
  },
  {
    id: 15,
    name: "Zekrom",
    title: "Lighting Dragon",
    createdBy: "Aiden",
    creatorRole: "Designer",
    description: "high-mobility, high-damage, lacks super replaced with resource to maintain damage output",
    fightingStyle: "Rushdown",
    difficulty: "Easy",
    image: "/zek.png",
    communityCombos: [
      { username: "Toxic", combo: "Poison > Light > Spread" },
    ],
    imagePosition: "center 20%"
  },
];