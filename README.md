migr8r
=================

Easily run Postgres migrations using SQL files

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/migr8r.svg)](https://npmjs.org/package/migr8r)
[![CircleCI](https://circleci.com/gh/benhjames/migr8r/tree/master.svg?style=shield)](https://circleci.com/gh/benhjames/migr8r/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/benhjames/migr8r?branch=master&svg=true)](https://ci.appveyor.com/project/benhjames/migr8r/branch/master)
[![Codecov](https://codecov.io/gh/benhjames/migr8r/branch/master/graph/badge.svg)](https://codecov.io/gh/benhjames/migr8r)
[![Downloads/week](https://img.shields.io/npm/dw/migr8r.svg)](https://npmjs.org/package/migr8r)
[![License](https://img.shields.io/npm/l/migr8r.svg)](https://github.com/benhjames/migr8r/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g migr8r
$ migr8r COMMAND
running command...
$ migr8r (-v|--version|version)
migr8r/0.0.0 darwin-x64 node-v10.1.0
$ migr8r --help [COMMAND]
USAGE
  $ migr8r COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`migr8r help [COMMAND]`](#migr-8-r-help-command)
* [`migr8r migrate`](#migr-8-r-migrate)
* [`migr8r migrate:create NAME`](#migr-8-r-migratecreate-name)
* [`migr8r run [PATH]`](#migr-8-r-run-path)

## `migr8r help [COMMAND]`

display help for migr8r

```
USAGE
  $ migr8r help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.0.5/src/commands/help.ts)_

## `migr8r migrate`

Run .sql files

```
USAGE
  $ migr8r migrate

OPTIONS
  -c, --connectionString=connectionString
  -d, --dir=dir                            [default: .]
  -h, --help                               show CLI help

EXAMPLE
  $ migr8r migrate
  Migrating...
```

_See code: [src/commands/migrate.ts](https://github.com/benhjames/migr8r/blob/v0.0.0/src/commands/migrate.ts)_

## `migr8r migrate:create NAME`

Create a migration .sql file

```
USAGE
  $ migr8r migrate:create NAME

ARGUMENTS
  NAME  The name of the migration to create.

OPTIONS
  -d, --dir=dir  [default: .]
  -h, --help     show CLI help

EXAMPLE
  $ migr8r migrate:create add-user-table
  Creating migration: 2018-01-01-01-01-01-add-user-table.sql
```

_See code: [src/commands/migrate/create.ts](https://github.com/benhjames/migr8r/blob/v0.0.0/src/commands/migrate/create.ts)_

## `migr8r run [PATH]`

Run .sql files

```
USAGE
  $ migr8r run [PATH]

OPTIONS
  -c, --connectionString=connectionString
  -h, --help                               show CLI help

EXAMPLE
  $ migr8r run path/to/file.sql
  Running...
```

_See code: [src/commands/run.ts](https://github.com/benhjames/migr8r/blob/v0.0.0/src/commands/run.ts)_
<!-- commandsstop -->
