# Sensor Inventory App - Backend

## Overview
This backend application is designed to monitor sensors (temperature, smoke, gas) and manage inventory. It listens for MQTT messages, stores alerts in MongoDB, and exposes REST APIs for the mobile application to query inventory and alerts.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- MQTT (for sensor data)
- dotenv (for environment variable management)

## Project Structure
```
backend
├── src
│   ├── controllers         # Contains request handlers for alerts and inventory
│   ├── models              # Contains Mongoose schemas for alerts and inventory
│   ├── routes              # Contains route definitions for the API
│   ├── mqtt-listener.js    # Listens to MQTT messages and saves alerts to MongoDB
│   ├── app.js              # Entry point of the application
│   └── config              # Contains database connection logic
├── .env                    # Environment variables for configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Documentation for the backend application
```

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- MQTT broker (e.g., CloudMQTT)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd sensor-inventory-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   MQTT_HOST=<your_mqtt_host>
   MQTT_PORT=<your_mqtt_port>
   MQTT_USER=<your_mqtt_username>
   MQTT_PASS=<your_mqtt_password>
   ```

### Running the Application
1. Start the backend server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000` by default.

### API Endpoints
- **Alerts**
  - `GET /api/alertas` - Fetch all alerts
- **Inventory**
  - `GET /api/inventario` - Fetch all inventory items

## Future Enhancements
- Implement user authentication and authorization.
- Add more detailed logging and error handling.
- Consider deploying the application to a cloud provider (e.g., AWS, Heroku).

## License
This project is licensed under the MIT License.