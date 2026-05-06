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
        <p>Temperature: <span id="temp">--</span> °C</p>
        <p>Humidity: <span id="hum">--</span> %</p>
        <p>Lux: <span id="lux">--</span> lx</p>
        <p>Lamp: <span id="lamp">unknown</span></p>
      </div>

      <div class="card">
        <h2>Lamp Control</h2>
        <button class="on" onclick="sendCommand('on')">ON</button>
        <button class="off" onclick="sendCommand('off')">OFF</button>
      </div>

      <script>
        async function loadData() {
          const res = await fetch("/data");
          const data = await res.json();

          document.getElementById("temp").innerText = data.temp;
          document.getElementById("hum").innerText = data.hum;
          document.getElementById("lux").innerText = data.lux;
          document.getElementById("lamp").innerText = data.lampStatus;
        }

        async function sendCommand(state) {
          await fetch("/command", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ lamp: state })
          });

          document.getElementById("lamp").innerText = state;
        }

        loadData();
        setInterval(loadData, 1000);
      </script>
    </body>
    </html>
  `);
});

app.get("/data", (req, res) => {
  res.json(sensorData);
});

app.post("/command", (req, res) => {
  const lamp = req.body.lamp;

  if (lamp === "on" || lamp === "off") {
    lampCommand = lamp;
    console.log("New command:", lamp);
    return res.json({ success: true });
  }

  res.status(400).json({ success: false });
});

app.get("/command", (req, res) => {
  res.json({ lamp: lampCommand });
  lampCommand = "none";
});

app.post("/update", (req, res) => {
  sensorData = req.body;
  console.log("Sensor update:", sensorData);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});