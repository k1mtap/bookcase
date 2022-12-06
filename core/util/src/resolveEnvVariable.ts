export function resolveEnvVariable(name: string): string;
export function resolveEnvVariable(name: string, defaultValue: string): string;
export function resolveEnvVariable(
  name: string,
  defaultValue?: string
): string {
  const result = process.env[name];
  if (typeof result === "string") {
    return result;
  }

  if (typeof defaultValue === "string") {
    return defaultValue;
  }

  throw new Error(`environment variable ${name} is required`);
}
