// 翻译项的类型
interface TranslationItem {
  source: string;
  translated: string;
  i18n_key: string;
  context: string;
}

// 元数据的类型
interface MetaData {
  detected_source_lang: string;
  timestamp: string;
}

// 整个 JSON 数据的类型
export interface TranslationData {
  translations: TranslationItem[];
  meta: MetaData;
}

// 示例使用
const data: TranslationData = {
  translations: [
    {
      source: '取消',
      translated: 'Cancel',
      i18n_key: 'cancel',
      context: '按钮操作'
    }
  ],
  meta: {
    detected_source_lang: 'zh-CN',
    timestamp: '2023-12-20T14:30Z'
  }
};
