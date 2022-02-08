const axios = require("axios");

const API = "https://api.smitegame.com/smiteapi.svc/";
const DEV_ID = 4198;
const AUTH_KEY = "D49468965D39451BA38CD34BFAA18B65";

const moments = require("moment");
function getTimeStamp() {
  return moments.utc().format("YYYYMMDDHHmmss");
}
const timeStampNow = getTimeStamp();

const md5 = require("md5");
function generateSignature(devId, method, authKey, timestamp) {
  return md5(`${devId}${method}${authKey}${timestamp}`);
}

function getNewSession() {
  let signature = generateSignature(
    DEV_ID,
    "createsession",
    AUTH_KEY,
    timeStampNow
  );

  return new Promise((resolve) => {
    resolve(
      axios
        .get(`${API}/createsessionjson/${DEV_ID}/${signature}/${timeStampNow}`)
        .then((response) => response.data.session_id)
        .catch(console.error)
    );
  });
}

async function getPlayerId(playerName) {
  let signature = generateSignature(
    DEV_ID,
    "getplayer",
    AUTH_KEY,
    timeStampNow
  );
  let sessionId = await getNewSession();

  return new Promise((resolve) => {
    resolve(
      axios
        .get(
          `${API}/getplayerjson/${DEV_ID}/${signature}/${sessionId}/${timeStampNow}/${playerName}`
        )
        .then((response) => response.data[0].Id)
        .catch(console.error)
    );
  });
}

async function getPlayerStatus(playerName) {
  let signature = generateSignature(
    DEV_ID,
    "getplayerstatus",
    AUTH_KEY,
    timeStampNow
  );

  let sessionId = await getNewSession();
  let playerId = await getPlayerId(playerName);

  console.log(`Status do player: ${playerName}`);

  axios
    .get(
      `${API}/getplayerstatusjson/${DEV_ID}/${signature}/${sessionId}/${timeStampNow}/${playerId}`
    )
    .then((response) => console.log(response.data))
    .catch(console.error);
}

getPlayerStatus("lRafaelXx");

//console.log(getPlayer("KilluaHashire"));

/*const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const request = require("request");

const PORT = 3000;
const API = "https://api.smitegame.com/smiteapi.svc/";
const DEV_ID = 4198;
const AUTH_KEY = "D49468965D39451BA38CD34BFAA18B65";

const moments = require("moment");
function getTimeStamp() {
  return moments.utc().format("YYYYMMDDHHmmss");
}

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["token", "content-type"],
  })
);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/app.html"));
});

app.get("/session", (req, res) => {
  const urlSession = `${API}/createsessionjson/${DEV_ID}/${AUTH_KEY}/${getTimeStamp()}`;

  const options = {
    url: encodeURI(urlSession),
    method: "GET",
  };

  request.get(options, function (error, resp, body) {
    if (!!resp && !!res.statusCode) {
      res.status(resp.statusCode).send(body);
    } else {
      res.status(500).send(error);
    }

    console.log(resp.statusCode);
    console.log(error);
  });
});

app.use("/", router);
app.listen(PORT);

console.log("Servidor Rodando");*/
