import { TextsService } from './../texts.service';
import { SelectionModel } from '@angular/cdk/collections';
import { RulesService } from './../../rules/rules.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-text-filter-by-inconsistency',
  templateUrl: './text-filter-by-inconsistency.component.html',
  styleUrls: ['./text-filter-by-inconsistency.component.css']
})
export class TextFilterByInconsistencyComponent implements OnInit {

  showSpinner = false
  inconsistencies: any = []
  userIds:any = []
  constructor(
    private rulesService: RulesService,
    private textsService: TextsService,
    private authService: AuthService,
    private matDialogRef: MatDialogRef<TextFilterByInconsistencyComponent>,
    @Inject(MAT_DIALOG_DATA) public dataSource: any,
  ) {  }

  idUser: any
  ngOnInit() {   
    this.idUser = this.authService.getUserId()
    this.getAllInconsistencies();
  }

  ELEMENT_DATA:  any;
  displayedColumns: string[] = [ 'select', 'user', 'name', 'pattern', 'description'];
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getAllInconsistencies() {
    this.showSpinner = true;
    this.textsService.currentMessageUser.subscribe((response:any) => {
      if(response.dataFilter!=null) {
        this.rulesService
          .getAllInconsistencies()
            .subscribe(
              (result:any) => {
                response.dataFilter.forEach(idUser => {
                  result.forEach(rule => {
                    if(rule.user == idUser && this.idUser == idUser) {
                      this.inconsistencies.push(rule)
                    }else if(rule.user == idUser && rule.type == 1) {
                      this.inconsistencies.push(rule)
                    }
                  });
                })
                this.dataSource = new MatTableDataSource<any>(this.inconsistencies);
                this.dataSource.paginator = this.paginator;
                this.selection = new SelectionModel<any>(true, this.inconsistencies);
                this.showSpinner = false;
              })        
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  isOnlyOneSelected() {
    return (this.selection.selected.length == 1) ? false : true;
  }

  filterByInconsistenciesId() {
    let inconsistenteciesIds = []
    for(let item of this.selection.selected)
      inconsistenteciesIds.push(item.id);
    return inconsistenteciesIds;
  }

  public closeModal() {
    this.matDialogRef.close();
  }
}
