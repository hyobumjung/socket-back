import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleGateway } from './gateway/sample.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SampleGateway],
})
export class AppModule {}
