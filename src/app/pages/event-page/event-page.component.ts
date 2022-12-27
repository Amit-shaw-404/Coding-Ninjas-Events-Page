import { Component, ViewChild } from '@angular/core';
import { EventTagsService } from 'src/app/service/event-tags.service';
import { FetchEventsService } from 'src/app/service/fetch-events.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
  selectedEventCat: string = "ALL_EVENTS";
  selectedSubcat: string = "Upcoming";
  selectedTags: string[] = [];
  pageNumber: number = 1;
  totalPages: number = 0;

  showAllTags: boolean = false;
  allTags: string[] = [];

  allEvents: Array<any> = []

  showMobileFilters: boolean = false;

  @ViewChild('main') main?: any;
  @ViewChild('pagenumberinput') input?: any;



  constructor(private tagService: EventTagsService, private fetchEventService: FetchEventsService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._route.queryParams
    .subscribe(params=>{

      if(params["event_category"] == null){
        this.navigateTo();
      }else{
        this.selectedEventCat = params["event_category"];
        this.selectedSubcat = params["event_sub_category"];
        this.selectedTags = params["tags"].split(',');
        this.pageNumber = +params["page"];


        this.fetchAllEvent();
      }
    })
    // this.selectedEventCat = params["event_category"];

    this.tagService.getAllTags()
      .subscribe((data: any) => this.allTags = data?.data?.tags);
  }

  fetchAllEvent() {

    this.fetchEventService.getAllEvents(this.selectedEventCat, this.selectedSubcat, this.selectedTags, this.pageNumber-1)
      .subscribe((data: any) => { console.log(data.data.events); this.allEvents = data?.data?.events; this.totalPages = data?.data?.page_count; this.main?.nativeElement?.scrollIntoView() });
  }


  setSelectedEventCat(cat: string): void {
    this.selectedEventCat = cat;
    this.navigateTo();
  }

  setSelectedSubcat(subcat: string): void {
    this.selectedSubcat = subcat;
    this.navigateTo();
  }

  selectTag(tag: string): void {
    this.selectedTags.push(tag);
    this.navigateTo();
  }

  unselectTag(tag: string) {
    this.selectedTags = this.selectedTags.filter((str: string) => (str !== tag));
    this.navigateTo();
  }

  isSelectedTag(tag: string) {

    return this.selectedTags.find((str: string) => (str === tag));
  }

  getAlTags(): string[] {
    if (this.showAllTags) {
      return this.allTags;
    } else {
      return this.allTags.slice(0, 10);
    }
  }

  preChangePage() {
    console.log(this.input.nativeElement);
    let value = +(this.input.nativeElement.value);
    console.log(value-this.pageNumber);

    if (value <= 0) value = 1;
    if (value >= this.totalPages) value = this.totalPages;

    value = value - this.pageNumber;

    this.changePage(value);

  }
  changePage(val: number) {
    console.log(val, typeof(val), typeof(this.pageNumber));
    this.pageNumber = this.pageNumber + (+val);
    this.navigateTo();
  }

  shouldShowTag(): boolean {

    if (window.innerWidth <= 700) return false;

    return true;
  }

  setShowMobileFilters(val: boolean) {
    this.showMobileFilters = val
  }

  navigateTo(){

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams:{
        event_category: this.selectedEventCat,
        event_sub_category: this.selectedSubcat,
        tags: this.selectedTags.join(','),
        page: this.pageNumber
      },
      queryParamsHandling: 'merge',
      skipLocationChange:false
    })

    this.fetchAllEvent();
  }
}
