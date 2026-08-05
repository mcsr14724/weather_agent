export default function ChatMessage({ sender, text }) {
    const isUser = sender === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
            >
                {text}
            </div>
        </div>
    );
}