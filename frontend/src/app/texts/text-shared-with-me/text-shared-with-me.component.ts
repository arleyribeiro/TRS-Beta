import { AuthService } from './../../login/auth.service';
import { TestComponent } from './../../test/test.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { TextsService } from './../texts.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-shared-with-me',
  templateUrl: './text-shared-with-me.component.html',
  styleUrls: ['./text-shared-with-me.component.css']
})
export class TextSharedWithMeComponent implements OnInit {

  constructor(  private textsService: TextsService,
                private router : Router,
                private dialog: MatDialog,
                private authService: AuthService
  ) { }
  dataSharedTexts: any = []
  displayedColumns: string[] = ['select', 'textName', 'onwerName', 'created', 'option'];
  dataSource: any = []
  selection = new SelectionModel<any>(true, []);
  showSpinner = false;
  id:any
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.id = this.authService.getUserId()
    this.getSharedText();
  }
  getSharedText() {
    this.showSpinner = true;
    this.textsService.getSharedWithMe(this.id).subscribe((response:any) =>{
      this.dataSharedTexts = response
      this.dataSource = new MatTableDataSource(response);
      this.showSpinner = false;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  redirectTo(item) {
    let data = item.dataId
    data.visited = true
    this.textsService.updateSharedText(item.id, data).subscribe(response => {
      this.router.navigate(['texts/text-view-corrections/', item.idText])
    })
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

  refreshTable() {
    this.textsService.getSharedWithMe( this.authService.getUserId() ).subscribe((response:any) =>{
      this.dataSharedTexts = response
      this.dataSource = new MatTableDataSource(response);
    })
  }

  deleteSharedText() {
    let length = this.selection.selected.length
    let title = length > 1 ? 'Deseja remover os textos compartilhados selecionados.' : 'Deseja remover o texto compatilhado?';
    let content = 'Após esta operação ' + length +  (length > 1 ? ' registros serão removidos.' : ' registro será removido.');
    const dialogRef = this.dialog.open(TestComponent, {data: {title: title, content: content, buttonConfirm: 'Sim', buttonCancel: 'Não'}});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {       
        if(length) {
          this.showSpinner = true;
          this.selection.selected.forEach((item, index) => {        
            this.textsService.deleteSharedText(item.id).subscribe(response=>{
              if(index == length-1){
                this.refreshTable()  
                this.selection.clear()
              }
            })
          })
          this.showSpinner = false;
          this.dialog.open(TestComponent, {data: {
            title: 'Compartilhamento removido',
            content: (length>1) ? 'Os textos compartilhados foram removidos com sucesso.' : 'O texto compartilhado foi removido com sucesso.',
            buttonCancel: '',
            buttonConfirm: 'Ok'
          }})       
        }
      }
    });
  }

}
