import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductGrpcServerController } from './product-grpc-server/product-grpc-server.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductGrpcClientController } from './product-grpc-client/product-grpc-client.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    //sync
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'app:50051',
          package: 'product',
          protoPath: join(__dirname, 'proto/product.proto'),
        },
      },
    ]),
    /*
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'nest-group1' + Math.random(),
          },
        },
      },
    ]),
    */
  ],
  controllers: [
    ProductsController,
    ProductGrpcServerController,
    ProductGrpcClientController,
  ],
  providers: [ProductsService, 
    /*
    {
    provide: "KAFKA_PRODUCER",
    useFactory: async(kafkaClient: ClientKafka) => {return kafkaClient.connect();},
    inject: ['KAFKA_SERVICE']
    }
    */
  ],
})
export class ProductsModule {}
