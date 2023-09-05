import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CowService } from './cow.service';
import { CreateCowDto } from './dto/create-cow.dto';
import { UpdateCowDto } from './dto/update-cow.dto';

@Controller('cow')
export class CowController {
  constructor(private readonly cowService: CowService) {}

  @Post()
  create(@Body() createCowDto: CreateCowDto) {
    return this.cowService.create(createCowDto);
  }

  @Get()
  findAll() {
    return this.cowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCowDto: UpdateCowDto) {
    return this.cowService.update(+id, updateCowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cowService.remove(+id);
  }
}
