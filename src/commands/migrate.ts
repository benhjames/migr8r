import { Command, flags } from "@oclif/command";
import * as glob from "globby";
import { basename, join } from "path";
import * as pgp from "pg-promise";

export default class Migrate extends Command {
  public static description = "Run .sql files";

  public static examples = [
    `$ migr8r migrate
Migrating...
`
  ];

  public static flags = {
    connectionString: flags.string({ char: "c" }),
    dir: flags.string({ char: "d", default: "." }),
    help: flags.help({ char: "h" })
  };

  public async run() {
    const {
      flags: { connectionString, dir }
    } = this.parse(Migrate);

    if (!connectionString && !process.env.DATABASE_URL) {
      this.error("No connection string provided.");
    }

    let paths = await glob(`${dir}/*.sql`);
    const regex = /[$\/\\]\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-.+.sql/i;
    paths = paths.filter(path => regex.test(path));
    paths.sort();

    const pgConfig = pgp();
    const db = pgConfig({
      connectionString: connectionString || process.env.DATABASE_URL
    });

    await db.tx(async tx => {
      await tx.query("create schema if not exists postgres_migrator");
      await tx.query(`
        create table if not exists postgres_migrator.migrations (
          filename text primary key unique
        );
      `);
    });

    let migrations = await db.manyOrNone(
      `select * from postgres_migrator.migrations`
    );
    migrations = migrations.map(({ filename }) => filename);

    const toQuery = (path: string) => new pgp.QueryFile(path, { minify: true });

    paths = paths.filter(path => !migrations.includes(basename(path)));
    this.log(`Found ${paths.length} SQL migrations to run.`);

    for (const path of paths) {
      this.log(`Running migration ${path}`);
      const sql = toQuery(join(process.cwd(), path));
      try {
        await db.tx(async tx => {
          await tx.query(sql);
          await tx.query(
            `insert into postgres_migrator.migrations (filename) values ($<filename>)`,
            { filename: basename(path) }
          );
        });
      } catch (err) {
        this.log(err);
        this.error(`Could not run migration with name: ${path}`);
      }
    }

    this.log("Finished running migrations.");

    await db.$pool.end();
  }
}
