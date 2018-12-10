import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextsService } from './../texts.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Data {
  content: any 
}
@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.css']
})
export class TextFormComponent implements OnInit {

  inputText: any;
  formText: FormGroup;
  applyConfigurations: boolean = true;
  actived: boolean = false;
  panelOpenConfiguration = false;
  showSpinner = false
  constructor(private textsService: TextsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.formText = this.formBuilder.group({
      editMode: false,
      idText: 0,
      content: [null],
      filter: [null],
      dataFilter: [null]
    });

    //this.formText.get('content').setValue("Estas duas palavras urso - esse e este - existem neste na língua portuguesa e estão corretas. São palavras esse parecidas, mas utilizadas em situações-se isso diferentes. O que isso distingue estes dois conceitos é uma-se questão referencial: tempo e espaço.\n\nEste e esse são pronomes demonstrativos, situando alguém ou alguma coisa no tempo, no espaço e no discurso em relação às próprias pessoas nesse do discurso.")
  }

  showInput(){    
  }

  onSubmit() {
    this.showSpinner = true;
    let data:any = []

    this.textsService.currentMessageUser.subscribe(message => {
      data = message
    });

    this.formText.get('filter').setValue(data.filter);
    this.formText.get('dataFilter').setValue(data.dataFilter);

    if(this.formText.value!=null) {
      this.textsService.postText(this.formText.value).subscribe(
        (data: Data) => {
          this.textsService.updateData(data);//shared the data
          this.applyConfigurations = false;
          this.showSpinner = false;
          this.router.navigate(['/texts/text-processed']);//change route
      });
    }
  }
  openConfiguration() {
    this.applyConfigurations = !this.applyConfigurations;
  }

  removeSpace(x) {
    if(x!=null && x!='' && typeof(x) != 'undefined')
      return x.replace(/^\s+|\s+$/gm,'');
    return null
  }

  disabledSubmit() {
    let name = ""
    let disabled = false
    name = this.removeSpace(this.formText.get('content').value)
    if(name==null || name=='' || typeof(name) == 'undefined'){
      disabled = true
    }
    return disabled
  }
}
