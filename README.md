This mini project consist of: 
  - A simple dashboard client that will take in "ticker" name as query keyword, after taking in a valid "ticker" keyword, the web API will send data that match "ticker" name every 5 seconds
    - Port to dashboard client: localhost:3050
  - A simple Web API that use websocket to run a real time data, the Web API will update/save all data everyone 1 hour to MongoDB
    - Websocket available at: ws://localhost:3000 

To use this project, simple run "docker-compose up --build" on the terminal, at the project directory
