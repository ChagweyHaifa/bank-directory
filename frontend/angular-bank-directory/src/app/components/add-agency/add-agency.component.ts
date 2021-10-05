import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'src/app/services/agency.service';

import { Agency } from 'src/app/common/agency';
// import { Router } from '@angular/router';


@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {
  
 
  
  constructor(private agencyService: AgencyService) {}

 

  
  ngOnInit(): void {
    // this.listStates();

  }
 
   
  
  
}


