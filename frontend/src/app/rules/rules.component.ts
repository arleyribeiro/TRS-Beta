import { RulesService } from './rules.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(private rulesService: RulesService) { }
  private inconsistencies: any[];

  ngOnInit() {
    this.rulesService.getAllInconsistencies().subscribe(
      (data: any) => this.inconsistencies = data,
      error => {}
    );
  }
}
