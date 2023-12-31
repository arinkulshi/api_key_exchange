const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Expose-Headers", "Retry-After");
  next();
});
app.use(express.json());

let hasPurchased = false;
let idemTokens = [];
let purchaseStatuses = {};

app.get("/video/info", (req, res) => {
  let responseJson = {
    status: "purchased",
    videoUrl:
      "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4",
    title: "Big Buck Bunny",
    id: "5379a5e1-5812-4654-ac7f-4f6d8e84e9d6",
  };
  if (!hasPurchased) {
    const token = uuid();
    idemTokens.push(token);
    responseJson = {
      ...responseJson,
      videoUrl: null,
      status: "available",
      token,
      price: 4.99,
    };
  }
  res.json(responseJson);
});

app.post("/video/purchase", (req, res) => {
  // 500 occasionally because why not
 

app.post('/reset', (req, res) => {
    hasPurchased = false;
    console.log('Reset purchase state');
    res.sendStatus(200);
  });

  const reqJson = req.body;

  if (reqJson.pin !== 1234) {
    res.status(401).json({
      status: "failed",
      message: "Incorrect pin",
    });
    return;
  }

  const token = reqJson.token;
  if (!idemTokens.includes(token)) {
    res.status(400).json({
      status: "failed",
      message: "Invalid token",
    });
    return;
  }

  if (reqJson.id !== "5379a5e1-5812-4654-ac7f-4f6d8e84e9d6") {
    res.status(400).json({
      status: "failed",
      message: "Invalid media id",
    });
    return;
  }

  // look up an existing purchase
  if (purchaseStatuses[token]) {
    if (purchaseStatuses[token] === "waiting") {
      res.setHeader("Retry-After", "2");
    }
    res.json({
      status: purchaseStatuses[token],
      message: "",
    });
    return;
  }

  // or create a new one
  purchaseStatuses[token] = "waiting";
  setTimeout(() => {
    purchaseStatuses[token] = "success";
    hasPurchased = true;
  }, 6000);

  res.json({
    status: "waiting",
    message: "",
  });
});



app.listen(5001, () => {
  console.log("Listening on port 5001!");
});

process.openStdin().on("data", (line) => {
  if (line.toString().trim() === "r") {
    hasPurchased = false;
    console.log("Reset purchase state");
  }
});
