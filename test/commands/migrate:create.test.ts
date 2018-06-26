import { expect, test } from "@oclif/test";

describe("migrate:create", () => {
  test
    .stdout()
    .command(["migrate:create"])
    .exit(2)
    .it("exits migrate:create when no name is passed");

  test
    .stdout()
    .command(["migrate:create", "add-user-table"])
    .it("runs migrate:create add-user-table", ctx => {
      expect(ctx.stdout).to.match(
        /Creating migration... \d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-add-user-table.sql/
      );
    });
});
