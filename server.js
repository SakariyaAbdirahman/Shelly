const express = require("express");
const app = express();

app.use(express.json());

let lampCommand = "off";
let sensorData = { temp: 0, hum: 0, lux: 0, lampStatus: "unknown" };

app.get("/", (req, res) => {
  res.send(`
    <h1>ESP32 Dashboard</h1>
    <p>Temp: ${sensorData.temp} C</p>
    <p>Humidity: ${sensorData.hum} %</p>
    <p>Lux: ${sensorData.lux}</p>
    <p>Lamp: ${sensorData.lampStatus}</p>

    <a href="/on"><button>ON</button></a>
    <a href="/off"><button>OFF</button></a>

    <p>Command: ${lampCommand}</p>
  `);
});

app.get("/on", (req, res) => {
  lampCommand = "on";
  res.redirect("/");
});

app.get("/off", (req, res) => {
  lampCommand = "off";
  res.redirect("/");
});

app.get("/command", (req, res) => {
  res.json({ lamp: lampCommand });
});

app.post("/update", (req, res) => {
  sensorData = req.body;
  res.send("OK");
});
/*
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});