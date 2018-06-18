import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerDaoService} from './player-utils/services/player-dao.service';
import {Player} from './player-utils/entities/player';
import {InitService} from "./shared/services/init.service";
import {LoginService} from "./login/login.service";
import {Router} from "@angular/router";
import {User} from "./shared/classes/user";
import {SearchRowService} from "./search-row/search-row.service";
import {Message} from "primeng/api";
import {OfferManagerService} from "./offers/offer-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  registarion = false;
  profile = false;
  searchPlayer = false;
  searchResults = false;
  login = true;
  dashboard = false;
  msgs: Message[] = [];

  constructor(private initService: InitService,
              private loginService: LoginService,
              private router: Router,
              private offerManagerService: OfferManagerService) {
    this.getMessages();
  }

  ngOnInit(): void {
   this.initService.init();
  }

  logout() {
    this.loginService.user = new User();
    this.router.navigate(['/login']);
  }


  getMessages() {
    this.offerManagerService.offerEvent.subscribe(message => {
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Offer Recived', detail:'you got an offer from ' + message.scouter_name});
    });
  }

}
