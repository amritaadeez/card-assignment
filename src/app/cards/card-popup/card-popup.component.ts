import {
  Component,
  HostListener,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  CreditCardValidators
} from './CreditCardValidators';
import {
  CreditCard
} from 'angular-cc-library';
import {
  defer
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import {
  CardService
} from 'src/app/card.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss']
})
export class CardPopupComponent implements OnInit {
  spinner: boolean = false
  cardDetailsForm!: FormGroup;
  submitted = false;

  array: Array < any > = []


  months: Array < any >= [{
      month: '01'
    },
    {
      month: '02'
    },
    {
      month: '03'
    },
    {
      month: '04'
    },
    {
      month: '05'
    },
    {
      month: '06'
    },
    {
      month: '07'
    },
    {
      month: '08'
    },
    {
      month: '09'
    },
    {
      month: '10'
    },
    {
      month: '11'
    },
    {
      month: '12'
    }

  ];
  years: Array < any >= [{
      year: '2022'
    },
    {
      year: '2023'
    },
    {
      year: '2024'
    },
    {
      year: '2025'
    },
    {
      year: '2026'
    },
    {
      year: '2027'
    },
    {
      year: '2028'
    },
    {
      year: '2029'
    },
    {
      year: '2030'
    },
    {
      year: '2031'
    },
    {
      year: '2032'
    },
    {
      year: '2033'
    },
    {
      year: '2034'
    },
    {
      year: '2035'
    },
    {
      year: '2036'
    },
    {
      year: '2037'
    },
    {
      year: '2038'
    },
    {
      year: '2039'
    },
    {
      year: '2040'
    },
    {
      year: '2041'
    },
    {
      year: '2042'
    },
    {
      year: '2043'
    },

  ];

  types = defer(() => this.cardDetailsForm.get('creditCard')?.valueChanges)
  .pipe(map((num: string) => CreditCard.cardType(num)));
  cardType: any;
  data: any;
  validateCard: boolean = false;



  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar , public dialogRef: MatDialogRef < CardPopupComponent > , private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.cardType = cardService.CardDefinition

    this.data = data

  }

  ngOnInit() {
    this.cardDetailsForm = this.fb.group({
      creditCard: ['', [Validators.required, CreditCardValidators.validateCCNumber]],
      expMonth: ['', [Validators.required]],
      expYear: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4),   
      
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
    });
  }
  onNoClick(): void {

    this.dialogRef.close();
  }

  checkCard(event: any) {
    this.validateCard = true

  }


  get cardDetails() {
    return this.cardDetailsForm.controls;
  }

  goToNextField(controlName: string, nextField: HTMLInputElement) {
    controlName.split(/[\s\/]+/, 2);
    if (this.cardDetailsForm.get(controlName)?.valid) {
      nextField.focus();
    }
  }

  onSubmit(data: any, type: any) {
    this.submitted = true;

    if (this.cardDetailsForm.invalid) {
      return
    }

    var cardobj = {
      cardNumber: data.creditCard,
      expMonth: data.expMonth,
      expYear: data.expYear,
      cvv: data.cvv,
    }

    var cardDetails = JSON.parse(localStorage.getItem('cardDetails') || '[]')
    for(let i = 0; i < cardDetails.length; i++) {
      if(cardDetails[i].cardNumber === data.creditCard ) {
        alert("You can't add the same cards again")
        return
      }
    } 
    cardDetails.push(cardobj)
    localStorage.setItem('cardDetails', JSON.stringify(cardDetails))
    this._snackBar.open("Card has been Added to the List", "Close", {
      duration:  1000,
    });

    this.onNoClick()
  }


  deleteCard(card: any) {
  

    var cardobj = {
      cardNumber: this.data.text.cardNumber,
      expMonth: this.data.text.expMonth,
      expYear: this.data.text.expYear,
      cvv: this.data.text.cvv,
    }

    var cardDetails = JSON.parse(localStorage.getItem('cardDetails') || '[]')

    this.onNoClick()
    
    
    for (let i = 0; i < cardDetails.length; i ++) {
      if (cardDetails[i].cardNumber === this.data.text.cardNumber) {

        cardDetails.splice(i, 1)
        localStorage.setItem('cardDetails', JSON.stringify(cardDetails))
        this._snackBar.open("Card has been Deletec from the List", "Close" , {
          duration:  1000,
        });
        this.onNoClick()
      
        return
      } 
    
    }
   
  }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 19) {
      trimmed = trimmed.substr(0, 19);
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');

  }

}
