# restaurant-service-products

# kafka
полный список сервисов - docker-compose exec kafka bash -> kafka-

проверка работоспособности сервисов kafka-console-consumer(terminal2, terminal3) && kafka-console-producer(terminal1) в терминале 

terminal1(produser) => kafka-console-producer --topic restaurant-service-products --boostrap-server localhost:9092
terminal2(consumer1) => kafka-console-consumer --topic restaurant-service-products --boostrap-server localhost:9092
terminal3(consumer2) => kafka-console-consumer --topic restaurant-service-products --boostrap-server localhost:9092
 
если нужно распараллелить - kafka-console-producer --topic restaurant-service-products --partitions 2 --boostrap-server localhost:9092 => посмотреть созданное - kafka-topics --describe --topic restaurant-service-products --boostrap-server localhost:9092

# confluence remote 
все в одном - https://github.com/confluentinc/cp-all-in-one/blob/6.2.1-post/cp-all-in-one/docker-compose.yml