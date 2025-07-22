import { useState } from 'react';
import { parseUserCommand } from '../utils/aiParser';
import SendToken from './SendToken'; // <-- Make sure this path is correct

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [aiAction, setAiAction] = useState(null); // <-- Store parsed AI action

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const reply = await parseUserCommand(input);

    setMessages((prev) => [
      ...prev,
      {
        from: 'bot',
        text: typeof reply === 'object' ? JSON.stringify(reply, null, 2) : reply,
      },
    ]);

    if (reply?.action === 'transfer') {
      setAiAction(reply); // <-- store parsed transfer action
    } else {
      setAiAction(null); // clear previous transfer state
    }
  };

  return (
    <div>
      <div className="bg-gray-800 p-4 rounded h-64 overflow-y-auto mb-4 text-sm whitespace-pre-wrap">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.from === 'user' ? 'text-blue-300' : 'text-green-300'}`}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} className="bg-blue-500 px-4 py-2 rounded text-white">
          Send
        </button>
      </div>

      {/* If AI action is a valid transfer, show SendToken */}
      {aiAction?.action === 'transfer' && (
        <div className="mt-4">
          <SendToken action={aiAction} />
        </div>
      )}
    </div>
  );
}
