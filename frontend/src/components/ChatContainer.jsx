import { useState } from "react";
import api from "../services/api";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import Loading from "./Loading";

export default function ChatContainer() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function sendMessage(message) {
        // Add user's message
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: message,
            },
        ]);

        setLoading(true);

        try {
            const threadId = localStorage.getItem("thread_id");

            const payload = {
                message,
            };

            // Send thread_id only if it already exists
            if (threadId) {
                payload.thread_id = threadId;
            }

            const res = await api.post("/chat", payload);

            // Save generated thread_id (first request)
            if (res.data.thread_id) {
                localStorage.setItem(
                    "thread_id",
                    res.data.thread_id
                );
            }

            // Add assistant's response
            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: res.data.response,
                },
            ]);
        } catch (err) {
            console.error(err);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: "Unable to contact backend.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        sender={msg.sender}
                        text={msg.text}
                    />
                ))}

                {loading && <Loading />}
            </div>

            <ChatInput onSend={sendMessage} />
        </div>
    );
}