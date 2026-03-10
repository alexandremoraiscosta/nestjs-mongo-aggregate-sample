import { Injectable } from '@nestjs/common';
import { DomainEvent } from './domain-event.interface';
import { EventsPublisher } from './events.publisher';

@Injectable()
export class SqsLikeEventsPublisher implements EventsPublisher {
  async publish(event: DomainEvent): Promise<void> {
    const message = {
      queue: 'orders-events',
      messageId: crypto.randomUUID(),
      body: event,
      publishedAt: new Date().toISOString(),
    };

    console.log(
      JSON.stringify({
        level: 'info',
        message: 'event_published',
        queue: message.queue,
        messageId: message.messageId,
        eventType: event.eventType,
        payload: event.payload,
        timestamp: message.publishedAt,
      }),
    );
  }
}