import { useEffect, useRef, useState } from "react";

export default function ChatInput({ onSend }) {
    const [message, setMessage] = useState("");
    const [listening, setListening] = useState(false);
    const [language, setLanguage] = useState("en-IN");

    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log(
                "Speech recognition is not supported in this browser."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event) => {
            let transcript = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                transcript += event.results[i][0].transcript;
            }

            setMessage(transcript);
        };

        recognition.onerror = (event) => {
            console.error(
                "Speech recognition error:",
                event.error
            );

            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, [language]);

    function startListening() {
        if (!recognitionRef.current) {
            alert(
                "Speech recognition is not supported in this browser."
            );
            return;
        }

        try {
            recognitionRef.current.start();
        } catch (error) {
            console.error("Could not start speech recognition:", error);
        }
    }

    function stopListening() {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }

    function handleVoiceClick() {
        if (listening) {
            stopListening();
        } else {
            startListening();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        onSend(trimmedMessage);

        setMessage("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-slate-700 p-4"
        >
            {/* Text input */}
            <input
                type="text"
                value={message}
                onChange={(event) =>
                    setMessage(event.target.value)
                }
                placeholder="Ask about the weather..."
                className="flex-1 rounded-xl bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-gray-400"
            />

            {/* Language selector */}
            <select
                value={language}
                onChange={(event) =>
                    setLanguage(event.target.value)
                }
                disabled={listening}
                className="rounded-xl bg-slate-800 px-3 py-3 text-white outline-none disabled:opacity-50"
            >
                <option value="en-IN">English</option>
                <option value="te-IN">తెలుగు</option>
            </select>

            {/* Microphone */}
            <button
                type="button"
                onClick={handleVoiceClick}
                className={`rounded-xl px-4 py-3 text-white ${listening
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                title={
                    listening
                        ? "Stop listening"
                        : "Start voice input"
                }
            >
                {listening ? "⏹️" : "🎤"}
            </button>

            {/* Send */}
            <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
                Send
            </button>
        </form>
    );
}