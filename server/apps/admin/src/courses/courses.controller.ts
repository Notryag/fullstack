import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
// import { get } from 'http';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) { }

  @Get('option')
  option() {
    return {
      title: '课程管理',
      column: [
        { label: '课程名称', prop: 'name', search: true, regex: true },
        { label: '封面图', prop: 'cover' },
      ],
    };
  }
}
