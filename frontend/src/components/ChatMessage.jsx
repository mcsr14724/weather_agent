import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ sender, text }) {
    const isUser = sender === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[75%] min-w-0 overflow-x-auto rounded-2xl px-4 py-3 ${isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
            >
                {isUser ? (
                    text
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => (
                                <p className="mb-3 last:mb-0 leading-7">
                                    {children}
                                </p>
                            ),

                            strong: ({ children }) => (
                                <strong className="font-bold">
                                    {children}
                                </strong>
                            ),

                            em: ({ children }) => (
                                <em className="italic">
                                    {children}
                                </em>
                            ),

                            h1: ({ children }) => (
                                <h1 className="text-2xl font-bold mb-3">
                                    {children}
                                </h1>
                            ),

                            h2: ({ children }) => (
                                <h2 className="text-xl font-bold mb-3">
                                    {children}
                                </h2>
                            ),

                            h3: ({ children }) => (
                                <h3 className="text-lg font-bold mb-2">
                                    {children}
                                </h3>
                            ),

                            ul: ({ children }) => (
                                <ul className="list-disc pl-6 mb-3 space-y-1">
                                    {children}
                                </ul>
                            ),

                            ol: ({ children }) => (
                                <ol className="list-decimal pl-6 mb-3 space-y-1">
                                    {children}
                                </ol>
                            ),

                            li: ({ children }) => (
                                <li>{children}</li>
                            ),

                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-gray-500 pl-4 italic my-3">
                                    {children}
                                </blockquote>
                            ),

                            pre: ({ children }) => (
                                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 my-3">
                                    {children}
                                </pre>
                            ),

                            code: ({ children, className }) => (
                                <code className={className}>
                                    {children}
                                </code>
                            ),

                            a: ({ href, children }) => (
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
                )}
            </div>
        </div>
    );
}