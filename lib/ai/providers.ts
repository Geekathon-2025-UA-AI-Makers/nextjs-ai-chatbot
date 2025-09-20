import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';

// Create Bedrock provider
const bedrock = createAmazonBedrock({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const myProvider = customProvider({
  languageModels: {
    'chat-model': bedrock('amazon.nova-micro-v1:0'),
    'chat-model-reasoning': wrapLanguageModel({
      model: bedrock('amazon.nova-micro-v1:0'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': bedrock('amazon.nova-micro-v1:0'),
    'artifact-model': bedrock('amazon.nova-micro-v1:0'),
  },
});
