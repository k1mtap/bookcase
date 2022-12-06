import { expect } from "chai";
import { afterEach } from "mocha";
import { resolveEnvVariable } from "./resolveEnvVariable";

describe("resolveEnvVariable", () => {
  const key = "ENV_VARIABLE_TEST_KEY";

  afterEach(() => {
    delete process.env[key];
  });

  it("should throw when value is missing", () => {
    expect(() => resolveEnvVariable(key)).to.throw();
  });

  it("should return given default when value is missing", () => {
    const defaultValue = "not relevant";

    expect(resolveEnvVariable(key, defaultValue)).to.equal(defaultValue);
  });

  it("should return environment variable value when one exists", () => {
    const value = "not relevant";
    process.env[key] = value;

    expect(resolveEnvVariable(key)).to.equal(value);
  });

  it("should not return default value when environment value exists", () => {
    const value = "not relevant";
    process.env[key] = value;

    expect(resolveEnvVariable(key, "default value")).to.equal(value);
  });
});
