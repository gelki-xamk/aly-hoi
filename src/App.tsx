import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import WordPyramid from "./components/WordPyramid";
import DailyQuiz from "./components/DailyQuiz";
import LogicPuzzle from "./components/LogicPuzzle";
import WordSearchGame from "./components/WordSearchGame";
import {
  getDailyIndex,
  logicTasks,
  quizTasks,
  wordPyramidTasks,
} from "./data/dailyTasks";

function App() {
  const wordTask = wordPyramidTasks[getDailyIndex(wordPyramidTasks.length)];
  const quiz = quizTasks[getDailyIndex(quizTasks.length)];
  const logicTask = logicTasks[getDailyIndex(logicTasks.length)];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #dcfce7 0%, #fce7f3 45%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="md">
        <Header />

        <Stack spacing={4} sx={{ pb: 6 }}>
          <WordPyramid task={wordTask} />
          <DailyQuiz questions={quiz} />
          <LogicPuzzle task={logicTask} />
        <WordSearchGame />
        </Stack>
      </Container>
    </Box>
  );
}

export default App;