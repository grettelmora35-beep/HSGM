/* ============================================================
   The Woods — Datos del test de estilo
   ============================================================ */

export type StyleId =
  | "contemporaneo"
  | "minimalista"
  | "calido"
  | "escandinavo"
  | "industrial"
  | "clasico";

export interface StyleProfile {
  id: StyleId;
  name: string;
  tagline: string;
  description: string;
  materials: string[];
  palette: string[];
  images: string[];
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

export const STYLES: Record<StyleId, StyleProfile> = {
  contemporaneo: {
    id: "contemporaneo",
    name: "Contemporáneo",
    tagline: "Líneas limpias, materiales nobles y luz natural.",
    description:
      "Armonizas la estética moderna con la elegancia atemporal. Buscas espacios fluidos donde la madera cálida convive con superficies mate y grandes ventanales. Menos ornamento, más intención.",
    materials: ["Nogal natural", "Roble claro mate", "Paneles tipo madera ranurada"],
    palette: ["#d8c7ab", "#a78458", "#6f5536", "#efe9dd"],
    images: [
      u("photo-1618221195710-dd6b41faaea6"),
      u("photo-1616486338812-3dadae4b4ace"),
      u("photo-1600210492486-724fe5c67fb0"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1616137466211-f939a420be84"),
      u("photo-1631679706909-1844bbd07221"),
    ],
  },
  minimalista: {
    id: "minimalista",
    name: "Minimalista",
    tagline: "Menos es más. Calma, orden y espacio para respirar.",
    description:
      "Valoras la simplicidad y la funcionalidad. Cada pieza tiene un propósito. Superficies lisas, paleta reducida y la madera como único acento cálido que aporta vida al blanco.",
    materials: ["Roble blanqueado", "MDF lacado mate", "Chapa de madera lisa"],
    palette: ["#f4f1ec", "#e3ddd2", "#c9bca6", "#8d8479"],
    images: [
      u("photo-1567538096630-e0c55bd6374c"),
      u("photo-1505691938895-1758d7feb511"),
      u("photo-1524758631624-e2822e304c36"),
      u("photo-1540574163026-643ea20ade25"),
      u("photo-1513584684374-8bab748fbf90"),
      u("photo-1616594039964-ae9021a400a0"),
    ],
  },
  calido: {
    id: "calido",
    name: "Rústico Cálido",
    tagline: "Texturas naturales que abrazan y cuentan historias.",
    description:
      "Te enamoran los ambientes acogedores con carácter. Maderas con veta marcada, tonos terracota y materiales que envejecen con belleza. Un hogar que se siente vivido y auténtico.",
    materials: ["Madera maciza con veta", "Vigas tipo madera", "Parota / Mezquite"],
    palette: ["#b5764a", "#8a4f2d", "#d9a679", "#5e4630"],
    images: [
      u("photo-1583847268964-b28dc8f51f92"),
      u("photo-1449247709967-d4461a6a6103"),
      u("photo-1493809842364-78817add7ffb"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1522708323590-d24dbb6b0267"),
      u("photo-1600585154340-be6161a56a0c"),
    ],
  },
  escandinavo: {
    id: "escandinavo",
    name: "Escandinavo",
    tagline: "Claridad nórdica: luz, madera clara y confort.",
    description:
      "Prefieres espacios luminosos y funcionales con un toque hygge. Maderas claras, líneas suaves y textiles cálidos. La sencillez nórdica que hace que cada rincón se sienta como un abrazo.",
    materials: ["Abedul / Pino claro", "Roble natural", "Paneles tipo madera blanca"],
    palette: ["#f6f3ee", "#dcd2c2", "#c7a982", "#9a9488"],
    images: [
      u("photo-1567016432779-094069958ea5"),
      u("photo-1586023492125-27b2c045efd7"),
      u("photo-1538688525198-9b88f6f53126"),
      u("photo-1618220179428-22790b461013"),
      u("photo-1517705008128-361805f42e86"),
      u("photo-1531973576160-7125cd663d86"),
    ],
  },
  industrial: {
    id: "industrial",
    name: "Industrial",
    tagline: "Carácter urbano: contraste entre madera y metal.",
    description:
      "Te atrae la estética de loft: estructuras vistas, tonos profundos y el contraste entre la calidez de la madera y la frialdad del metal. Espacios con personalidad fuerte y honesta.",
    materials: ["Madera recuperada", "Tablero tipo madera oscura", "Roble ahumado"],
    palette: ["#3a3631", "#6b5d4d", "#9a7b58", "#cdbfa9"],
    images: [
      u("photo-1556228453-efd6c1ff04f6"),
      u("photo-1497366754035-f200968a6e72"),
      u("photo-1497366811353-6870744d04b2"),
      u("photo-1502005229762-cf1b2da7c5d6"),
      u("photo-1484101403633-562f891dc89a"),
      u("photo-1615873968403-89e068629265"),
    ],
  },
  clasico: {
    id: "clasico",
    name: "Clásico Nogal",
    tagline: "Elegancia atemporal con maderas profundas y nobles.",
    description:
      "Aprecias la sofisticación duradera. Maderas oscuras de veta rica, acabados pulidos y detalles cuidados. Un estilo que transmite herencia, calidez y un lujo discreto que nunca pasa de moda.",
    materials: ["Nogal oscuro", "Caoba / Cerezo", "Boiserie tipo madera"],
    palette: ["#4a3322", "#6f4a2c", "#a9794a", "#e0cdaf"],
    images: [
      u("photo-1600210491369-e753d80a41f3"),
      u("photo-1616627561839-074385245ff6"),
      u("photo-1616137466211-f939a420be84"),
      u("photo-1567016432779-094069958ea5"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1583847268964-b28dc8f51f92"),
    ],
  },
};

export interface Option {
  text: string;
  image: string;
  weights: Partial<Record<StyleId, number>>;
}

export interface Question {
  id: string;
  prompt: string;
  helper?: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: "paleta",
    prompt: "¿Qué paleta te hace sentir en casa?",
    helper: "Elige la textura de madera que más te atraiga a primera vista.",
    options: [
      { text: "Nogal clásico, cálido y noble", image: u("photo-1727670373816-7475b30e542d"), weights: { contemporaneo: 2, escandinavo: 1 } },
      { text: "Blancos y grises tipo madera", image: u("photo-1675783453128-cdb7ffad8595"), weights: { minimalista: 2, escandinavo: 1 } },
      { text: "Terracota, parota y ocre", image: u("photo-1625496235025-d783abf061c8"), weights: { calido: 2, clasico: 1 } },
      { text: "Negros, grises y tonos profundos", image: u("photo-1525947088131-b701cd0f6dc3"), weights: { industrial: 2, clasico: 1 } },
    ],
  },
  {
    id: "espacio",
    prompt: "¿Cuál es tu espacio soñado?",
    options: [
      { text: "Abierto, luminoso y ordenado", image: u("photo-1701422055895-331344238120"), weights: { minimalista: 2, contemporaneo: 1 } },
      { text: "Acogedor, con lambrín de madera", image: u("photo-1701421047872-d61f8962d682"), weights: { calido: 2, escandinavo: 1 } },
      { text: "Amplio, con grandes ventanales", image: u("photo-1560185008-b033106af5c3"), weights: { contemporaneo: 2, minimalista: 1 } },
      { text: "Con carácter y lambrín de madera", image: u("photo-1722353016700-b88171f87839"), weights: { industrial: 2 } },
    ],
  },
  {
    id: "madera",
    prompt: "¿Qué piso o acabado de madera te enamora?",
    helper: "SPC, laminado, ingeniería o madera natural.",
    options: [
      { text: "Roble claro mate, sereno", image: u("photo-1611072337226-1140ab367200"), weights: { escandinavo: 2, minimalista: 1 } },
      { text: "Nogal natural, cálido y vivo", image: u("photo-1582055193464-943584223be1"), weights: { contemporaneo: 2, calido: 1 } },
      { text: "Madera oscura, profunda y noble", image: u("photo-1502639625928-9e0198ae7dfb"), weights: { clasico: 2, industrial: 1 } },
      { text: "Piso SPC, resistente y cálido", image: u("photo-1649083048770-82e8ffd80431"), weights: { calido: 2, industrial: 1 } },
    ],
  },
  {
    id: "atmosfera",
    prompt: "La atmósfera que buscas es...",
    options: [
      { text: "Cálida y rústica", image: u("photo-1680703486830-1b5af60635d7"), weights: { minimalista: 2, escandinavo: 1 } },
      { text: "Rústica pero moderna", image: u("photo-1600210492493-0946911123ea"), weights: { industrial: 2, contemporaneo: 1 } },
      { text: "Acogedora, con acentos de madera y LEDs", image: u("photo-1663811397219-c572550dffc5"), weights: { calido: 2, escandinavo: 1 } },
      { text: "Habitación rústica moderna", image: u("photo-1727706572437-4fcda0cbd66f"), weights: { clasico: 2, contemporaneo: 1 } },
    ],
  },
  {
    id: "exterior",
    prompt: "Para tu terraza o exterior, prefieres...",
    options: [
      { text: "Deck de madera con líneas limpias", image: u("photo-1759751104723-db7134de4d5f"), weights: { contemporaneo: 2, minimalista: 1 } },
      { text: "Pérgola de madera y follaje", image: u("photo-1527359443443-84a48aec73d2"), weights: { escandinavo: 2, calido: 1 } },
      { text: "Madera rústica para convivir", image: u("photo-1760304979421-49e6f667774c"), weights: { calido: 2 } },
      { text: "Fachada moderna de madera y líneas", image: u("photo-1580064555553-3fa4c6e085da"), weights: { industrial: 2, clasico: 1 } },
    ],
  },
];

export function scoreAnswers(answers: number[]): {
  winner: StyleId;
  ranking: { id: StyleId; score: number }[];
} {
  const totals: Record<StyleId, number> = {
    contemporaneo: 0,
    minimalista: 0,
    calido: 0,
    escandinavo: 0,
    industrial: 0,
    clasico: 0,
  };

  answers.forEach((optIndex, qIndex) => {
    const q = QUESTIONS[qIndex];
    if (!q) return;
    const opt = q.options[optIndex];
    if (!opt) return;
    for (const [style, pts] of Object.entries(opt.weights)) {
      totals[style as StyleId] += pts ?? 0;
    }
  });

  const ranking = (Object.keys(totals) as StyleId[])
    .map((id) => ({ id, score: totals[id] }))
    .sort((a, b) => b.score - a.score);

  return { winner: ranking[0].id, ranking };
}
