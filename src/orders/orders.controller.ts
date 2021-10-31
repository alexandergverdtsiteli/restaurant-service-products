import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { KafkaCreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')//kafka-console-producer --topic createOrder --boostrap-server localhost:9092
  create(@Payload(new ValidationPipe()) { value }: KafkaCreateOrderDto) {
    console.log(value);
    //{"name":0}
    return this.ordersService.create(value);
  }

  @MessagePattern('findAllOrders')//kafka-console-producer --topic findAllOrders --boostrap-server localhost:9092
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('findOneOrder')//kafka-console-producer --topic findOneOrder --boostrap-server localhost:9092
  findOne(@Payload() id: number) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('updateOrder')//kafka-console-producer --topic updateOrder --boostrap-server localhost:9092
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')//kafka-console-producer --topic removeOrder --boostrap-server localhost:9092
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }
}