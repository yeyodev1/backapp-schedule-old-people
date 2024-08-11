interface Message {
  content: string;
  role: string;
};

export function parseHistory(history: Message[]): string {
  const uniqueMessages = new Set<string>();

  let parsedHistory = ''

  history.forEach((message) => {
    const formattedMessage = `${message.role === 'user' ? 'user' : 'asistente'}: ${message.content.trim()}`;

    if(!uniqueMessages.has(formattedMessage)) {
      uniqueMessages.add(formattedMessage);
      parsedHistory += formattedMessage + '\n';
    };
  });

  return parsedHistory.trim();
}