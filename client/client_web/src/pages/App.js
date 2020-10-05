import React from "react";
import Login from "./Login";
import Home from "./Home";
import useLocalStorage from "../hooks/useLocalStorage";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const HomeStack = (
    <SocketProvider id={id}>
      <Home id={id} />
    </SocketProvider>
  );
  return id ? HomeStack : <Login onIdSubmit={setId} />;
}

export default App;
