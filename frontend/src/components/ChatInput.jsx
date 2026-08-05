import { useState } from "react";

export default function ChatInput({ onSend }) {
    const [message, setMessage] = useState("");

    function send() {
        if (!message.trim()) return;

        onSend(message);
        setMessage("");
    }

    return (
        <div className="flex gap-2 p-4">
            <input
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask about the weather..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                }}
            />

            <button
                onClick={send}
                className="rounded-lg bg-blue-600 px-5 text-white"
            >
                Send
            </button>
        </div>
    );
}