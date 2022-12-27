import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from 'src/assets/data/constant';
import tags from 'src/assets/data/tags';

@Injectable({
  providedIn: 'root'
})
export class EventTagsService {

  constructor(private httpClient: HttpClient) { }

  getAllTags() {
    let tags;
    try {
      tags = this.httpClient.get(BASE_URL + "/event_tags");
      return tags;
    } catch (err) {
      if(err instanceof Error){
        console.log(err.message);
      }
    }
    return of({data: {tags: []}});
  }
}
