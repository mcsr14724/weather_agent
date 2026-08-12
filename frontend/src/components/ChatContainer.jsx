import { useEffect, useRef, useState } from "react";
import api from "../services/api";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import Loading from "./Loading";

export default function ChatContainer() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [language, setLanguage] = useState("en-IN");

    // Reference to the bottom of the message area
    const messagesEndRef = useRef(null);

    // Automatically scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    async function sendMessage(message) {
        if (!message.trim()) {
            return;
        }

        // Add user's message
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: message,
                language: language,
            },
        ]);

        setLoading(true);

        try {
            const threadId = localStorage.getItem("thread_id");

            const payload = {
                message,
            };

            if (threadId) {
                payload.thread_id = threadId;
            }

            const res = await api.post("/chat", payload);

            // Save thread ID
            if (res.data.thread_id) {
                localStorage.setItem(
                    "thread_id",
                    res.data.thread_id
                );
            }

            // Add assistant response
            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: res.data.response,
                    language: language,
                },
            ]);
        } catch (err) {
            console.error("Backend error:", err);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: "Unable to contact backend.",
                    language: language,
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-full min-h-0 w-full flex-col">

            {/* Full-width scrolling area */}
            <div className="min-h-0 flex-1 overflow-y-auto">

                {/* Centered message content */}
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
                    <div className="space-y-4 py-4">

                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                sender={msg.sender}
                                text={msg.text}
                                language={msg.language}
                            />
                        ))}

                        {loading && <Loading />}

                        <div ref={messagesEndRef} />

                    </div>
                </div>

            </div>

            {/* Full-width input area */}
            <div className="shrink-0">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
                    <ChatInput
                        onSend={sendMessage}
                        language={language}
                        onLanguageChange={setLanguage}
                    />
                </div>
            </div>

        </div>
    );
}