export const rabbitConfig = {
  urls: ['amqp://localhost:5672'],
  queue: 'task_queue',
  queueOptions: {
    durable: true,
  },
};