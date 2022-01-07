import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  CardPopupComponent
} from '../card-popup/card-popup.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  cards: any;
  info: any;
  mask: any
  toggle: boolean = false;

  constructor(private dialog: MatDialog) {

    this.listCards()

  }

  listCards() {
    this.info = localStorage.getItem("cardDetails")
    this.cards = JSON.parse(this.info)

  }

  maskData(data: any) {
    var cardnumber = data
    var first4 = cardnumber.substring(0, 4);
    var last5 = cardnumber.substring(cardnumber.length - 5);

    this.mask = cardnumber.substring(4, cardnumber.length - 5).replace(/\d/g, "X");
    return first4 + this.mask + last5;
  }

  ngOnInit(): void {}

  actionDialog(action: any) {
    const dialogRef = this.dialog.open(CardPopupComponent, {
      panelClass: ['animate__animated', 'animate__slideInRight'],
      disableClose: true,
      autoFocus: false,
      // width: '500px',
      data: {
        text: action,
        yes: 'Yes',
        no: 'OK'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.listCards()
    });
  }

  // showCvv(cvv: any) {
  //   this.toggle = !this.toggle

  //   if (!this.toggle) {
  //     var first3 = "XXX";
  //     cvv = first3
  //     return cvv
  //   } else {
     
  //     return cvv
  //   }
  // }


}
