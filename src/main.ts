import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.use(cookieParser());

  app.enableCors({ credentials: true, origin: true });

  const config = new DocumentBuilder()
    .setTitle("TaskManager")
    .setDescription("TaskManager for ESoft")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(10000);
}
bootstrap();
