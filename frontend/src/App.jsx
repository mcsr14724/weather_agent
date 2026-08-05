import Navbar from "./components/Navbar";
import ChatContainer from "./components/ChatContainer";

function App() {
  return (
    <div className="flex h-screen flex-col bg-slate-900">
      <Navbar />

      <div className="mx-auto flex w-full max-w-4xl flex-1">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;