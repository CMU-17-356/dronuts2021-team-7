import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {Address, AddressRelations} from '../models';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {
  constructor(@inject('datasources.new') dataSource: NewDataSource) {
    super(Address, dataSource);
  }
}
