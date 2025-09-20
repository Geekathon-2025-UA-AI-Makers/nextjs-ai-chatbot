export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Amazon Nova Micro',
    description: 'Fast and efficient AI model powered by Amazon Bedrock',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Amazon Nova Micro (Reasoning)',
    description: 'AI model with reasoning capabilities - shows thinking process',
  },
];
