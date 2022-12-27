import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() cnevent?: any;
  title: string = "CodingArc | Delhi Technological University";

  constructor() {
  }

  ngOnInit() {
  }

  addZero(val:number){
    if(val<=9){
      return "0" + val;
    }
    return val;
  }


  convertDate(data: any): string {
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    let date = new Date(data*1000);
    let hrs = date.getHours()
    let minutes = this.addZero(date.getMinutes());
    let meta = date.getHours() >=12? "PM": "AM";
    let day = this.addZero(date.getDay());
    let month = months_arr[date.getMonth()];
    let year = date.getFullYear();
    let val = hrs > 12? (+hrs-12): +hrs;
    let hours = this.addZero(val===0? 12: val);

    return hours+":"+minutes+" "+meta+", "+day+" "+month+" "+year;
  }

  registrationEndDate(data:any): string{
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    let date = new Date(data*1000);
    let hrs = date.getHours()
    let minutes = this.addZero(date.getMinutes());
    let meta = date.getHours() >=12? "PM": "AM";
    let day = this.addZero(date.getDay());
    let month = months_arr[date.getMonth()];
    let val = hrs > 12? (+hrs-12): +hrs;
    let hours = this.addZero(val===0? 12: val);

    return day + " " + month +", " + hours + ":" + minutes + " " + meta;
  }

  getSubarray(tags: string[]): string[]{
    if(tags.length>3){
      return tags.slice(0, 3);
    }
    return tags;
  }

  isRegistrationValid(start:number, end:number): boolean{
    let current = new Date().valueOf();
    current/=1000;

    if(current>=start && current<=end){
      return true;
    }
    return false;
  }

}
