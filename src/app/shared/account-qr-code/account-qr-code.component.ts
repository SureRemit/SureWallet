import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-qr-code',
  templateUrl: './account-qr-code.component.html',
  styleUrls: ['./account-qr-code.component.css']
})

export class AccountQrCodeComponent implements OnInit, OnChanges {


  @Input() qrSrc: string = '';
  @Input() qrSize: number = 150;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {

  }


}
