import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit{
  data: any;
  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  users = [
    {userId: 1, username: 'lior', type: 'scouter', isAdmin: 1},
    {userId: 1, username: 'lior', type: 'scouter', isAdmin: 1},
    {userId: 1, username: 'lior', type: 'scouter', isAdmin: 1},
    {userId: 1, username: 'lior', type: 'scouter', isAdmin: 1},
    {userId: 2, username: 'tomer', type: 'player', isAdmin: 0},
    {userId: 2, username: 'tomer', type: 'player', isAdmin: 0},
  ];

  constructor() {
    this.data = {
      labels: ['A','B'],
      datasets: [
        {
          data: [300, 50],
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


  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = 400;
    canvasEl.height = 400;
    this.cx.font = "30px Arial";
    this.cx.fillText("Hello World", 10, 50);
    // set some default properties about the line
    // this.cx.lineWidth = 3;
    // this.cx.lineCap = 'round';
    // this.cx.strokeStyle = '#000';
    //
    // // we'll implement this method to start capturing mouse events
    // this.captureEvents(canvasEl);
  }
}



