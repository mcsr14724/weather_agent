import { useEffect, useRef, useState } from "react";

export default function ChatInput({
    onSend,
    language,
    onLanguageChange,
}) {
    const [message, setMessage] = useState("");
    const [listening, setListening] = useState(false);

    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn(
                "Speech Recognition is not supported in this browser."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript =
                event.results[0][0].transcript;

            setMessage((prev) => {
                if (prev.trim()) {
                    return `${prev} ${transcript}`;
                }

                return transcript;
            });
        };

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error(
                "Speech recognition error:",
                event.error
            );

            setListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, []);

    function startListening() {
        if (!recognitionRef.current) {
            alert(
                "Speech recognition is not supported in this browser."
            );
            return;
        }

        try {
            // Always use currently selected language
            recognitionRef.current.lang = language;

            if (listening) {
                recognitionRef.current.stop();
                return;
            }

            recognitionRef.current.start();
        } catch (error) {
            console.error(
                "Could not start speech recognition:",
                error
            );
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!message.trim() || listening) {
            return;
        }

        onSend(message.trim());

        setMessage("");
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (!message.trim()) {
                return;
            }

            onSend(message.trim());

            setMessage("");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-4"
        >
            {/* Language selector */}
            <select
                value={language}
                onChange={(event) =>
                    onLanguageChange(event.target.value)
                }
                className="rounded-lg bg-gray-800 px-2 py-2 text-sm text-white outline-none"
                title="Select language"
            >
                <option value="en-IN">
                    English
                </option>

                <option value="te-IN">
                    తెలుగు
                </option>
            </select>

            {/* Text input */}
            <input
                type="text"
                value={message}
                onChange={(event) =>
                    setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask about the weather..."
                className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500"
            />

            {/* Microphone */}
            <button
                type="button"
                onClick={startListening}
                className={`flex h-11 w-11 items-center justify-center rounded-lg transition ${listening
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                title={
                    listening
                        ? "Stop listening"
                        : "Voice input"
                }
            >
                {listening ? "■" : "🎤"}
            </button>

            {/* Send */}
            <button
                type="submit"
                disabled={!message.trim()}
                className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Send
            </button>
        </form>
    );
}