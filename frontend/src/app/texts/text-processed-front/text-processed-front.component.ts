import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { TextsService } from './../texts.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/*class tipo {
  originalText: any
  content: any
  matches: any
  inconsistencies: any
}*/
@Component({
  selector: 'app-text-processed-front',
  templateUrl: './text-processed-front.component.html',
  styleUrls: ['./text-processed-front.component.css']
})

export class TextProcessedFrontComponent implements OnInit {
  data: any;
  inconsistencyDetails: any;
  inputText: any;
  formText: FormGroup;
  teste: any;
  constructor(private textsService: TextsService,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formText = this.formBuilder.group({
      content: [null]
    });
    this.textsService.currentMessage.subscribe(message => {
      this.data = message
    });

    this.currentDetails.subscribe(message => {
      this.inconsistencyDetails = message
    });

    this.process();
  }
 
  showData() {
    this.textsService.currentMessage.subscribe(message => this.data = message)
  }
  
  newData(data) {
    this.textsService.updateData(data);
  }
  
  private dataDetails = new BehaviorSubject("");
  private currentDetails = this.dataDetails.asObservable();

  updateDetails (data: any){
    this.dataDetails.next(data);
  }

  showInput(){    
  }

  onSubmit() {
    if(this.formText.value!=null) {
      this.textsService.postText(this.formText.value).subscribe(
        data => {
      });
    }
  }

  closeTooltip: boolean = false
  openTips(id:any, item) {
    this.closeTooltip = true
    document.getElementById(id).style.visibility = 'visible';

    for(let inconsistency of this.data.inconsistencies){
      if(item.inconsistency_id == inconsistency.id){
        this.updateDetails(inconsistency)
      }
    }
  }

  closeTips(id:any) {
    this.closeTooltip = false;
    document.getElementById(id).style.visibility = 'hidden';
  }

  changeTip(id:any, suggestion, item, index) {
    this.closeTooltip = false;
    this.data.matches[index].match = false;
    this.data.matches[index].content = suggestion
    document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
    document.getElementById(id).className = 'none';
    this.updateDetails("")
  }

  process() {
    //let text = this.data.originalText;
    //let re = this.data.inconsistencies[0].pattern;
    //let result = re.exec(text);
  }

}
