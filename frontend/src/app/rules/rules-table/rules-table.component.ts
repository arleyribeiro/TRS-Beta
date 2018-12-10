import { TestComponent } from './../../test/test.component';
import { MatDialog } from '@angular/material/dialog';
import { RuleFormComponent } from './../rule-form/rule-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RulesService } from '../rules.service';
import { AuthService } from '../../login/auth.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-rules-table',
  templateUrl: './rules-table.component.html',
  styleUrls: ['./rules-table.component.css']
})
export class RulesTableComponent implements OnInit {

  constructor(private rulesService: RulesService, 
              private dialog: MatDialog,
              private authService: AuthService,
              private usersService: UsersService
  ) { }

  showSpinner = false;
  ELEMENT_DATA:  any;
  displayedColumns: string[] = [ 'select', 'user', 'created', 'name', 'pattern', 'description', 'type', 'option'];
  displayedColumnsOthers: string[] = [ 'user', 'created', 'name', 'pattern', 'description', 'type'];
  dataSource: any;
  dataSourceOthers: any;
  private myRules = 0
  selection = new SelectionModel<any>(true, []);
  private userId:any = null
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  user:any

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceOthers.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.userId = this.authService.getUserId()
    this.getAllInconsistencies();
  }

  getAllInconsistencies() {
    this.showSpinner = true;
    this.rulesService.getAllInconsistencies().subscribe(
      (data: any) => {this.ELEMENT_DATA = [...data];
                      let owner:any = []
                      let other:any = []
                      this.myRules = 0
                      this.ELEMENT_DATA.forEach(element => {
                        element.profile = element.role==1 ? 'Estudante' : 'Professor(a)';
                        if(element.user == this.userId) {
                          this.myRules +=1
                          owner.push(element)
                        }else {
                          other.push(element)
                        }
                      });
                      this.dataSource = new MatTableDataSource<any>(owner);
                      this.dataSource.paginator = this.paginator;

                      this.dataSourceOthers = new MatTableDataSource<any>(other);
                      this.dataSourceOthers.paginator = this.paginator;
                      this.showSpinner = false;
      },
      error => { this.showSpinner = false; }
    );   
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === this.myRules;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          if(row.user == this.userId) {
            this.selection.select(row)
          }
        });
  }

  isMultiSelected() {
    return (this.selection.selected.length > 1) ? true : false;
  }

  isOnlyOneSelected(element) {
    return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id && this.selection.selected[0].user == this.userId) ? false : true;
  }

  isOwner(item) {
    return (item.user == this.userId) 
  }

  openEditModal() {
    const dialogRef = this.dialog.open(RuleFormComponent, {width: '90%', data: this.selection.selected[0] });
    dialogRef
      .afterClosed()
        .subscribe(result => {
            this.getAllInconsistencies()
            this.selection.clear()
        });
    
  }

  openNewModal() {
    const dialogRef = this.dialog.open(RuleFormComponent, {width: '90%'});
    dialogRef
        .afterClosed()
            .subscribe(result => {
                this.getAllInconsistencies()
            });
  }

  openDeleteModal() {
    let length = this.selection.selected.length
    let title = (length > 1) ? 'Deseja excluir as regras selecionadas?' : 'Deseja excluir a regra selecionada?';
    let content = 'Após esta operação ' + length +  (length > 1 ? ' registros serão excluídos.' : ' registro será excluído.');
    const dialogRef = this.dialog.open(TestComponent, {data: {title: title, content: content, buttonConfirm: 'Sim', buttonCancel: 'Não'}});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {       
        if(length) {
          this.showSpinner = true;
          this.selection.selected.forEach((item, index) => {        
            this.rulesService.deleteInconsistency(item.id).subscribe(response=>{
              if(index == length-1){
                this.getAllInconsistencies();   
                this.selection.clear()
              }
            })
          })       
        }
        this.showSpinner = false;
        this.dialog.open(TestComponent, {data: {
          title: (length>1) ? 'Regras excluídas' : 'Regra excluída',
          content: (length>1) ? 'As regras foram excluídas com sucesso.' : 'A regra foi excluída com sucesso.',
          buttonCancel: '',
          buttonConfirm: 'Ok'
        }})
      }
    });    
  }


}



