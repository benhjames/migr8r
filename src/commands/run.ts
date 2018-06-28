import { Command, flags } from "@oclif/command";
import { join } from "path";
import * as pgp from "pg-promise";

export default class Run extends Command {
  public static description = "Run .sql files";

  public static examples = [
    `$ migr8r run path/to/file.sql
Running...
`
  ];

  public static args = [{ name: "path" }];

  public static flags = {
    connectionString: flags.string({ char: "c" }),
    help: flags.help({ char: "h" })
  };

  public async run() {
    const {
      args: { path },
      flags: { connectionString }
    } = this.parse(Run);

    if (!connectionString && !process.env.DATABASE_URL) {
      this.error("No connection string provided.");
    }

    const pgConfig = pgp();
    const db = pgConfig({
      connectionString: connectionString || process.env.DATABASE_URL
    });

    const sql = new pgp.QueryFile(join(process.cwd(), path), { minify: true });

    this.log("Running...");
    try {
      await db.query(sql);
    } catch (err) {
      this.log(err);
      this.error(`Could not run file.`);
    }

    this.log("Finished running SQL file.");

    await db.$pool.end();
  }
}
