/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_TMDB_API_KEY: string;
  VITE_TMDB_BASE_URL: string;
  VITE_TMDB_IMAGE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.webp";
declare module "*.js";
