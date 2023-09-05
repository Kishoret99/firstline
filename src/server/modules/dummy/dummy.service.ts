import { Injectable } from '@nestjs/common';

@Injectable()
export class DummyService {
  async get(): Promise<any> {
    return { name: 'Toth Janos!' };
  }
}
