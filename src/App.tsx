import "./App.css";
import {
  Button,
  Checkbox,
  createTheme,
  Grid,
  Slider,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { generatePassword } from "./generate-password";

const minPasswordLength = 6;
const maxPasswordLength = 20;

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(true);
  const [includeLowercaseCharacters, setIncludeLowercaseCharacters] =
    useState(true);
  const [includeUppercaseCharacters, setIncludeUppercaseCharacters] =
    useState(true);

  const onSliderChange = (e: any) => {
    setPasswordLength(e.target.value);
  };
  const onClickPasswordGenerate = () => {
    setPassword(
      generatePassword({
        length: passwordLength,
        includeNumbers,
        includeSpecialCharacters,
        includeLowercaseCharacters,
        includeUppercaseCharacters,
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="container">
          <div className="title">
            <Typography variant="h3" component="h3">
              Generate sercure password:
            </Typography>
          </div>

          <div className="controls">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                Password length:
              </Grid>
              <Grid className="rightBox" item xs={6}>
                <Slider
                  value={passwordLength}
                  onChange={onSliderChange}
                  defaultValue={8}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  min={minPasswordLength}
                  max={maxPasswordLength}
                />
              </Grid>
              <Grid item xs={6}>
                Include number:
              </Grid>
              <Grid className="rightBox" item xs={6}>
                <Checkbox
                  defaultChecked
                  value={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                <div> e.g. (123456)</div>
              </Grid>
              <Grid item xs={6}>
                Inlude special characters:
              </Grid>
              <Grid className="rightBox" item xs={6}>
                <Checkbox
                  value={includeSpecialCharacters}
                  onChange={(e) =>
                    setIncludeSpecialCharacters(e.target.checked)
                  }
                  defaultChecked
                />{" "}
                <div> e.g. (@#$%/!)</div>
              </Grid>
              <Grid item xs={6}>
                Include Lowercase Characters:
              </Grid>
              <Grid className="rightBox" item xs={6}>
                <Checkbox
                  defaultChecked
                  value={includeLowercaseCharacters}
                  onChange={(e) =>
                    setIncludeLowercaseCharacters(e.target.checked)
                  }
                />{" "}
                <div> e.g. (abcdefgh)</div>
              </Grid>
              <Grid item xs={6}>
                Include Uppercase Characters:
              </Grid>
              <Grid className="rightBox" item xs={6}>
                <Checkbox
                  defaultChecked
                  value={includeUppercaseCharacters}
                  onChange={(e) =>
                    setIncludeUppercaseCharacters(e.target.checked)
                  }
                />
                <div> e.g. (ABCDEFGH)</div>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid className="rightBox" item xs={6}>
                <Button onClick={onClickPasswordGenerate} variant="contained">
                  Generate
                </Button>
              </Grid>
              <Grid item xs={6}>
                Your password:
              </Grid>
              <Grid className="rightBox" item xs={6}>
                <div className="password-container">
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="standard-basic"
                    variant="standard"
                  />
                </div>
                <div className="copy-button-container">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(password);
                    }}
                    variant="contained"
                  >
                    Copy
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
