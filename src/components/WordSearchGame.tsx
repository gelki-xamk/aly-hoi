import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";

type Word = {
  word: string;
  positions: number[];
};

const letters = [
  "L", "I", "N", "T", "U",
  "K", "O", "S", "K", "I",
  "K", "O", "I", "V", "U",
  "S", "O", "R", "S", "A",
  "T", "I", "K", "K", "A",
  "M", "E", "T", "S", "Ä",
];

const words: Word[] = [
  { word: "LINTU", positions: [0, 1, 2, 3, 4] },
  { word: "KOSKI", positions: [5, 6, 7, 8, 9] },
  { word: "KOIVU", positions: [10, 11, 12, 13, 14] },
  { word: "SORSA", positions: [15, 16, 17, 18, 19] },
  { word: "TIKKA", positions: [20, 21, 22, 23, 24] },
  { word: "METSÄ", positions: [25, 26, 27, 28, 29] },
];

function WordSearchGame() {
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [hintCount, setHintCount] = useState(0);

  const selectedWord = selectedPositions.map((index) => letters[index]).join("");

  const foundPositions = words
    .filter((word) => foundWords.includes(word.word))
    .flatMap((word) => word.positions);

  const hintPositions = words
    .slice(0, hintCount)
    .map((word) => word.positions[0]);

  const handleLetterClick = (index: number) => {
    if (foundPositions.includes(index)) {
      return;
    }

    if (selectedPositions.includes(index)) {
      setSelectedPositions((prev) => prev.filter((item) => item !== index));
      return;
    }

    setSelectedPositions((prev) => [...prev, index]);
  };

  const handleCheckWord = () => {
    const match = words.find(
      (item) =>
        item.word === selectedWord &&
        item.positions.length === selectedPositions.length &&
        item.positions.every(
          (position, index) => position === selectedPositions[index]
        )
    );

    if (!match) {
      setMessage("Ei vielä oikein. Tarkista kirjainten järjestys.");
      return;
    }

    if (foundWords.includes(match.word)) {
      setMessage("Löysit tämän sanan jo.");
      return;
    }

    setFoundWords((prev) => [...prev, match.word]);
    setSelectedPositions([]);
    setMessage("");
  };

  const handleClearSelection = () => {
    setSelectedPositions([]);
    setMessage("");
  };

  const handleHint = () => {
    if (hintCount < words.length) {
      setHintCount((prev) => prev + 1);
    }
  };

  const allFound = foundWords.length === words.length;

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        border: "1px solid #bbf7d0",
        boxShadow: "0 12px 30px rgba(22, 101, 52, 0.12)",
      }}
      elevation={0}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ fontWeight: 800, color: "#166534", mb: 1 }}
      >
        4. Sananetsintä
      </Typography>

      <Typography component="p" sx={{ mb: 3, color: "#4b5563" }}>
        Etsi ruudukosta kaikki sanat. Kaikki kirjaimet kuuluvat johonkin
        sanaan. Sanat voivat kulkea vaakaan, pystyyn tai viistoon.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 56px)",
          gap: 1,
          justifyContent: "center",
          mb: 3,
        }}
      >
        {letters.map((letter, index) => {
          const selected = selectedPositions.includes(index);
          const found = foundPositions.includes(index);
          const hint = hintPositions.includes(index);

          return (
            <Button
              key={`${letter}-${index}`}
              onClick={() => handleLetterClick(index)}
              sx={{
                width: 56,
                height: 56,
                minWidth: 56,
                borderRadius: 3,
                fontWeight: 900,
                fontSize: "1.2rem",
                color: found || selected ? "white" : "#166534",
                backgroundColor: found
                  ? "#16a34a"
                  : selected
                  ? "#db2777"
                  : hint
                  ? "#fde68a"
                  : "#fce7f3",
                border: hint ? "3px solid #f59e0b" : "1px solid #f9a8d4",
                "&:hover": {
                  backgroundColor: selected ? "#be185d" : "#fbcfe8",
                },
              }}
            >
              {letter}
            </Button>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Valittu sana: {selectedWord || "—"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleCheckWord}
            disabled={selectedPositions.length === 0}
            sx={{
              borderRadius: 999,
              backgroundColor: "#16a34a",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#15803d" },
            }}
          >
            Tarkista sana
          </Button>

          <Button
            variant="outlined"
            onClick={handleClearSelection}
            sx={{ borderRadius: 999 }}
          >
            Tyhjennä valinta
          </Button>

          <Button
            variant="contained"
            onClick={handleHint}
            disabled={hintCount >= words.length}
            sx={{
              borderRadius: 999,
              backgroundColor: "#db2777",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#be185d" },
            }}
          >
            Vihje
          </Button>
        </Box>

        {message && <Alert severity="warning">{message}</Alert>}

        <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
          <Typography sx={{ fontWeight: 800, mb: 1, color: "#be185d" }}>
            Löydetyt sanat
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {foundWords.length === 0 ? (
              <Typography sx={{ color: "#6b7280" }}>
                Et ole vielä löytänyt sanoja.
              </Typography>
            ) : (
              foundWords.map((word) => (
                <Chip
                  key={word}
                  label={word}
                  sx={{
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                    fontWeight: 700,
                  }}
                />
              ))
            )}
          </Box>
        </Box>

        {allFound && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Hienoa! Löysit kaikki sanat.
          </Alert>
        )}
      </Box>
    </Paper>
  );
}

export default WordSearchGame;