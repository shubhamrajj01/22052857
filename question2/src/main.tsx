import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { SocketProvider } from './contexts/SocketContext';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found!");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>
);