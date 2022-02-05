import PolicyIcon from "@mui/icons-material/Policy";

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
import { useEffect, useState } from "react";
import { generatePassword } from "./generate-password";

import plant from "./images/plant.png";
import tree from "./images/tree.png";
import trees from "./images/trees.png";

enum PasswordType {
  VERY_WEAK = "VERY WEAK",
  WEAK = "WEAK",
  GOOD = "GOOD",
  STRONG = "STRONG",
  VERY_STRONG = "VERY STRONG",
}

enum ColorType {
  GREEN = "font-green",
  BLUE = "font-blue",
  RED = "font-red",
}

const getPasswordType = (length: number) => {
  if (length <= 5) {
    return PasswordType.VERY_WEAK;
  } else if (length <= 7) {
    return PasswordType.WEAK;
  } else if (length <= 9) {
    return PasswordType.GOOD;
  } else if (length <= 11) {
    return PasswordType.STRONG;
  }
  return PasswordType.VERY_STRONG;
};

const getPasswordColor = (length: number) => {
  if (length <= 7) {
    return ColorType.RED;
  } else if (length <= 11) {
    return ColorType.BLUE;
  }
  return ColorType.GREEN;
};

const getImage = (length: number) => {
  if (length <= 7) {
    return plant;
  } else if (length <= 11) {
    return tree;
  }
  return trees;
};

const minPasswordLength = 4;
const maxPasswordLength = 30;

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(15);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(true);
  const [includeLowercaseCharacters, setIncludeLowercaseCharacters] =
    useState(true);
  const [includeUppercaseCharacters, setIncludeUppercaseCharacters] =
    useState(true);
  const [passwordStrength, setPasswordStrength] = useState(
    PasswordType.VERY_STRONG
  );
  const [passwordStrengthColor, setPasswordStrengthColor] =
    useState("font-green");

  const [image, setImage] = useState(trees);

  useEffect(() => {
    setPasswordStrength(getPasswordType(passwordLength));
  }, [passwordLength]);

  const generateAndSetPassword = () => {
    setPassword(
      generatePassword({
        length: passwordLength,
        includeNumbers,
        includeSpecialCharacters,
        includeLowercaseCharacters,
        includeUppercaseCharacters,
      })
    );

    setPasswordStrengthColor(getPasswordColor(passwordLength));

    setImage(getImage(passwordLength));
  };

  const onSliderChange = (e: any) => {
    setPasswordLength(e.target.value);
    generateAndSetPassword();
  };
  const onClickPasswordGenerate = () => generateAndSetPassword();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="container">
          <div className="controls">
            <div className="image-container">
              <img className="image-main" src={image} alt="Logo" />
            </div>
            <div className="controls-right">
              <div className="controls-right-top">
                <PolicyIcon
                  style={{ fontSize: 80, marginRight: "10px" }}
                  className="my-svg"
                />
                <div style={{ fontSize: 24 }}>
                  <div>GENERATE</div>
                  <div>SECURE PASSWORD</div>
                </div>
              </div>
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
                    marks
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
                <Grid style={{ marginTop: "25px" }} item xs={6}>
                  PASSWORD:
                  <div
                    style={{ fontSize: 13 }}
                    className={passwordStrengthColor}
                  >
                    {passwordStrength}
                  </div>
                </Grid>
                <Grid className="rightBox" item xs={6}>
                  <div className="password-container">
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="standard-basic"
                      variant="standard"
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="copy-button-container"></div>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid
                  className="rightBox controll-buttons-container"
                  item
                  xs={6}
                >
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(password);
                    }}
                    variant="contained"
                  >
                    Copy
                  </Button>
                  <Button onClick={onClickPasswordGenerate} variant="contained">
                    Generate
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
