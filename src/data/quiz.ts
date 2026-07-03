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
