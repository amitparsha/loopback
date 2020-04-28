import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  EmpRole,
  User,
} from '../models';
import {EmpRoleRepository} from '../repositories';

export class EmpRoleUserController {
  constructor(
    @repository(EmpRoleRepository) protected empRoleRepository: EmpRoleRepository,
  ) { }

  @get('/emp-roles/{id}/users', {
    responses: {
      '200': {
        description: 'Array of EmpRole has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.empRoleRepository.users(id).find(filter);
  }

  @post('/emp-roles/{id}/users', {
    responses: {
      '200': {
        description: 'EmpRole model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EmpRole.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInEmpRole',
            exclude: ['id'],
            optional: ['empRoleId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.empRoleRepository.users(id).create(user);
  }

  @patch('/emp-roles/{id}/users', {
    responses: {
      '200': {
        description: 'EmpRole.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.empRoleRepository.users(id).patch(user, where);
  }

  @del('/emp-roles/{id}/users', {
    responses: {
      '200': {
        description: 'EmpRole.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.empRoleRepository.users(id).delete(where);
  }
}
