import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateHotelInput, UpdateHotelInput } from '../../graphql/input/hotel/';
import { GqlHotelModel } from '../../graphql/models/hotel/gql-hotel.model';
import { GqlTextResponseModel } from '../../graphql/models/gql-text-response.model';
import { CreateHotelDto, UpdateHotelDto } from '../../rest/dto/hotel';
import { RestHotelModel } from '../../rest/models/hotel/rest-hotel.model';
import { RestTextResponseModel } from '../../rest/models/rest-text-response.model';
import { IUpdateHotel } from '../../interfaces/hotel/update-hotel.interface';
import { ClientService } from '../../../../utils/client';

@Injectable()
export class HotelService {
  constructor(
    @Inject('CATALOG_MICROSERVICE')
    private readonly catalogClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async getSingleHotel(id: number): Promise<RestHotelModel | GqlHotelModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'hotel', cmd: 'getSingle' },
      id,
    );
  }

  async getAllHotels(): Promise<RestHotelModel[] | GqlHotelModel[]> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'hotel', cmd: 'getAll' },
      {},
    );
  }

  async getHotelByQuery(
    query: string,
  ): Promise<RestHotelModel[] | GqlHotelModel[]> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'hotel', cmd: 'getHotelByQuery' },
      query,
    );
  }

  async createHotel(
    createHotelDto: CreateHotelDto | CreateHotelInput,
  ): Promise<RestHotelModel | GqlHotelModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'hotel', cmd: 'create' },
      createHotelDto,
    );
  }

  async updateHotel(
    id: number,
    updateHotelDto: UpdateHotelDto | UpdateHotelInput,
  ): Promise<RestHotelModel | GqlHotelModel> {
    const updateHotelObject: IUpdateHotel = { id, updateHotelDto };
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'hotel', cmd: 'update' },
      updateHotelObject,
    );
  }

  async deleteHotel(
    id: number,
  ): Promise<RestTextResponseModel | GqlTextResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'hotel', cmd: 'delete' },
      id,
    );
  }
}