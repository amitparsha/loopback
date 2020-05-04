import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  EmpRole,
} from '../models';
import {UserRepository} from '../repositories';

export class UserEmpRoleController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/emp-role', {
    responses: {
      '200': {
        description: 'EmpRole belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EmpRole)},
          },
        },
      },
    },
  })
  async getEmpRole(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<EmpRole> {
    return this.userRepository.empRole(id);
  }
}
