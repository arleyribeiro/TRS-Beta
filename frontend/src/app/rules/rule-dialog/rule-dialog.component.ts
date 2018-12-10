import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-rule-dialog',
  templateUrl: './rule-dialog.component.html',
  styleUrls: ['./rule-dialog.component.css']
})
export class RuleDialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<RuleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public closeModal() {
    this.matDialogRef.close();
  }

}
