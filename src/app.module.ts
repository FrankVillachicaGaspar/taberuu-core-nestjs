import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './context/users/infrastructure/user.module';
import { LoggerModule } from 'nestjs-pino';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './shared/middlewares/correlation-id/correlation-id.middleware';
import { FastifyRequest } from 'fastify';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config/config-loader.config';
import {
  configValidationSchema,
  validationOptions,
} from './config/config-validation-schema.config';
import { SharedModule } from './shared/shared.module';
import { SeedModule } from './context/seed/infrastructure/seed.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'DEVELOPMENT'
            ? {
                target: 'pino-pretty',
                options: {
                  messageKey: 'message',
                },
              }
            : undefined,
        messageKey: 'message',
        customProps: (req: FastifyRequest['raw']) => {
          return { correlationId: req.headers[CORRELATION_ID_HEADER] };
        },
        autoLogging: false,
        serializers: {
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          },
        },
      },
    }),
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: configValidationSchema,
      validationOptions: validationOptions,
    }),
    UserModule,
    SharedModule,
    SeedModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
