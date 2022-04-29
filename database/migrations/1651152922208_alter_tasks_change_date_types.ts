import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTasksChangeDateTypes extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('date').alter()
      table.boolean('status').defaultTo(false).alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('date').alter()
      table.boolean('status').alter()
    })
  }
}
