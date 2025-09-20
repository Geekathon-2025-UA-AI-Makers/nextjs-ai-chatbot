# AWS Bedrock Knowledge Base Integration

This document describes how AWS Bedrock Knowledge Base is integrated into the Next.js AI Chatbot.

## Setup

### 1. Environment Variables

Add the following variables to your `.env.local` file:

```bash
# AWS Bedrock Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
KNOWLEDGE_BASE_ID=your_knowledge_base_id_here
```

### 2. Dependencies Installation

The required package is already installed:

- `@aws-sdk/client-bedrock-agent-runtime` - for working with Knowledge Base API

## How It Works

### 1. File Structure

- `lib/ai/knowledge-base.ts` - main logic for working with Knowledge Base
- `lib/ai/prompts.ts` - updated prompts with Knowledge Base context support
- `app/(chat)/api/chat/route.ts` - integration into chat API

### 2. Workflow

1. **User Request Processing**: When a user sends a message, the system extracts text from the message
2. **Knowledge Base Search**: Uses AWS Bedrock Agent Runtime API to search for relevant information
3. **Context Formatting**: Found information is formatted for inclusion in the prompt
4. **Response Generation**: The AI model receives both the original query and Knowledge Base context

### 3. API Functions

#### `retrieveFromKnowledgeBase(query: string, knowledgeBaseId?: string)`

Retrieves relevant information from Knowledge Base for a given query.

**Parameters:**

- `query` - search query text
- `knowledgeBaseId` - Knowledge Base ID (optional, uses environment variable)

**Returns:**

```typescript
{
  content: string // Combined text from all found documents
  sources: Array<{
    title?: string
    url?: string
    snippet?: string
  }>
}
```

#### `formatKnowledgeBaseContext(result: KnowledgeBaseResult)`

Formats Knowledge Base results for inclusion in prompts.

### 4. Error Handling

- If Knowledge Base ID is not configured, the system works without Knowledge Base context
- If Knowledge Base search fails, the system continues without additional context
- All errors are logged to console for diagnostics

## Usage

After setting up environment variables, Knowledge Base is automatically used for all user requests. The system:

1. Automatically searches for relevant information in Knowledge Base
2. Includes found information in the prompt for the AI model
3. Provides information sources in the response

## Knowledge Base Configuration

Make sure your Knowledge Base in AWS Bedrock is:

- Configured and active
- Contains relevant documents
- Has proper access permissions for your AWS user

## Monitoring

To monitor Knowledge Base performance, check:

- Console logs for connection errors
- AI model responses for Knowledge Base context usage
- AWS CloudWatch metrics for Bedrock Agent Runtime API
