import { useState } from "react";
import api from "../services/api";

export default function ChatBox() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    async function sendMessage() {
        if (!message.trim()) return;

        try {
            const thread_id = localStorage.getItem("thread_id");

            const res = await api.post("/chat", {
                message,
                thread_id,
            });

            setResponse(res.data.response);

            localStorage.setItem(
                "thread_id",
                res.data.thread_id
            );

            setMessage("");
        } catch (err) {
            console.error(err);
            setResponse("Error contacting backend.");
        }
    }

    return (
        <div className="w-full max-w-3xl space-y-4">
            <textarea
                className="w-full rounded border p-3 text-black"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about the weather..."
            />

            <button
                onClick={sendMessage}
                className="rounded bg-blue-600 px-5 py-2 text-white"
            >
                Send
            </button>

            <div className="rounded bg-slate-800 p-4 text-white min-h-32">
                {response}
            </div>
        </div>
    );
}