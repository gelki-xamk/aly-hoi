import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import type { QuizQuestion } from "../data/dailyTasks";

type DailyQuizProps = {
  questions: QuizQuestion[];
};

function DailyQuiz({ questions }: DailyQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setHasAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setHasAnswered(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer("");
    setHasAnswered(false);
    setScore(0);
  };

  const quizFinished = currentIndex >= questions.length;

  if (quizFinished) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          border: "1px solid #bbf7d0",
          boxShadow: "0 12px 30px rgba(219, 39, 119, 0.10)",
        }}
        elevation={0}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{ fontWeight: 800, color: "#be185d", mb: 2 }}
        >
          2. Päivän tietovisa
        </Typography>

        <Alert severity={score >= 7 ? "success" : "info"} sx={{ mb: 3 }}>
          Tietovisa valmis! Sait oikein {score} / {questions.length}.
        </Alert>

        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{
            borderRadius: 999,
            backgroundColor: "#db2777",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#be185d" },
          }}
        >
          Aloita tietovisa uudelleen
        </Button>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        border: "1px solid #bbf7d0",
        boxShadow: "0 12px 30px rgba(219, 39, 119, 0.10)",
      }}
      elevation={0}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ fontWeight: 800, color: "#be185d", mb: 1 }}
      >
        2. Päivän tietovisa
      </Typography>

      <Typography component="p" sx={{ mb: 2, color: "#4b5563" }}>
        Vastaa yhteen kysymykseen kerrallaan. Näet heti, menikö vastaus oikein.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          Kysymys {currentIndex + 1} / {questions.length}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 999,
            backgroundColor: "#fce7f3",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#db2777",
            },
          }}
        />
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: "#fdf2f8",
          border: "1px solid #fbcfe8",
        }}
        elevation={0}
      >
        <Typography sx={{ fontWeight: 800, mb: 2 }}>
          {currentQuestion.question}
        </Typography>

        <RadioGroup
          value={selectedAnswer}
          onChange={(event) => setSelectedAnswer(event.target.value)}
        >
          {currentQuestion.options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              disabled={hasAnswered}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </Paper>

      {hasAnswered && (
        <Alert severity={isCorrect ? "success" : "error"} sx={{ mt: 3 }}>
          {isCorrect
            ? "Oikein! Hyvä vastaus."
            : `Väärin. Oikea vastaus on: ${currentQuestion.correctAnswer}.`}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        {!hasAnswered ? (
          <Button
            variant="contained"
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
            sx={{
              borderRadius: 999,
              backgroundColor: "#db2777",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#be185d" },
            }}
          >
            Tarkista vastaus
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={
              isLastQuestion
                ? () => setCurrentIndex(questions.length)
                : handleNextQuestion
            }
            sx={{
              borderRadius: 999,
              backgroundColor: "#16a34a",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#15803d" },
            }}
          >
            {isLastQuestion ? "Näytä tulos" : "Seuraava kysymys"}
          </Button>
        )}
      </Stack>

      <Typography component="p" sx={{ mt: 2, color: "#6b7280" }}>
        Tämänhetkinen pistemäärä: {score} / {questions.length}
      </Typography>
    </Paper>
  );
}

export default DailyQuiz;