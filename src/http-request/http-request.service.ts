import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class HttpRequestService {
    constructor(private readonly httpService: HttpService) {}

    async getUserById(id: number): Promise<any> {
            return this.httpService.get(`https://reqres.in/api/users/${id}`).pipe(
                map(response => response.data.data)
              );             
    }
    
    async getUserAvatarById(id: number): Promise<any> {
      const user = await this.httpService.get(`https://reqres.in/api/users/${id}`).pipe(
            map(response => response.data.data.avatar)
        );
      return user;
    }
}
