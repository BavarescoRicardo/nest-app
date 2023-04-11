import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class HttpRequestService {
    constructor(private readonly httpService: HttpService) {}

    async getUsers(): Promise<any> {
        return this.httpService.get('https://reqres.in/api/users/').pipe(
            map(response => response.data.data)
          );            
    }

    async getUserById(id): Promise<any> {
            return this.httpService.get(`https://reqres.in/api/users/${id}`).pipe(
                map(response => response.data.data)
              );             
    }
    
    async getUserAvatarById(id: number): Promise<any> {
      const avatar = await this.httpService.get(`https://reqres.in/api/users/${id}`).pipe(
            map(response => response.data.data.avatar)
        );
      return avatar;
    }
}
