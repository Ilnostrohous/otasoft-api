import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GqlCustomer } from './graphql/models/customer-gql.model';
import { CreateCustomerProfileDto } from './rest/dto/create-customer-profile.dto';
import { CreateCustomerProfileInput } from './graphql/input/create-customer-profile.input';
import { RestCustomer } from './rest/models/customer-rest.model';
import { UpdateCustomerProfileDto } from './rest/dto/update-customer-profile.dto';
import { IUpdateCustomerObject } from './interfaces/update-customer-object.interface';
import { UpdateCustomerProfileInput } from './graphql/input/update-customer-profile.input';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_MICROSERVICE')
    public readonly customerClient: ClientProxy,
  ) {}

  async getCustomerProfile(id: number): Promise<GqlCustomer | RestCustomer> {
    const customerProfile = await this.customerClient
      .send({ role: 'customer', cmd: 'get' }, id)
      .toPromise();
    return customerProfile;
  }

  async createCustomerProfile(
    createCustomerProfileData:
      | CreateCustomerProfileInput
      | CreateCustomerProfileDto,
  ): Promise<GqlCustomer | RestCustomer> {
    const newCustomerProfile = await this.customerClient
      .send({ role: 'customer', cmd: 'create' }, createCustomerProfileData)
      .toPromise();
    if (!newCustomerProfile) throw new BadRequestException(); // Change to more appropriate exception
    return newCustomerProfile;
  }

  async removeCustomerProfile(id: number): Promise<Boolean> {
    const customerRemoved = await this.customerClient
      .send({ role: 'customer', cmd: 'remove' }, id)
      .toPromise();
    return customerRemoved;
  }

  async updateCustomerProfile(
    id: number,
    updateCustomerProfileData:
      | UpdateCustomerProfileDto
      | UpdateCustomerProfileInput,
  ): Promise<RestCustomer | GqlCustomer> {
    const updateProfileObject: IUpdateCustomerObject = {
      id,
      updateCustomerProfileData,
    };
    const updatedProfile = await this.customerClient
      .send({ role: 'customer', cmd: 'update' }, updateProfileObject)
      .toPromise();
    return updatedProfile;
  }
}