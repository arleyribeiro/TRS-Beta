import { TestComponent } from './../../test/test.component';
import { TextFilterByInconsistencyComponent } from './../text-filter-by-inconsistency/text-filter-by-inconsistency.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { UsersService } from '../../users/users.service';
import { TextsService } from '../texts.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { RulesService } from '../../rules/rules.service';

@Component({
  selector: 'app-text-filter-by-users',
  templateUrl: './text-filter-by-users.component.html',
  styleUrls: ['./text-filter-by-users.component.css']
})

export class TextFilterByUsersComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private textsService: TextsService,
    private usersService: UsersService,
    private rulesService: RulesService,
   private dialog: MatDialog
  ) {  }

  showSpinner = false;
  users: any = []
  ELEMENT_DATA:  any;
  displayedColumns: string[] = [ 'select', 'first_name', 'type'];
  selection:any = new SelectionModel<any>(true, []);
  dataSource: any = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  private configuration =  {
    filter: null,
    dataFilter: null
  }

  ngOnInit() {
    this.getAllUsers();
    this.configuration.filter = 'USERS';
    this.configuration.dataFilter = [1];
    this.textsService.updateDataUser(this.configuration)
  }

  getAllUsers() {
    this.showSpinner = true;
    this.usersService.getUsers().subscribe(
      (data: any) => {
                      this.ELEMENT_DATA = [...data]; 
                      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
                      this.dataSource;
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.data.forEach(element => {
                        if(element.id == 1){
                          this.selection = new SelectionModel<any>(true, [element]);
                        }
                      });
                      this.showSpinner = false;
      },
      error => {this.showSpinner = false;}
    );   
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

  filterByUsersId() {
    let userIds = []
    for(let item of this.selection.selected)
      userIds.push(item.id);
    return userIds;
  }

  openFilterByInconsistencies() {
    const dialogRef = this.dialog.open(TextFilterByInconsistencyComponent, { disableClose: true });
      dialogRef
        .afterClosed()
          .subscribe(result => {
            if(result != null && result.length != 0) {
              this.configuration.filter = 'INCONSISTENCY';
              this.configuration.dataFilter = result;
              this.textsService.updateDataUser(this.configuration)
            }
            this.dialog.closeAll();
          });   
  }

  onSubmit() {
    this.configuration.filter = 'USERS';
    this.configuration.dataFilter = this.filterByUsersId();    
    this.textsService.updateDataUser(this.configuration);

    const dialogConfig = this
                          .dialog
                            .open(TestComponent, { disableClose: true,
                                data: {
                                  title: 'Personalizar conjunto de regras',
                                  content: (this.configuration.dataFilter.length) > 1 ? 'Você deseja personalizar o conjunto de regras dos usuários selecionados?' : 'Você deseja personalizar o conjunto de regras do usuário selecionado?',
                                  buttonConfirm: 'Sim',
                                  buttonCancel: 'Não'}
      });
    
    dialogConfig
      .afterClosed()
        .subscribe(response => {
          if(response) {
            this.openFilterByInconsistencies()
          }else {
            this.dialog.closeAll()
          }
          this.textsService.updateDataUser(this.configuration)
        })
  }
}
