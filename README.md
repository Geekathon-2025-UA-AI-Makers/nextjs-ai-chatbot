# prAIas

## Geekathon 2025 | UA AI makers team

This application is bootstrapped from the [Next.js AI Chatbot template](https://vercel.com/templates/ai/nextjs-ai-chatbot).

## Problem

Beach parking is a nightmare. Drivers waste time, fuel, and patience circling crowded beach lots, creating traffic congestion and unnecessary emissions. Without real-time visibility into parking availability, families drive blindly to destinations only to find full lots, forcing them to circle endlessly or abandon their plans entirely.

## Solution

AI-Powered Beach Parking Intelligence

## Core Features:

- Conversational AI interface for natural language parking queries
- Prediction based on historical patterns (time, weather, seasonality, etc) to forecast availability

## Key Benefits:

- Reduces traffic congestion by directing drivers to available spots
- Cuts emissions from cars hunting for parking
- Improves visitor experience with confident trip planning
- Enables informed decisions - which beach to visit or whether to use alternative transport

## Target Users:

Beach-goers, tourists and locals seeking stress-free coastal visits.

This transforms chaotic parking searches into informed, efficient trips while supporting sustainable mobility goals.

## Future Improvements

- Source real historical data from municipalities etc
- Data integration from different streams (parking history, weather, tides, events, traffic, social signals)
- ML prediction pipeline that handles real-time feeds and batch historical data
- Inclusivity and accessibility attribution
- Explore low cost solar bluetooth sensors (e.g. LoRaWAN)

## Technical Implementation

### Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports Amazon Nova Micro (default), OpenAI, Anthropic, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication

### Model Providers

This template uses [Amazon Nova Micro](https://aws.amazon.com/bedrock/nova/) through [AWS Bedrock](https://aws.amazon.com/bedrock/) as the primary AI model provider. The application is configured with a populated knowledge base that enhances responses with relevant contextual information.

#### AWS Bedrock Configuration

The application uses the [AI SDK](https://ai-sdk.dev/docs/introduction) with the AWS Bedrock provider to access Amazon Nova Micro models. You need to configure the following environment variables in your `.env.local` file:

```bash
# AWS Bedrock Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
KNOWLEDGE_BASE_ID=your_knowledge_base_id_here
```

#### Knowledge Base Integration

The application includes an integrated AWS Bedrock Knowledge Base that automatically:

- Searches for relevant information based on user queries
- Enhances AI responses with contextual data from the knowledge base
- Provides source citations for retrieved information

With the [AI SDK](https://ai-sdk.dev/docs/introduction), you can also switch to other LLM providers like [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://ai-sdk.dev/providers/ai-sdk-providers) with just a few lines of code.

### Running Locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run the application.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000).
