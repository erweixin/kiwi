import { ChatOpenAI } from 'langchain/chat_models/openai';

class LangchainLLM {
  private static instance: ChatOpenAI;

  private constructor() {} // 禁止外部实例化

  static getInstance(): ChatOpenAI {
    if (!LangchainLLM.instance) {
      LangchainLLM.instance = new ChatOpenAI({
        openAIApiKey: 'your-api-key',
        modelName: 'gpt-4'
      });
    }
    return LangchainLLM.instance;
  }
}
