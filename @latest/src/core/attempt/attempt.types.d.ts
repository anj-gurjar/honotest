declare namespace IAttempt {
  type Insert = import("./attempt.schema.ts").Insert;
  type CreateData = Pick<Insert, "secret">;
}
