import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {User, UserRelations, Customer, EmpRole} from '../models';
import {PostgresConnectorDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CustomerRepository} from './customer.repository';
import {EmpRoleRepository} from './emp-role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof User.prototype.id>;

  public readonly empRole: BelongsToAccessor<EmpRole, typeof User.prototype.id>;

  constructor(
    @inject('datasources.postgresConnector') dataSource: PostgresConnectorDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('EmpRoleRepository') protected empRoleRepositoryGetter: Getter<EmpRoleRepository>,
  ) {
    super(User, dataSource);
    this.empRole = this.createBelongsToAccessorFor('empRole', empRoleRepositoryGetter,);
    this.registerInclusionResolver('empRole', this.empRole.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
