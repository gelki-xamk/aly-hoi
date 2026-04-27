import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import type { LogicTask } from "../data/dailyTasks";

type LogicPuzzleProps = {
  task: LogicTask;
};

function LogicPuzzle({ task }: LogicPuzzleProps) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  const isCorrect = answer === task.correctAnswer;

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        border: "1px solid #86efac",
        boxShadow: "0 12px 30px rgba(22, 101, 52, 0.12)",
      }}
      elevation={0}
    >
      <Typography component="h2" variant="h4" sx={{ fontWeight: 800, color: "#166534", mb: 1 }}>
        3. Looginen päättely
      </Typography>

      <Typography component="h3" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {task.title}
      </Typography>

      <Typography component="p" sx={{ mb: 2, color: "#4b5563" }}>
        {task.description}
      </Typography>

      <Typography sx={{ fontWeight: 700, mb: 1 }}>{task.question}</Typography>

      <RadioGroup value={answer} onChange={(event) => setAnswer(event.target.value)}>
        {task.options.map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>

      <Button
        variant="contained"
        onClick={() => setChecked(true)}
        sx={{
          mt: 2,
          borderRadius: 999,
          backgroundColor: "#16a34a",
          fontWeight: 700,
          "&:hover": { backgroundColor: "#15803d" },
        }}
      >
        Tarkista päättely
      </Button>

      {checked && (
        <Alert severity={isCorrect ? "success" : "error"} sx={{ mt: 3 }}>
          {isCorrect
            ? "Oikein! Päättelysi osui kohdalleen."
            : `Ei aivan. Oikea vastaus on: ${task.correctAnswer}.`}
        </Alert>
      )}
    </Paper>
  );
}

export default LogicPuzzle;