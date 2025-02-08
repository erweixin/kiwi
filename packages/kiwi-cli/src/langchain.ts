import OpenAI from 'openai';
import { getProjectConfig } from './utils';

export class LangchainLLM {
  private static instance: OpenAI;

  private constructor() {} // 禁止外部实例化

  static getInstance(): OpenAI {
    if (!LangchainLLM.instance) {
      const CONFIG = getProjectConfig();
      LangchainLLM.instance = new OpenAI({
        apiKey: CONFIG.llmApiKey.apiKey,
        baseURL: CONFIG.llmApiKey.baseURL
      });
    }
    return LangchainLLM.instance;
  }
}
