import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

import {
    Copy,
    Check,
    Share2,
    Volume2,
    Square,
} from "lucide-react";

export default function ChatMessage({
    sender,
    text,
    language = "en-IN",
}) {
    const isUser = sender === "user";

    const [speaking, setSpeaking] = useState(false);
    const [copied, setCopied] = useState(false);

    function speakText() {
        if (!("speechSynthesis" in window)) {
            alert(
                "Text-to-speech is not supported in this browser."
            );
            return;
        }

        // Stop current speech
        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            return;
        }

        // Remove markdown before speaking
        const plainText = text
            .replace(/```[\s\S]*?```/g, "")
            .replace(/[#*_>`~-]/g, "")
            .replace(
                /\[([^\]]+)\]\([^)]+\)/g,
                "$1"
            );

        const utterance =
            new SpeechSynthesisUtterance(plainText);

        /*
         * IMPORTANT:
         *
         * This is now controlled by the language
         * selected in ChatInput.
         *
         * English → en-IN
         * Telugu  → te-IN
         */
        utterance.lang = language;

        utterance.rate = 1;
        utterance.pitch = 1;

        /*
         * Find a voice matching the selected language.
         */
        const voices =
            window.speechSynthesis.getVoices();

        const languagePrefix =
            language.toLowerCase().split("-")[0];

        const matchingVoice = voices.find(
            (voice) =>
                voice.lang
                    .toLowerCase()
                    .startsWith(languagePrefix)
        );

        if (matchingVoice) {
            utterance.voice = matchingVoice;
        }

        utterance.onstart = () => {
            setSpeaking(true);
        };

        utterance.onend = () => {
            setSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error(
                "Speech synthesis error:",
                event
            );

            setSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }

    async function copyText() {
        try {
            await navigator.clipboard.writeText(text);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error(
                "Copy failed:",
                error
            );
        }
    }

    async function shareText() {
        try {
            if (navigator.share) {
                await navigator.share({
                    text: text,
                });
            } else {
                await navigator.clipboard.writeText(text);

                setCopied(true);

                setTimeout(() => {
                    setCopied(false);
                }, 1500);
            }
        } catch (error) {
            /*
             * AbortError means the user simply
             * cancelled the share dialog.
             */
            if (error.name !== "AbortError") {
                console.error(
                    "Share failed:",
                    error
                );
            }
        }
    }

    return (
        <div
            className={`flex ${isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
        >
            <div
                className={`max-w-[75%] min-w-0 overflow-hidden rounded-2xl px-4 py-3 ${isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
            >
                {isUser ? (
                    text
                ) : (
                    <>
                        {/* AI response */}
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => (
                                    <p className="mb-3 last:mb-0 leading-7">
                                        {children}
                                    </p>
                                ),

                                strong: ({
                                    children,
                                }) => (
                                    <strong className="font-bold">
                                        {children}
                                    </strong>
                                ),

                                em: ({
                                    children,
                                }) => (
                                    <em className="italic">
                                        {children}
                                    </em>
                                ),

                                h1: ({
                                    children,
                                }) => (
                                    <h1 className="mb-3 text-2xl font-bold">
                                        {children}
                                    </h1>
                                ),

                                h2: ({
                                    children,
                                }) => (
                                    <h2 className="mb-3 text-xl font-bold">
                                        {children}
                                    </h2>
                                ),

                                h3: ({
                                    children,
                                }) => (
                                    <h3 className="mb-2 text-lg font-bold">
                                        {children}
                                    </h3>
                                ),

                                ul: ({
                                    children,
                                }) => (
                                    <ul className="mb-3 list-disc space-y-1 pl-6">
                                        {children}
                                    </ul>
                                ),

                                ol: ({
                                    children,
                                }) => (
                                    <ol className="mb-3 list-decimal space-y-1 pl-6">
                                        {children}
                                    </ol>
                                ),

                                li: ({
                                    children,
                                }) => (
                                    <li>{children}</li>
                                ),

                                blockquote: ({
                                    children,
                                }) => (
                                    <blockquote className="my-3 border-l-4 border-gray-500 pl-4 italic">
                                        {children}
                                    </blockquote>
                                ),

                                pre: ({
                                    children,
                                }) => (
                                    <pre className="my-3 overflow-x-auto rounded-lg bg-gray-900 p-4">
                                        {children}
                                    </pre>
                                ),

                                code: ({
                                    children,
                                    className,
                                }) => (
                                    <code
                                        className={
                                            className
                                        }
                                    >
                                        {children}
                                    </code>
                                ),

                                a: ({
                                    href,
                                    children,
                                }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 underline"
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {text}
                        </ReactMarkdown>

                        {/* ChatGPT-style actions */}
                        <div className="mt-3 flex items-center gap-3">
                            {/* Copy */}
                            <button
                                type="button"
                                onClick={copyText}
                                className="rounded-md p-1 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                                title="Copy"
                            >
                                {copied ? (
                                    <Check size={16} />
                                ) : (
                                    <Copy size={16} />
                                )}
                            </button>

                            {/* Share */}
                            <button
                                type="button"
                                onClick={shareText}
                                className="rounded-md p-1 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                                title="Share"
                            >
                                <Share2 size={16} />
                            </button>

                            {/* Read aloud */}
                            <button
                                type="button"
                                onClick={speakText}
                                className="rounded-md p-1 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                                title={
                                    speaking
                                        ? "Stop speaking"
                                        : "Read aloud"
                                }
                            >
                                {speaking ? (
                                    <Square size={16} />
                                ) : (
                                    <Volume2 size={16} />
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}