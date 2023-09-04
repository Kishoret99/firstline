import { Controller, Get } from '@nestjs/common'

import { DummyService } from './dummy.service'

@Controller('api/dummy')
export class DummyController {
  constructor(private dummyService: DummyService) {}

  @Get()
  async one(): Promise<any> {
    return this.dummyService.get()
  }
}
