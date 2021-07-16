import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8000, { namespace: 'sample', cors: true })
export class SampleGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SampleGateway.name);

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    // throw new Error('Method not implemented.');
    this.logger.log(`Gateway Init`);
  }

  handleDisconnect(client: any) {
    // throw new Error('Method not implemented.');
    console.log('client.id', client.id);

    this.server.emit('msgToClient', { message: "test"});
    this.logger.log(`disconnection`);
  }

  handleConnection(client: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
    console.log('client.id', client.id);

    this.server.emit(`${client.id}`, { message: client.id});
    this.logger.log(`connection`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: any): string {
    console.log('client', client);
    console.log('payload', payload);

    this.server.emit('msgToClient', { message: "test"});

    return 'Hello world!';
  }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }

  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number): number {
    // id === messageBody.id
    return id;
  }
  
}
