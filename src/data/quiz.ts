/* ============================================================
   The Woods — Datos del test de estilo
   ============================================================ */

export type StyleId =
  | "contemporaneo"
  | "minimalista"
  | "calido"
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
    materials: ["Nogal natural", "Roble claro mate", "Lambrín tipo madera ranurada", "Piso de ingeniería", "Deck de exterior"],
    palette: ["#d8c7ab", "#a78458", "#6f5536", "#efe9dd"],
    images: [
      u("photo-1701422055895-331344238120"),
      u("photo-1580064555553-3fa4c6e085da"),
      u("photo-1759751104723-db7134de4d5f"),
      u("photo-1599696848652-f0ff23bc911f"),
      u("photo-1560185008-b033106af5c3"),
      u("photo-1611072337226-1140ab367200"),
    ],
  },
  minimalista: {
    id: "minimalista",
    name: "Minimalista",
    tagline: "Menos es más. Calma, orden y espacio para respirar.",
    description:
      "Valoras la simplicidad y la funcionalidad. Cada pieza tiene un propósito. Superficies lisas, paleta reducida y la madera como único acento cálido que aporta vida al blanco.",
    materials: ["Roble blanqueado", "Piso SPC tono claro", "Laminado gris/arena", "Chapa de madera lisa"],
    palette: ["#f4f1ec", "#e3ddd2", "#c9bca6", "#8d8479"],
    images: [
      u("photo-1631679706909-1844bbd07221"),
      u("photo-1675783453128-cdb7ffad8595"),
      u("photo-1519393890420-f28727375fa5"),
      u("photo-1591195853841-2f450cbfc7c9"),
      u("photo-1506689205310-0a29c388691c"),
      u("photo-1547044479-59ce6c0a784a"),
    ],
  },
  calido: {
    id: "calido",
    name: "Rústico Cálido",
    tagline: "Texturas naturales que abrazan y cuentan historias.",
    description:
      "Te enamoran los ambientes acogedores con carácter. Maderas con veta marcada, tonos terracota y materiales que envejecen con belleza. Un hogar que se siente vivido y auténtico.",
    materials: ["Madera maciza con veta", "Vigas tipo madera", "Parota / Mezquite", "Piso rústico con nudos", "Pérgola de madera"],
    palette: ["#b5764a", "#8a4f2d", "#d9a679", "#5e4630"],
    images: [
      u("photo-1625496235025-d783abf061c8"),
      u("photo-1582055193464-943584223be1"),
      u("photo-1531914082256-1b9047242426"),
      u("photo-1487266659293-c4762f375955"),
      u("photo-1621295693450-080546d2ec8e"),
      u("photo-1527359443443-84a48aec73d2"),
    ],
  },
  clasico: {
    id: "clasico",
    name: "Clásico Nogal",
    tagline: "Elegancia atemporal con maderas profundas y nobles.",
    description:
      "Aprecias la sofisticación duradera. Maderas oscuras de veta rica, acabados pulidos y detalles cuidados. Un estilo que transmite herencia, calidez y un lujo discreto que nunca pasa de moda.",
    materials: ["Nogal oscuro", "Caoba / Cerezo", "Boiserie tipo madera", "Piso de ingeniería oscuro", "Espiga (herringbone)"],
    palette: ["#4a3322", "#6f4a2c", "#a9794a", "#e0cdaf"],
    images: [
      u("photo-1700226034367-2fb120f48dfa"),
      u("photo-1727670373816-7475b30e542d"),
      u("photo-1690983321303-f510e0575644"),
      u("photo-1502639625928-9e0198ae7dfb"),
      u("photo-1548268364-3acee266b695"),
      u("photo-1690983322335-ddb0eca0229e"),
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
    id: "lugar",
    prompt: "¿Qué lugar te gustaría visitar para descansar?",
    options: [
      { text: "Playa de arena blanca y mar tranquilo", image: u("photo-1590162788208-b0cd453c7720"), weights: { clasico: 1 } },
      { text: "Bosque con cabaña de madera", image: u("photo-1570793005386-840846445fed"), weights: { calido: 1 } },
      { text: "Ciudad moderna con rascacielos", image: u("photo-1541447271487-09612b3f49f7"), weights: { contemporaneo: 1 } },
      { text: "Hotel minimalista de lujo en tonos blancos", image: u("photo-1528908929486-dfaa209c6986"), weights: { minimalista: 1 } },
    ],
  },
  {
    id: "sala",
    prompt: "¿Cuál de estas salas te gustaría tener en tu casa?",
    options: [
      { text: "Rústica con vigas de madera, chimenea y tonos cálidos", image: u("photo-1680703486830-1b5af60635d7"), weights: { calido: 1 } },
      { text: "Clásica con muebles elegantes en nogal", image: u("photo-1700226034367-2fb120f48dfa"), weights: { clasico: 1 } },
      { text: "Contemporánea con diseño moderno y contrastes", image: u("photo-1599696848652-f0ff23bc911f"), weights: { contemporaneo: 1 } },
      { text: "Minimalista con líneas limpias y pocos muebles", image: u("photo-1631679706909-1844bbd07221"), weights: { minimalista: 1 } },
    ],
  },
  {
    id: "paisaje",
    prompt: "¿Qué paisaje te transmite más paz?",
    options: [
      { text: "Montañas y bosque", image: u("photo-1600257729950-13a634d32697"), weights: { calido: 1 } },
      { text: "Jardín clásico con fuente", image: u("photo-1743020612934-02ebb551fd8e"), weights: { clasico: 1 } },
      { text: "Skyline urbano al atardecer", image: u("photo-1541336032412-2048a678540d"), weights: { contemporaneo: 1 } },
      { text: "Desierto con arquitectura minimalista", image: u("photo-1503450843813-359b7b07bd36"), weights: { minimalista: 1 } },
    ],
  },
  {
    id: "cocina",
    prompt: "¿Cuál de estas cocinas elegirías?",
    options: [
      { text: "Estilo rústico con mucha madera", image: u("photo-1628797279405-8cd6ffdbeb6c"), weights: { calido: 1 } },
      { text: "Elegante con acabados en nogal", image: u("photo-1610733374054-59454fe657cd"), weights: { clasico: 1 } },
      { text: "Moderna con isla y acabados oscuros", image: u("photo-1560185008-37a6ea85a4d4"), weights: { contemporaneo: 1 } },
      { text: "Blanca, limpia y minimalista", image: u("photo-1582913130063-8318329a94a3"), weights: { minimalista: 1 } },
    ],
  },
  {
    id: "terraza",
    prompt: "¿Qué tipo de terraza prefieres?",
    options: [
      { text: "Pérgola de madera y fogata", image: u("photo-1527359443443-84a48aec73d2"), weights: { calido: 1 } },
      { text: "Clásica con muebles elegantes y jardín", image: u("photo-1748969721858-85c500eefa78"), weights: { clasico: 1 } },
      { text: "Rooftop moderno con iluminación contemporánea", image: u("photo-1758193431353-87812fbff5cd"), weights: { contemporaneo: 1 } },
      { text: "Minimalista con concreto y tonos claros", image: u("photo-1763454787466-1b44ded32e68"), weights: { minimalista: 1 } },
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
