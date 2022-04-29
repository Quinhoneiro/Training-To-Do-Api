import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import List from 'App/Models/List'
import Task from 'App/Models/Task'

export default class TasksController {
  public async store({ params, request, response }: HttpContextContract) {
    const body = request.body()
    const listId = params.listId

    await List.findOrFail(listId)

    body.list_id = listId
    const task = await Task.create(body)

    response.status(201)

    return {
      message: 'Tarefa criada com sucesso!',
      data: task,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    task.delete()

    return {
      message: 'Tarefa deletada com sucesso!',
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const task = await Task.findOrFail(params.id)

    body.name !== '' ? (task.name = body.name) : ''
    body.date !== '' ? (task.date = body.date) : ''
    body.status !== '' ? (task.status = body.status) : ''

    await task.save()

    return {
      message: 'Tarefa alterada com sucesso!',
      data: task,
    }
  }
}
