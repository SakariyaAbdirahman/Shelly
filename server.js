const express = require("express");
const app = express();

app.use(express.json());

let lampCommand = "none";

let sensorData = {
  temp: 0,
  hum: 0,
  lux: 0,
  lampStatus: "unknown"
};

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ESP32 Dashboard</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="refresh" content="1">

      <style>
        body {
          font-family: Arial;
          background: #111;
          color: white;
          text-align: center;
          padding: 20px;
        }

        .card {
          background: #222;
          padding: 20px;
          border-radius: 15px;
          margin: 20px auto;
          max-width: 400px;
        }

        button {
          font-size: 24px;
          padding: 15px 30px;
          margin: 10px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }

        .on {
          background: #22c55e;
          color: white;
        }

        .off {
          background: #ef4444;
          color: white;
        }
      </style>
    </head>

    <body>
      <h1>ESP32 Dashboard</h1>

      <div class="card">
        <h2>Sensor Data</h2>
        <p>Temperature: ${sensorData.temp} °C</p>
        <p>Humidity: ${sensorData.hum} %</p>
        <p>Lux: ${sensorData.lux} lx</p>
        <p>Lamp: ${sensorData.lampStatus}</p>
      </div>

      <div class="card">
        <h2>Lamp Control</h2>
        <a href="/on"><button class="on">ON</button></a>
        <a href="/off"><button class="off">OFF</button></a>
      </div>

      <div class="card">
        <p>Current command: ${lampCommand}</p>
      </div>
    </body>
    </html>
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
  res.json({
    lamp: lampCommand
  });

  lampCommand = "none";
});

app.post("/update", (req, res) => {
  sensorData = req.body;

  console.log("Sensor update:", sensorData);

  res.json({
    success: true
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});