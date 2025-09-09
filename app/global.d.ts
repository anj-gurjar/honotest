import type {} from "hono";

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: {
      CODE_VERIFIER_STORE: Map<string, string>;
    };
  }
}
