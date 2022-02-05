interface GeneratePasswordIput {
  length: number;
  includeSpecialCharacters: boolean;
  includeNumbers: boolean;
  includeLowercaseCharacters: boolean;
  includeUppercaseCharacters: boolean;
}

const specialCharacters = [
  "^",
  "$",
  "*",
  ".",
  "[",
  "]",
  "{",
  "}",
  "(",
  ")",
  "?",
  `"`,
  "!",
  "@",
  "#",
  "%",
  "&",
  "/",
  ",",
  ">",
  "<",
  "'",
  ":",
  ";",
  "|",
  "_",
  "~",
  "`",
  "=",
  "v",
  "-",
];

const getRandomElementFromArray = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const getRandomNumber = () => (Math.floor(Math.random() * 10) + 1).toString();
const getRandomSpecialCharacter = () =>
  getRandomElementFromArray(specialCharacters);
const getRandomLowercaseCharacter = () =>
  String.fromCharCode(getRandomArbitrary(97, 122));
const getRandomUppercaseCharacter = () =>
  String.fromCharCode(getRandomArbitrary(65, 90));

export const generatePassword = ({
  length,
  includeNumbers,
  includeSpecialCharacters,
  includeLowercaseCharacters,
  includeUppercaseCharacters,
}: GeneratePasswordIput) => {
  let password = "";
  const generators: (() => string)[] = [];

  if (includeNumbers) {
    generators.push(getRandomNumber);
    password = password.concat(getRandomNumber());
  }

  if (includeSpecialCharacters) {
    generators.push(getRandomSpecialCharacter);
    password = password.concat(getRandomSpecialCharacter());
  }

  if (includeLowercaseCharacters) {
    generators.push(getRandomLowercaseCharacter);
    password = password.concat(getRandomLowercaseCharacter());
  }

  if (includeUppercaseCharacters) {
    generators.push(getRandomUppercaseCharacter);
    password = password.concat(getRandomUppercaseCharacter());
  }

  if (generators.length === 0) {
    return "";
  }

  const charactersToGenerate = length - password.length;

  for (let i = 0; i < charactersToGenerate; i++) {
    const randomCharacter = getRandomElementFromArray(generators)();
    password = password.concat(randomCharacter);
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};
