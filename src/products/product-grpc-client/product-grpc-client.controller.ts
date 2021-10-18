import {Controller, Body, Post, Inject} from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import {OnModuleInit} from '@nestjs/common';
import {Observable} from 'rxjs';
import { RpcException } from '@nestjs/microservices';

interface ProductGrpcService {
  create(data: {name: string, price: number}): Observable<any>
}

@Controller('product-grpc-client')
export class ProductGrpcClientController implements OnModuleInit {
  private productGrpcService: ProductGrpcService;
  //DI
  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc){
    //this.val = null; 
  }
  onModuleInit(){
    this.productGrpcService = this.client.getService<ProductGrpcService>('ProductService');
  }
  @Post()
  async create(@Body() data){
    try {
      await this.productGrpcService.create(data).toPromise(); 
    } catch(e){
      throw new RpcException({
        code: e.code,
        message: e.message
      })
    }
  }
}