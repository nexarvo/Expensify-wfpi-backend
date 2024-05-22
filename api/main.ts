import {NestFactory} from '@nestjs/core';
import {AppModule} from '../src/app.module';
import {ValidationPipe} from '@nestjs/common';
import {swaggerLoader} from '../src/utils/loaders/swaggerLoader';
import * as dotenv from 'dotenv';

async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    swaggerLoader(app);

    await app.listen(3000);
}
bootstrap();
