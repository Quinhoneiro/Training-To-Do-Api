import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterListsAddIcons extends BaseSchema {
  protected tableName = 'lists'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('icon')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('icon')
    })
  }
}
