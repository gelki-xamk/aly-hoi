export type WordGroup = {
  category: string;
  words: string[];
};

export type WordPyramidTask = {
  title: string;
  instruction: string;
  groups: WordGroup[];
};
export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type LogicTask = {
  title: string;
  description: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export const wordPyramidTasks: WordPyramidTask[] = [
  {
    title: "Sanapyramidi",
    instruction:
      "Valitse sanoista ryhmiä. Ensimmäiseen ryhmään kuuluu 5 sanaa, seuraavaan 4, sitten 3, 2 ja lopuksi 1 sana. Kategoriat täytyy päätellä itse.",
    groups: [
      {
        category: "Metsän eläimet",
        words: ["kettu", "jänis", "hirvi", "orava", "karhu"],
      },
      {
        category: "Marjat",
        words: ["mustikka", "puolukka", "vadelma", "lakka"],
      },
      {
        category: "Sääilmiöt",
        words: ["sade", "tuuli", "ukkonen"],
      },
      {
        category: "Vuodenajat",
        words: ["kevät", "syksy"],
      },
      {
        category: "Yksittäinen sana",
        words: ["aurinko"],
      },
    ],
  },
];

export const quizTasks: QuizQuestion[][] = [
  [
    {
      question: "Mikä on Suomen pääkaupunki?",
      options: ["Turku", "Helsinki", "Tampere", "Oulu"],
      correctAnswer: "Helsinki",
    },
    {
      question: "Mikä planeetta tunnetaan punaisena planeettana?",
      options: ["Venus", "Mars", "Jupiter", "Merkurius"],
      correctAnswer: "Mars",
    },
    {
      question: "Kuinka monta vuodenaikaa Suomessa yleensä erotetaan?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
    },
    {
      question: "Mikä eläin rakentaa padon?",
      options: ["Kettu", "Majava", "Hirvi", "Siili"],
      correctAnswer: "Majava",
    },
    {
      question: "Mikä on veden kemiallinen kaava?",
      options: ["CO2", "H2O", "O2", "NaCl"],
      correctAnswer: "H2O",
    },
    {
      question: "Mikä näistä on ohjelmointikieli?",
      options: ["React", "TypeScript", "Chrome", "GitHub"],
      correctAnswer: "TypeScript",
    },
    {
      question: "Mikä lintu on Suomen kansallislintu?",
      options: ["Laulujoutsen", "Varis", "Pöllö", "Peippo"],
      correctAnswer: "Laulujoutsen",
    },
    {
      question: "Mikä seuraavista on selain?",
      options: ["VS Code", "Chrome", "Node", "Vite"],
      correctAnswer: "Chrome",
    },
    {
      question: "Montako päivää on karkausvuoden helmikuussa?",
      options: ["27", "28", "29", "30"],
      correctAnswer: "29",
    },
    {
      question: "Mikä on 5 × 6?",
      options: ["25", "30", "35", "40"],
      correctAnswer: "30",
    },
  ],
];

export const logicTasks: LogicTask[] = [
  {
    title: "Kahvikuppien arvoitus",
    description:
      "Kolmella ystävällä on kupit eri väreissä: vihreä, vaaleanpunainen ja valkoinen. Aino ei juo vihreästä kupista. Bea ei juo valkoisesta kupista. Cia juo vaaleanpunaisesta kupista.",
    question: "Minkä värisestä kupista Aino juo?",
    options: ["Vihreä", "Vaaleanpunainen", "Valkoinen"],
    correctAnswer: "Valkoinen",
  },
  {
    title: "Lintu oksalla",
    description:
      "Oksalla istuu kolme lintua. Punainen lintu ei ole keskellä. Sininen lintu on vasemmalla. Keltainen lintu ei ole vasemmalla.",
    question: "Mikä lintu on keskellä?",
    options: ["Punainen", "Sininen", "Keltainen"],
    correctAnswer: "Keltainen",
  },
  {
    title: "Kirjat hyllyssä",
    description:
      "Hyllyssä on kolme kirjaa: vihreä, pinkki ja sininen. Vihreä kirja ei ole oikealla. Pinkki kirja on sinisen vasemmalla puolella.",
    question: "Mikä kirja on vasemmalla?",
    options: ["Vihreä", "Pinkki", "Sininen"],
    correctAnswer: "Pinkki",
  },
];

export function getDailyIndex(length: number) {
  const today = new Date();
  const dateNumber =
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  return dateNumber % length;
}