import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {Metadata,ServerUnaryCall,status} from 'grpc';
import { CreateProductDto } from '../dto/create-product.dto';
//import { UpdateProductDto } from '../dto/update-product.dto';
import {ProductsService} from '../products.service'
import { EntityNotFoundError } from 'typeorm';

@Controller()
export class ProductGrpcServerController {
  constructor(private productsService: ProductsService){}
  @GrpcMethod('ProductService', 'Create')
  create(
    data:CreateProductDto,
    metadata:Metadata,
    call:ServerUnaryCall<CreateProductDto>
    ){
    //console.log(data, metadata, call);
    return this.productsService.create(data);
  }
  @GrpcMethod('ProductService', 'Update')
  update(
    //data:UpdateProductDto,
    data: {id: number; name: string; price: number},
    metadata:Metadata,
    call:ServerUnaryCall<CreateProductDto>
    ){
      const {id, ...rest} = data;
    //console.log(data, metadata, call);
    return this.productsService.update(id, rest);
  }
  @GrpcMethod('ProductService', 'FindOne')
  findOne(
    data: {data:{id: number}}
    ){
    const {id} = data;
    return this.productsService.findOne(id);
  }
  @GrpcMethod('ProductService', 'FindAll')
  async findAll(data){
    const products = await this.productsService.findAll();
    return {data: products};
  }
  @GrpcMethod('ProductService', 'Delete')
  remove(data:{id:number}){
    const {id} = data;
    try {
      return this.productsService.remove(id);
    } catch(e){
      if(e instanceof EntityNotFoundError){
        throw new RpcException({
          message: 'Product not found',
          code: status.NOT_FOUND,
        })
      }
    }
  }
}