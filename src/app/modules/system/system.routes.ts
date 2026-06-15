import { Routes } from "@angular/router";
import { KafkaComponent } from "./kafka/kafka.component";
import { OutboxEventComponent } from "./outbox-event/outbox-event.component";

export const SYSTEM_ROUTES: Routes = [
    {
        path: 'kafka-events',
        component: KafkaComponent,
    },
    {
        path: 'outbox-events',
        component: OutboxEventComponent,
    }
];