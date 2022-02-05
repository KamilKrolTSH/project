import Divider from "@mui/material/Divider";
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
          <Divider
            style={{
              border: "none",
              height: "3px",
              color: "#282c34",
              backgroundColor: "#373c46",
            }}
            light
          />
          <div className="bottom-text-container">
            <div>
              To prevent your passwords from being hacked by social engineering,
              brute force or dictionary attack method, and keep your online
              accounts safe, you should notice that:
            </div>
            <div>
              1. Do not use the same password, security question and answer for
              multiple important accounts.
            </div>
            <div>
              2. Use a password that has at least 16 characters, use at least
              one number, one uppercase letter, one lowercase letter and one
              special symbol.
            </div>
            <div>
              3. Do not use the names of your families, friends or pets in your
              passwords.
            </div>
            <div>
              4. Do not use postcodes, house numbers, phone numbers, birthdates,
              ID card numbers, social security numbers, and so on in your
              passwords.
            </div>
            <div>
              5. Do not use any dictionary word in your passwords. Examples of
              strong passwords: ePYHc~dS*)8$+V-' , qzRtC6rXN3N\RgL ,
              zbfUMZPE6`FC%)sZ. Examples of weak passwords: qwert12345,
              Gbt3fC79ZmMEFUFJ, 1234567890, 987654321, nortonpassword.
            </div>
            <div>
              6. Do not use two or more similar passwords which most of their
              characters are same, for example, ilovefreshflowersMac,
              ilovefreshflowersDropBox, since if one of these passwords is
              stolen, then it means that all of these passwords are stolen.
            </div>
            <div>
              7. Do not use something that can be cloned( but you can't change )
              as your passwords, such as your fingerprints.
            </div>
            <div>
              8. Do not let your Web browsers( FireFox, Chrome, Safari, Opera,
              IE, Microsoft Edge ) to store your passwords, since all passwords
              saved in Web browsers can be revealed easily.
            </div>
            <div>
              9. Do not log in to important accounts on the computers of others,
              or when connected to a public Wi-Fi hotspot, Tor, free VPN or web
              proxy.
            </div>
            <div>
              10. Do not send sensitive information online via unencrypted( e.g.
              HTTP or FTP ) connections, because messages in these connections
              can be sniffed with very little effort. You should use encrypted
              connections such as HTTPS, SFTP, FTPS, SMTPS, IPSec whenever
              possible.
            </div>
            <div>
              11. When travelling, you can encrypt your Internet connections
              before they leave your laptop, tablet, mobile phone or router. For
              example, you can set up a private VPN with protocols like
              WireGuard( or IKEv2, OpenVPN, SSTP, L2TP over IPSec ) on your own
              server( home computer, dedicated server or VPS ) and connect to
              it. Alternatively, you can set up an encrypted SSH tunnel between
              your computer and your own server and configure Chrome or FireFox
              to use socks proxy. Then even if somebody captures your data as it
              is transmitted between your device( e.g. laptop, iPhone, iPad )
              and your server with a packet sniffer, they'll won't be able to
              steal your data and passwords from the encrypted streaming data.
            </div>

            <div>
              12. How secure is my password? Perhaps you believe that your
              passwords are very strong, difficult to hack. But if a hacker has
              stolen your username and the MD5 hash value of your password from
              a company's server, and the rainbow table of the hacker contains
              this MD5 hash, then your password will be cracked quickly.
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To check the strength of your
              passwords and know whether they're inside the popular rainbow
              tables, you can convert your passwords to MD5 hashes on a MD5 hash
              generator, then decrypt your passwords by submitting these hashes
              to an online MD5 decryption service. For instance, your password
              is "0123456789A", using the brute-force method, it may take a
              computer almost one year to crack your password, but if you
              decrypt it by submitting its MD5 hash(
              C8E7279CD035B23BB9C0F1F954DFF5B3 ) to a MD5 decryption website,
              how long will it take to crack it? You can perform the test
              yourself.
            </div>

            <div>
              13. It's recommended to change your passwords every 10 weeks.
            </div>
            <div>
              14. It's recommended that you remember a few master passwords,
              store other passwords in a plain text file and encrypt this file
              with 7-Zip, GPG or a disk encryption software such as BitLocker,
              or manage your passwords with a password management software.
            </div>
            <div>
              15. Encrypt and backup your passwords to different locations, then
              if you lost access to your computer or account, you can retrieve
              your passwords back quickly.
            </div>

            <div>16. Turn on 2-step authentication whenever possible.</div>
            <div>17. Do not store your critical passwords in the cloud.</div>
            <div>
              18. Access important websites( e.g. Paypal ) from bookmarks
              directly, otherwise please check its domain name carefully, it's a
              good idea to check the popularity of a website with Alexa toolbar
              to ensure that it's not a phishing site before entering your
              password.
            </div>
            <div>
              19. Protect your computer with firewall and antivirus software,
              block all incoming connections and all unnecessary outgoing
              connections with the firewall. Download software from reputable
              sites only, and verify the MD5 / SHA1 / SHA256 checksum or GPG
              signature of the installation package whenever possible.
            </div>
            <div>
              20. Keep the operating systems( e.g. Windows 7, Windows 10, Mac OS
              X, iOS, Linux ) and Web browsers( e.g. FireFox, Chrome, IE,
              Microsoft Edge ) of your devices( e.g. Windows PC, Mac PC, iPhone,
              iPad, Android tablet ) up-to-date by installing the latest
              security update.
            </div>
            <div>
              21. If there are important files on your computer, and it can be
              accessed by others, check if there are hardware keyloggers( e.g.
              wireless keyboard sniffer ), software keyloggers and hidden
              cameras when you feel it's necessary.
            </div>
            <div>
              22. If there are WIFI routers in your home, then it's possible to
              know the passwords you typed( in your neighbor's house ) by
              detecting the gestures of your fingers and hands, since the WIFI
              signal they received will change when you move your fingers and
              hands. You can use an on-screen keyboard to type your passwords in
              such cases, it would be more secure if this virtual keyboard( or
              soft keyboard ) changes layouts every time.
            </div>
            <div>
              23. Lock your computer and mobile phone when you leave them.{" "}
            </div>
            <div>
              24. Encrypt the entire hard drive with VeraCrypt, FileVault, LUKS
              or similar tools before putting important files on it, and destroy
              the hard drive of your old devices physically if it's necessary.
            </div>
            <div>
              25. Access important websites in private or incognito mode, or use
              one Web browser to access important websites, use another one to
              access other sites. Or access unimportant websites and install new
              software inside a virtual machine created with VMware, VirtualBox
              or Parallels.
            </div>
            <div>
              26. Use at least 3 different email addresses, use the first one to
              receive emails from important sites and Apps, such as Paypal and
              Amazon, use the second one to receive emails from unimportant
              sites and Apps, use the third one( from a different email
              provider, such as Outlook and GMail ) to receive your
              password-reset email when the first one( e.g. Yahoo Mail ) is
              hacked.
            </div>
            <div>
              27. Use at least 2 differnet phone numbers, do NOT tell others the
              phone number which you use to receive text messages of the
              verification codes.
            </div>
            <div>
              28. Do not click the link in an email or SMS message, do not reset
              your passwords by clicking them, except that you know these
              messages are not fake.
            </div>
            <div>29. Do not tell your passwords to anybody in the email.</div>
            <div>
              30. It's possible that one of the software or App you downloaded
              or updated has been modified by hackers, you can avoid this
              problem by not installing this software or App at the first time,
              except that it's published to fix security holes. You can use Web
              based apps instead, which are more secure and portable.
            </div>

            <div>
              31. Be careful when using online paste tools and screen capture
              tools, do not let them to upload your passwords to the cloud.
            </div>
            <div>
              32. If you're a webmaster, do not store the users passwords,
              security questions and answers as plain text in the database, you
              should store the salted ( SHA1, SHA256 or SHA512 )hash values of
              of these strings instead. It's recommended to generate a unique
              random salt string for each user. In addition, it's a good idea to
              log the user's device information( e.g. OS version, screen
              resolution, etc. ) and save the salted hash values of them, then
              when he/she try to login with the correct password but his/her
              device information does NOT match the previous saved one, let this
              user to verify his/her identity by entering another verification
              code sent via SMS or email.
            </div>
            <div>
              33. If you are a software developer, you should publish the update
              package signed with a private key using GnuPG, and verify the
              signature of it with the public key published previously.
            </div>

            <div>
              34. To keep your online business safe, you should register a
              domain name of your own, and set up an email account with this
              domain name, then you'll not lose your email account and all your
              contacts, since your can host your mail server anywhere, your
              email account can't be disabled by the email provider.
            </div>

            <div>
              35. If an online shopping site only allows to make payment with
              credit cards, then you should use a virtual credit card instead.
            </div>

            <div>
              36. Close your web browser when you leave your computer, otherwise
              the cookies can be intercepted with a small USB device easily,
              making it possible to bypass two-step verification and log into
              your account with stolen cookies on other computers.
            </div>

            <div>
              37. Distrust and remove bad SSL certificates from your Web
              browser, otherwise you will NOT be able to ensure the
              confidentiality and integrity of the HTTPS connections which use
              these certificates.
            </div>

            <div>
              38. Encrypt the entire system partition, otherwise please disable
              the pagefile and hibernation functions, since it's possible to
              find your important documents in the pagefile.sys and hiberfil.sys
              files.
            </div>

            <div>
              39. To prevent brute force login attacks to your dedicated
              servers, VPS servers or cloud servers, you can install an
              intrusion detection and prevention software such as LFD( Login
              Failure Daemon ) or Fail2Ban.
            </div>

            <div>
              40. If it's possible, use cloud based software instead of install
              the software on your local device, since there are more and more
              supply-chain attacks which will install malicious application or
              update on your device to steal your passwords and gain access to
              top secret data.
            </div>

            <div>
              41. It's a good idea to generate the MD5 or SHA1 checksums of all
              files on your computer( with software like MD5Summer ) and save
              the result, then check the integrity of your files( and find
              trojan files or programs with backdoor injected ) every day by
              comparing their checksums with the result saved previously.
            </div>

            <div>
              42. Each large company should implement and apply an Artificial
              Intelligence-based intrusion detection system( including network
              behavior anomaly detection tools ).
            </div>

            <div>
              43. Allow only IP addresses that are whitelisted to connect to or
              log into the important servers and computers.
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
