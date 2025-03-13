# Social Network

## Описание

Social Network is a web application for creating and managing social networks. Users can register, create profiles, add friends, post updates, and comment.

## Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS, DaisyUI
- **Backend**: Express.js, MongoDB
- **Tools**: Docker, Vite, TypeScript

## Installation and Setup

### Local Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/vostavhy/social-network.git
   cd social-network
   ```

2. Rename a .env.example file in the root folder to .env.

3. Ensure Docker and Docker Compose are installed on your machine.

4. Start the project:
   ```sh
   docker-compose up --build
   ```
5. Open the browser and navigate to `http://localhost:8080`

## Scripts

### Frontend (react-client)

- `npm run dev`: Start in development mode
- `npm run build`: Build the project
- `npm run preview`: Preview the built project
- `npm run format`: Format code with Prettier
- `npm run lint`: Run linter
- `npm run lint:fix`: Fix linter errors
- `npm run type-check`: TypeScript type checking

### Бэкенд (api)

- `npm start`: Start the server
- `npm run dev`: Start the server in development mode
- `npm run docker`: Launch Mongo DB in docker container

## Project Structure

```plaintext
social-network/
├── api/                   # Backend
│   ├── src/
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── react-client/           # Frontend
│   ├── src/
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── [docker-compose.yaml](http://_vscodecontentref_/1)    # Docker Compose configuration
└── [README.md](http://_vscodecontentref_/2)              # Project documentation
```
