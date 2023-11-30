/// <reference types="vite/client" />

interface ImportMetaEnv {
    BASE_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    env: ImportMetaEnv
  }