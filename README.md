# Aerospace Control Panel

This is a project to implement a control panel of an spacecraft by Efdal YALCIN.

This project is created using React, TypeScript, Vite, Zustand, React Query, SCSS(SASS), ChartJS, Vitest, Websocket

## Installation
Ensure you have Node.js installed on your machine.

Clone the repository to your local environment.

Open a terminal and navigate to the project directory.

Run the following command to install dependencies:

`npm install`

## Usage
After installation, you can run the project using the following command:

`npm run dev`

This will start the development server, and you can access the application in your web browser at http://localhost:5173 or as shown in your terminal.

## Pages
1. Instant Data
The "Instant Data" page displays four properties using the Chart.js library: velocity, acceleration, altitude, and ascending/descending status. The properties are updated on every page reload or button click. The project status string is also displayed.

### Modal Actions:
If immediate action is required, a modal will prompt you with two actions: "Postpone" and "Take Action."

You can postpone up to 5 times, with each postponement lasting for 3 seconds.

After 5 postponements, you must take an action, which triggers a data fetch.


2. Continuous Data Flow
The "Continuous Data Flow" page utilizes a WebSocket API to display the same properties as the "Instant Data" page. However, the data is updated continuously every 500 milliseconds.

### Legend
A legend is positioned at the bottom right of both pages to provide additional information or key insights.

Additional Information
For any further assistance or inquiries, please contact yalcinefdal@gmail.com.

