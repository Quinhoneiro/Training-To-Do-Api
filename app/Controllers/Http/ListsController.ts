import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import List from 'App/Models/List'

export default class ListsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const list = await List.create(body)

    response.status(201)

    return {
      message: 'Lista criada com sucesso!',
      data: list,
    }
  }

  public async index() {
    const lists = await List.query().preload('tasks')

    return {
      data: lists,
    }
  }

  public async show({ params }: HttpContextContract) {
    const list = await List.findOrFail(params.id)
    await list.load('tasks')
    return {
      data: list,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const list = await List.findOrFail(params.id)
    list.delete()

    return {
      message: 'Lista deletada com sucesso!',
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const list = await List.findOrFail(params.id)

    list.name = body.name
    list.type = body.type
    list.icon = body.icon

    await list.save()

    return {
      message: 'Lista alterada com sucesso!',
      data: list,
    }
  }
}
