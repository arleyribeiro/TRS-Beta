import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TextsService } from './../texts/texts.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private textsService: TextsService,
              private router: Router,
              private matDialogRef: MatDialogRef<NotificationComponent>,
              @Inject(MAT_DIALOG_DATA) public dataSource: any

  ) { }

  notifications: any = []
  dataSharedTexts: any = []
  displayedColumns: string[] = ['select', 'textName', 'onwerName', 'created', 'option'];
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    //this.getNotifications()
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  isOnlyOneSelected(element) {
    return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id) ? false : true;
  }

  redirectTo(item) {
    let data = item.dataId
    data.visited = true
    this.textsService.updateSharedText(item.id, data).subscribe(response => {
      this.closeModal()
      this.router.navigate(['texts/text-view-corrections/', item.idText])
    })
  }

  closeModal() {
    this.matDialogRef.close()
  }
}
