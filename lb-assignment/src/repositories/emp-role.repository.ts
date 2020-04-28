import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {EmpRole, EmpRoleRelations, User} from '../models';
import {PostgresConnectorDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class EmpRoleRepository extends DefaultCrudRepository<
  EmpRole,
  typeof EmpRole.prototype.id,
  EmpRoleRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof EmpRole.prototype.id>;

  constructor(
    @inject('datasources.postgresConnector') dataSource: PostgresConnectorDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(EmpRole, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
