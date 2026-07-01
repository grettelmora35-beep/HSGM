/// <reference path="../.astro/types.d.ts" />

type ENV = {
  RESEND_API_KEY: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface ImportMetaEnv extends ENV {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
