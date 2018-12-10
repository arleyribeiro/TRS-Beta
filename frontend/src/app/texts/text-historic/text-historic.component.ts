import { AuthService } from './../../login/auth.service';
import { TextSharedDialogComponent } from './../text-shared-dialog/text-shared-dialog.component';
import { Router } from '@angular/router';
import { TestComponent } from './../../test/test.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { TextsService } from './../texts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-text-historic',
  templateUrl: './text-historic.component.html',
  styleUrls: ['./text-historic.component.css']
})
export class TextHistoricComponent implements OnInit {

  constructor(private textsService: TextsService,
    private router: Router, 
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  showSpinner = false;
  ELEMENT_DATA:  any = [];
  displayedColumns: string[] = [ 'select', 'created', 'name', 'description', 'text', 'option'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  userId:any

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.userId = this.authService.getUserId()
    this.getAllTextsHistoric();
  }

  getAllTextsHistoric() {
    this.showSpinner = true;
    this.ELEMENT_DATA = []
    this.textsService.getAllTextsHistoric().subscribe(
      (data: any) => {
                  //this.ELEMENT_DATA = [...data]; 
                  data.forEach(element => {
                    if(element.user == this.userId)
                      this.ELEMENT_DATA.push(element)
                  });
                  this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
                  this.dataSource.paginator = this.paginator;
                  this.showSpinner = false;                 
      },
      error => { this.showSpinner = false; }
    );   
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

  isMultiSelected() {
    return (this.selection.selected.length > 1) ? true : false;
  }

  isOnlyOneSelected(id) {
    return ((this.selection.selected.length == 1) && this.selection.selected[0].id==id ) ? false : true;
  }

  openEdit() {
    let textHistoric = this.selection.selected[0];
    let data = {
      editMode: true,
      idText: textHistoric.id,
      content: textHistoric.text,
      filter: [],
      dataFilter: [],
      lastEditions: textHistoric.changesInText
    };
    this.textsService.updateData(data)
    this.router.navigate(['/texts/text-processed', textHistoric.id])
  }

  getUserIdToEmails() {
    let userIds = []
    const dialogRef = this.dialog.open(TextSharedDialogComponent, { width: '80%', disableClose: true });
    dialogRef
      .afterClosed()
        .subscribe(result => {
            userIds = result
        });
    return userIds;
  }
  
  postSharedTextSelected() {
    let sharedTexts = []
    if(this.selection.selected.length){
      this.selection.selected.forEach(element =>{
        let idUser = element.user;
        let textId = element.id;

        sharedTexts.push({
          onwerUser: idUser,
          sharedUser: '',
          historyChangesText: textId
        })
      });
    }  
    this.dialog.open(TextSharedDialogComponent, { width: '80%', disableClose: true, data: sharedTexts });
  }  
  
  redirectTo(item) {
    this.router.navigate(['texts/text-view-corrections/', item.id])
  }

  deleteSelected() {
    let length = this.selection.selected.length
    let title = length > 1 ? 'Deseja excluir os textos selecinados do histórico de revisões' : 'Deseja excluir o texto selecionado do histórico de revisões';
    let content = 'Após esta operação ' + length +  (length > 1 ? ' registros serão excluídos.' : ' registro será excluído.');
    const dialogRef = this.dialog.open(TestComponent, {data: {title: title, content: content, buttonConfirm: 'Sim', buttonCancel: 'Não'}});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {       
        if(length) {
          this.showSpinner = true;
          this.selection.selected.forEach((item, index) => {        
            this.textsService.deleteHistoricText(item.id).subscribe(response=>{
              if(index == length-1){
                this.getAllTextsHistoric();
                this.selection.clear()
              }
            })
          })
          this.showSpinner = false;
          this.dialog.open(TestComponent, {data: {
            title: (length>1) ? 'Textos excluídos' : 'Texto excluído',
            content: (length>1) ? 'Os textos foram excluídos com sucesso.' : 'O texto foi excluído com sucesso.',
            buttonCancel: '',
            buttonConfirm: 'Ok'
          }})   
        }
      }
    });
  }
}
