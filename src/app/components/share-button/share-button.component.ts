import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.css']
})
export class ShareButtonComponent implements OnInit {
  @Input() text: string;
  @Input() shareUrl: string;
  navUrl: string;

  constructor() { }

  ngOnInit() { }

  public share(type) {
    let searchParams = new URLSearchParams();
    let url = environment.apiUrl;
    switch(type) {
      case 'facebook':
        searchParams.set('u', url + this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'messenger':
        searchParams.set('u', url + this.shareUrl);
        this.navUrl = 'https://m.me/' + searchParams;
        break;
      case 'telegram':
        searchParams.set('url', url + this.shareUrl);
        this.navUrl = 'https://t.me/share?text='+this.text+'&'+searchParams;
        break;
      case 'twitter':
        searchParams.set('url', url + this.shareUrl);
        this.navUrl =  'https://twitter.com/share?text='+this.text+'&' + searchParams;
        break;
	  case 'linkedin':
        searchParams.set('url', url + this.shareUrl);
        this.navUrl =  'http://www.linkedin.com/shareArticle?mini=true&' + searchParams;
        break;
	  case 'whatsapp':
        searchParams.set('url', url + this.shareUrl);
        this.navUrl =  'https://api.whatsapp.com/send?text='+this.text +' '+ searchParams;
        break;
    }
    return window.open(this.navUrl, "sharer", "toolbar=20,status=0,width=500,height=495");
  }

}
