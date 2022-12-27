import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isBottom: boolean = false;
  showNavigations: boolean = false;

  // Function to change the header's background color
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.scrollY >= 50) {
      this.isBottom = true;
    } else {
      this.isBottom = false;
    }
  }

  inMobile(): boolean{
    if(window.innerWidth <= 700){
      return true;
    }
    return false;
  }

  setShowNavigation(val: boolean){
    this.showNavigations = val;
  }
}
