import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server } from 'socket.io';

/**
 * Websocket
 */
@WebSocketGateway()
export class TrackedAccountGateway {
  /**
   * Websocket server
   */
  @WebSocketServer()
  server: Server;

  /**
   * Respond to ready event
   */
  @SubscribeMessage('ready')
  findAll(client: Client, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}
