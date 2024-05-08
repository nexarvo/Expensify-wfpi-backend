import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// eslint-disable-next-line func-names
export const swaggerLoader = function (app: INestApplication): void {
  let configBuilder = new DocumentBuilder()
    .setTitle('Expensify Helper')
    .setDescription('Expensify Helper API Description')
    .setVersion('1.0')

  const config = configBuilder.build();
  const swaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'none',
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
    },
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document, swaggerCustomOptions);
};
