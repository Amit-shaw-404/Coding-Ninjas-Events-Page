import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BASE_URL } from 'src/assets/data/constant';
import tags from 'src/assets/data/tags';

@Injectable({
  providedIn: 'root'
})
export class FetchEventsService {

  constructor(private httpClient: HttpClient) { }

  getAllEvents(event_cat: string, event_sub_cat: string, tags: string[], offset: number) {
    try {
      const data = this.httpClient.get(BASE_URL+"/events", {
        params: {
          event_category: event_cat,
          event_sub_category: event_sub_cat,
          tag_list: tags.join(','),
          offset
        }
      })
      return data;
    }catch(err){
      if(err instanceof Error){
        console.log(err);
      }
    }
    return of({});
  }
}
