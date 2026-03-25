declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_XAI_API_KEY: string;
    REACT_APP_AI_PROVIDER: 'xai' | 'ollama';
    PUBLIC_URL?: string;
  }
}
