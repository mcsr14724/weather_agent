import Navbar from "./components/Navbar";
import ChatContainer from "./components/ChatContainer";

function App() {
  return (
    <div className="flex h-screen min-h-0 flex-col bg-slate-900">
      <Navbar />

      <div className="flex min-h-0 w-full flex-1">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;