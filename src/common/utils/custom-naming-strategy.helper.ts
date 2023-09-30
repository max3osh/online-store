import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  override primaryKeyName(tableOrName: Table | string): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;

    return `${table}_pkey`;
  }

  override foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `${table}_${columnsSnakeCase}_fkey`;
  }

  override uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `${table}_${columnsSnakeCase}_key`;
  }
}
