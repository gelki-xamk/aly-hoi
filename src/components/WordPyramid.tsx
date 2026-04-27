import { useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import type { WordPyramidTask } from "../data/dailyTasks";

type WordPyramidProps = {
  task: WordPyramidTask;
};

type SolvedGroup = {
  category: string;
  words: string[];
};

function shuffleArray(array: string[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function WordPyramid({ task }: WordPyramidProps) {
  const allWords = useMemo(() => {
    return shuffleArray(task.groups.flatMap((group) => group.words));
  }, [task]);

  const [remainingWords, setRemainingWords] = useState<string[]>(allWords);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<SolvedGroup[]>([]);
  const [message, setMessage] = useState("");

  const currentGroupIndex = solvedGroups.length;
  const currentGroup = task.groups[currentGroupIndex];
  const neededCount = currentGroup?.words.length ?? 0;
  const isCompleted = solvedGroups.length === task.groups.length;

  const groupSizes = task.groups.map((group) => group.words.length);

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords((prev) => prev.filter((item) => item !== word));
      return;
    }

    if (selectedWords.length < neededCount) {
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const checkGroup = () => {
    if (!currentGroup) return;

    if (selectedWords.length !== neededCount) {
      setMessage(`Valitse tähän tasoon ${neededCount} sanaa.`);
      return;
    }

    const correctWords = currentGroup.words
      .map((word) => word.toLowerCase())
      .sort();

    const selected = selectedWords.map((word) => word.toLowerCase()).sort();

    const isCorrect =
      correctWords.length === selected.length &&
      correctWords.every((word, index) => word === selected[index]);

    if (!isCorrect) {
      setMessage("Ei aivan. Valitut sanat eivät muodosta oikeaa kategoriaa.");
      return;
    }

    setSolvedGroups((prev) => [
      ...prev,
      {
        category: currentGroup.category,
        words: selectedWords,
      },
    ]);

    setRemainingWords((prev) =>
      prev.filter((word) => !selectedWords.includes(word))
    );

    setSelectedWords([]);
    setMessage("");
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        border: "1px solid #f9a8d4",
        boxShadow: "0 12px 30px rgba(22, 101, 52, 0.12)",
      }}
      elevation={0}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ fontWeight: 800, color: "#166534", mb: 1 }}
      >
        1. {task.title}
      </Typography>

      <Typography component="p" sx={{ mb: 3, color: "#4b5563" }}>
        {task.instruction}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        {groupSizes.map((size, index) => {
          const solved = index < solvedGroups.length;
          const active = index === solvedGroups.length;

          return (
            <Paper
              key={`${size}-${index}`}
              sx={{
                width: `${180 + size * 45}px`,
                maxWidth: "100%",
                p: 1.5,
                borderRadius: 4,
                textAlign: "center",
                backgroundColor: solved
                  ? "#dcfce7"
                  : active
                  ? "#fce7f3"
                  : "#f9fafb",
                border: active
                  ? "2px solid #db2777"
                  : solved
                  ? "2px solid #16a34a"
                  : "1px dashed #d1d5db",
              }}
              elevation={0}
            >
              <Typography sx={{ fontWeight: 800 }}>
                Taso {index + 1}: {size} sanaa
              </Typography>

              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                {solved
                  ? solvedGroups[index].category
                  : active
                  ? `Valitse ${size} sanaa`
                  : "Lukittu"}
              </Typography>
            </Paper>
          );
        })}
      </Box>

      {!isCompleted && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Ratkaistava taso: valitse {neededCount} sanaa. Valittuna{" "}
          {selectedWords.length} / {neededCount}.
        </Alert>
      )}

      <Typography sx={{ fontWeight: 800, mb: 1, color: "#166534" }}>
        Valittavat sanat
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.2,
          mb: 3,
        }}
      >
        {remainingWords.map((word) => {
          const selected = selectedWords.includes(word);

          return (
            <Chip
              key={word}
              label={word}
              onClick={() => toggleWord(word)}
              clickable
              sx={{
                px: 1,
                py: 2.2,
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: 3,
                backgroundColor: selected ? "#16a34a" : "#fce7f3",
                color: selected ? "white" : "#166534",
                border: selected ? "1px solid #15803d" : "1px solid #f9a8d4",
                "&:hover": {
                  backgroundColor: selected ? "#15803d" : "#fbcfe8",
                },
              }}
            />
          );
        })}
      </Box>

      {!isCompleted && (
        <Button
          variant="contained"
          onClick={checkGroup}
          sx={{
            borderRadius: 999,
            backgroundColor: "#16a34a",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#15803d" },
          }}
        >
          Tarkista taso
        </Button>
      )}

      {message && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography
        component="h3"
        variant="h6"
        sx={{ fontWeight: 800, color: "#be185d", mb: 2 }}
      >
        Löydetyt kategoriat
      </Typography>

      <Stack spacing={1.5}>
        {solvedGroups.length === 0 ? (
          <Typography component="p" sx={{ color: "#6b7280" }}>
            Et ole vielä löytänyt yhtään kategoriaa.
          </Typography>
        ) : (
          solvedGroups.map((group) => (
            <Paper
              key={group.category}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "#dcfce7",
                border: "1px solid #86efac",
              }}
              elevation={0}
            >
              <Typography sx={{ fontWeight: 800, color: "#166534" }}>
                {group.category}
              </Typography>
              <Typography>{group.words.join(", ")}</Typography>
            </Paper>
          ))
        )}
      </Stack>

      {isCompleted && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Hienoa! Löysit kaikki kategoriat.
        </Alert>
      )}
    </Paper>
  );
}

export default WordPyramid;