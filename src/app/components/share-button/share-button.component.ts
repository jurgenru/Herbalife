import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.css']
})
export class ShareButtonComponent implements OnInit {
  @Input() type: 'facebook' | 'twitter' | 'google-plus';
  @Input() shareUrl: string;
  navUrl: string;

  constructor() { }

  ngOnInit() {
    this.createNavigationUrl();
  }

  private createNavigationUrl() {
    let searchParams = new URLSearchParams();
    let url = 'http://localhost:4200/#/';
    switch(this.type) {
      case 'facebook':
        searchParams.set('u', url + this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'google-plus':
        searchParams.set('ur', url + this.shareUrl);
        this.navUrl = 'https://plus.google.com/share?' + searchParams;
        break;
      case 'twitter':
        searchParams.set('url', url + this.shareUrl);
        this.navUrl =  'https://twitter.com/share?' + searchParams;
        break;
    }
  }

  public share() {
    return window.open(this.navUrl, "_blank");
  }

}
