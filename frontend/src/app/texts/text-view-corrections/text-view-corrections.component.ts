import { TextDialogComponent } from './../text-dialog/text-dialog.component';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TextsService } from './../texts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-view-corrections',
  templateUrl: './text-view-corrections.component.html',
  styleUrls: ['./text-view-corrections.component.css']
})
export class TextViewCorrectionsComponent implements OnInit {

  dataText:any = []
  totalRevisionNumber = 0
  totalInconsistenciesFound = 0
  totalSuggestionsApplied = 0
  foundRulesNumber = 0
  showSpinner = false
  constructor(  private route: ActivatedRoute,
                private router: Router,
                private textsService: TextsService,
                private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['revisionNumber', 'appliedSuggestionsNumber', 'foundInconsistenciesNumber', 'result'];
  dataSource: any = []
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.showSpinner = true;
    this.textsService
      .getTextsHistoric(id)
        .subscribe(
          (response:any) => {
            this.dataText = response
            this.dataSource = new MatTableDataSource(response.foundInconsistencies);
            this.getTextInfo()
            this.showSpinner = false;
          })
  }
  panelOpenInfoText = false
  panelOpenText = false
  panelOpenInfoChanges = false

  getTextInfo () {
    this.totalRevisionNumber = this.dataText.foundInconsistencies.length
    for(let item of this.dataText.foundInconsistencies){
      this.totalInconsistenciesFound += item.foundInconsistenciesNumber
      this.totalSuggestionsApplied += item.appliedSuggestionsNumber
      this.foundRulesNumber += item.foundRulesNumber
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isOnlyOneSelected(element) {
    return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id) ? false : true;
  }

  getTip(event,tip) {
    let content = ['', '']
    let type = ['', 'TOTAL_SUGGESTIONS_APPLIED', 'FOUND_RULES_NUMBER', 'TOTAL_INCONSISTENCIES_FOUND', 'REGEX', 'REGEX2', 'VISIBILITY', 'VISIBILITY_PUBLIC','VISIBILITY_PRIVATE', 'ADD_RULE']
    if(event.keyCode != 13) {
      let dialogRef = this.dialog.open(TextDialogComponent,
      { 
        data: {
          title: 'Ajuda',
          content: '',
          buttonConfirm: 'Ok',
          buttonCancel: '',
          type: type[tip]
        }
      })
    }      
  }
}
 