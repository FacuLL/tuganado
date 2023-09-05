import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CowModule } from './entities/cow/cow.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordModule } from './entities/record/record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tuganado',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CowModule,
    RecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
