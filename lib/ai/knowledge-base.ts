import { BedrockAgentRuntimeClient, RetrieveCommand } from '@aws-sdk/client-bedrock-agent-runtime';

// Create Bedrock Agent Runtime client for Knowledge Base operations
const bedrockAgentClient = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface KnowledgeBaseResult {
  content: string;
  sources: Array<{
    title?: string;
    url?: string;
    snippet?: string;
  }>;
}

/**
 * Retrieve relevant information from AWS Bedrock Knowledge Base
 */
export async function retrieveFromKnowledgeBase(
  query: string,
  knowledgeBaseId?: string
): Promise<KnowledgeBaseResult | null> {
  const kbId = knowledgeBaseId || process.env.KNOWLEDGE_BASE_ID;

  console.log('Retrieving from Knowledge Base:', { query, kbId });

  if (!kbId) {
    console.warn('Knowledge Base ID not configured');
    return null;
  }

  try {
    // Use Bedrock's retrieve API to get relevant documents
    const command = new RetrieveCommand({
      knowledgeBaseId: kbId,
      retrievalQuery: {
        text: query,
      },
      retrievalConfiguration: {
        vectorSearchConfiguration: {
          numberOfResults: 5, // Limit to 5 most relevant results
        },
      },
    });

    const response = await bedrockAgentClient.send(command);

    if (!response.retrievalResults || response.retrievalResults.length === 0) {
      return null;
    }

    // Combine all retrieved content
    const content = response.retrievalResults
      .map((result) => result.content?.text || '')
      .filter(Boolean)
      .join('\n\n');

    // Extract sources
    const sources = response.retrievalResults
      .map((result) => ({
        title: result.location?.s3Location?.uri || 'Unknown',
        url: result.location?.s3Location?.uri,
        snippet: result.content?.text?.substring(0, 200) + '...',
      }))
      .filter((source) => source.snippet);

    return {
      content,
      sources,
    };
  } catch (error) {
    console.error('Error retrieving from Knowledge Base:', error);
    return null;
  }
}

/**
 * Format Knowledge Base results for inclusion in prompts
 */
export function formatKnowledgeBaseContext(result: KnowledgeBaseResult): string {
  if (!result.content) {
    return '';
  }

  const sourcesText = result.sources.length > 0
    ? `\n\nSources:\n${result.sources.map((source, index) =>
        `${index + 1}. ${source.title || 'Unknown source'}\n   ${source.snippet || ''}`
      ).join('\n')}`
    : '';

  return `\n\nRelevant information from knowledge base:\n${result.content}${sourcesText}`;
}
