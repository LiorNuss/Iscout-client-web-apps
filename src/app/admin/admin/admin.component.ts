import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserDaoService} from "../../shared/services/user-dao.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit, OnInit {
  data: any;
  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  users = [];
  username:string;
  type:string;
  isadmin: string;
  playerCount = 0;
  scouterCount = 0

  constructor(private userDao: UserDaoService) {

  }


  ngOnInit(): void {
    this.searchUsers('', '', '');
    this.getUsersDeiversity();

  }

  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = 200;
    canvasEl.height = 100;
    this.cx.font = "30px Arial";
    this.cx.fillText("Admin Panel", 10, 50);
    // set some default properties about the line
    // this.cx.lineWidth = 3;
    // this.cx.lineCap = 'round';
    // this.cx.strokeStyle = '#000';
    //
    // // we'll implement this method to start capturing mouse events
    // this.captureEvents(canvasEl);
  }

  public searchUsers(username: string, type: string, isadmin: string) {
    this.users = [];
    this.username = username;
    this.type = type;
    this.isadmin = isadmin;

    if (isadmin === 'Yes') {
      isadmin = 'true';
    }
    else if (isadmin === 'No') {
      isadmin = 'false';
    }
    this.userDao.searchUsers(username, type, isadmin).subscribe(users => {
      users.forEach(currUser => {
        let isAdmin = 'No';

        if (currUser.isadmin == 1) {
          isAdmin = 'Yes';
        }
        let user = {
          userId: currUser.id,
          username: currUser.username,
          type: currUser.type,
          isAdmin: isAdmin,
          entityId: currUser.entityid
        };

        this.users.push(user);
      });
    });
  }

  public deleteUser(userId: number, userType: string, entityId: number) {
    this.userDao.deleteUser(userId, userType, entityId).subscribe(() => {
      this.searchUsers(this.username, this.type, this.isadmin);
    });
  }

  public getUsersDeiversity() {
    this.userDao.getUsersDeiversity().subscribe(divers => {
      divers.forEach(currDivers => {
        if (currDivers._id === 'player') {
          this.playerCount = currDivers.count;
        }
        else if (currDivers._id === 'scouter') {
          this.scouterCount = currDivers.count;
        }
      })
      this.createGraph();
    });
  }

  createGraph() {
    this.data = {
      labels: ['Players','Scouters'],
      datasets: [
        {
          data: [this.playerCount, this.scouterCount],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }
}


