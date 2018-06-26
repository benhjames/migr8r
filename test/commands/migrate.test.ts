import { expect, test } from "@oclif/test";

describe("migrate", () => {
  test
    .stdout()
    .command(["migrate"])
    .exit(2)
    .it("exits migrate when no arguments passed to it");
});
