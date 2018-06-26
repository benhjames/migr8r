import { Command, flags } from "@oclif/command";
import * as dateformat from "dateformat";
import * as fs from "mz/fs";

export default class MigrateCreate extends Command {
  public static description = "Create a migration .sql file";

  public static examples = [
    `$ migr8r migrate:create add-user-table
Creating migration: 2018-01-01-01-01-01-add-user-table.sql
`
  ];

  public static flags = {
    dir: flags.string({ char: "d", default: "." }),
    help: flags.help({ char: "h" })
  };

  public static args = [
    {
      description: "The name of the migration to create.",
      name: "name",
      required: true
    }
  ];

  public async run() {
    const {
      args,
      flags: { dir }
    } = this.parse(MigrateCreate);

    const date = dateformat(new Date(), "yyyy-mm-dd-HH-MM-ss");
    const filename = `${date}-${args.name}.sql`;
    this.log(`Creating migration... ${filename}`);

    await fs.writeFile(
      `${dir}/${filename}`,
      "-- Content of your migration goes here\n"
    );

    this.log("Created migration.");
  }
}
