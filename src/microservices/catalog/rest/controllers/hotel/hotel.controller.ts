import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HotelService } from '../../../services/hotel/hotel.service';
import { CreateHotelDto, UpdateHotelDto } from '../../dto/hotel';
import { RestHotelModel } from '../../models/hotel/rest-hotel.model';
import { RestTextResponseModel } from '../../models/rest-text-response.model';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('/all-hotels')
  async getAllHotels(): Promise<RestHotelModel[]> {
    return this.hotelService.getAllHotels();
  }

  @Get('/hotel-by-query')
  async getHotelByQuery(
    @Query('query') query: string,
  ): Promise<RestHotelModel[]> {
    return this.hotelService.getHotelByQuery(query);
  }

  @Get('/:id')
  async getSingleHotel(@Param('id') id: number): Promise<RestHotelModel> {
    return this.hotelService.getSingleHotel(id);
  }

  @Post('/create')
  async createHotel(
    @Body() createHotelDto: CreateHotelDto,
  ): Promise<RestHotelModel> {
    return this.hotelService.createHotel(createHotelDto);
  }

  @Put('/:id/update')
  async updateHotel(
    @Param('id') id: number,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<RestHotelModel> {
    return this.hotelService.updateHotel(id, updateHotelDto);
  }

  @Delete('/:id/delete')
  async deleteHotel(@Param('id') id: number): Promise<RestTextResponseModel> {
    return this.hotelService.deleteHotel(id);
  }
}