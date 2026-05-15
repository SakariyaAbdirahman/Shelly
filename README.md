# ESP32 and Shelly Plug S Gen3 Smart Home Project

An IoT smart home system that allows a user to remotely monitor and control a lamp connected to a Shelly Plug S Gen3 using an ESP32.

## Hardware Used
ESP32 development board
Shelly Plug S Gen3 smart plug
TSL2591 light sensor
DHT22 temperature and humidity sensor

## System Overview

The ESP32 and Shelly Plug S Gen3 must be connected to the same 2.4 GHz Wi-Fi network.

### The ESP32:
- Collects sensor data
- Communicates with the Shelly Plug S Gen3 over Wi-Fi
- Monitors lamp status using the light sensor
- Measures environmental conditions using the DHT22 sensor

## Sensor Functionality
### TSL2591 Light Sensor

The TSL2591 lux sensor is used to detect whether the lamp is ON or OFF.

When the lamp is turned ON, the measured light intensity (lux value) increases.
When the lamp is turned OFF, the lux value decreases.
### DHT22 Sensor

The DHT22 sensor measures:
- Temperature
- Humidity
This extends the project into a more complete smart home monitoring system.
