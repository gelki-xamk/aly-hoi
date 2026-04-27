import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

function Header() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 5,
        px: 2,
      }}
    >
      <Chip
        label="Päivän pähkäilyt"
        sx={{
          mb: 2,
          backgroundColor: "#fce7f3",
          color: "#166534",
          fontWeight: 700,
        }}
      />

      <Typography
        component="h1"
        variant="h3"
        sx={{
          fontWeight: 900,
          color: "#166534",
          mb: 1,
        }}
      >
        Kolme pientä aivojumppaa päivään
      </Typography>

      <Typography
        component="p"
        variant="h6"
        sx={{
          color: "#4b5563",
          maxWidth: 720,
          mx: "auto",
        }}
      >
        Ratkaise päivän sanatehtävä, testaa tietosi visassa ja kokeile lopuksi
        loogista päättelyä.
      </Typography>
    </Box>
  );
}

export default Header;