import { Component, OnInit, Input} from '@angular/core';
import { Agency } from 'src/app/common/agency';
import { State } from 'src/app/common/state';
import { AgencyService } from 'src/app/services/agency.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  states: State[] = [];
  currentStateName!: string;

  agency: Agency = new Agency();
  isAdd!:boolean;
  isUpdate!: boolean;

  addForm = this.formBuilder.group({
    stateId: '',
    agencyId:'',
    city: '',
    address: '',
    manager: '',
    phoneNumber:'',
    fax:'',
    email:''
  });

  constructor(private agencyService: AgencyService,  private formBuilder: FormBuilder) { }

  @Input() getUserName!:any;
  agencies : Agency[]= [];

  ngOnInit() {
    console.log("getUserName value in SearchComponent = ",this.getUserName)
    this.listStates();
    this.agencyService.getAgencyList(1).subscribe(
      data => {
        this.agencies = data;
      })
      this.currentStateName = "Ariana"


  }

  listStates() {
    this.agencyService.getStateList().subscribe(
      data => {
        // console.log('Product Categories=' + JSON.stringify(data));
        this.states= data;
      }
    ); 
   }

   listAgency(stateId:number){
    this.agencyService.getAgencyList(stateId).subscribe(
      data => {
      // console.log('agencies =' + JSON.stringify(data));
        this.agencies = data;
      }
    )
    
   }

   onChange($event:any){
    this.currentStateName = $event.target.options[$event.target.options.selectedIndex].text;
    let stateId = $event.target.options[$event.target.options.selectedIndex].value;
    // this.router.navigate([`${stateId}`],{state:{id:this.getUserName}})
    this.listAgency(stateId)
     
    }

    getAddForm(){
  
      this.isAdd = true;
      this.isUpdate = false;
      this.addForm.reset();

     }

     getUpdateForm(tempAgency:any){

      this.isAdd = false;
      this.isUpdate = true;
      // console.log(tempAgency)
      this.addForm.controls['stateId'].setValue(tempAgency.stateId)
      this.addForm.controls['agencyId'].setValue(tempAgency.id)
      this.addForm.controls['city'].setValue(tempAgency.city)
      this.addForm.controls['address'].setValue(tempAgency.address)
      this.addForm.controls['manager'].setValue(tempAgency.manager)
      this.addForm.controls['phoneNumber'].setValue(tempAgency.phoneNumber)
      this.addForm.controls['fax'].setValue(tempAgency.fax)
      this.addForm.controls['email'].setValue(tempAgency.email)
  
  
     }
  
     getFormValues(){
      
      this.agency.stateId = +this.addForm.value.stateId,
      this.agency.id = +this.addForm.value.agencyId,
      this.agency.city=this.addForm.value.city,
      this.agency.address= this.addForm.value.address,
      this.agency.manager= this.addForm.value.manager,
      this.agency.phoneNumber= this.addForm.value.phoneNumber,
      this.agency.fax= this.addForm.value.fax, 
      this.agency.email= this.addForm.value.email
     }
  
     addAgency(): void {
      this.getFormValues();
      // console.log(this.agency);
      this.agencyService.addNewAgency(this.agency).subscribe(
        res=> {
          console.log("res = ",res)
          alert("Agency added successfully");
          let ref = document.getElementById('cancel');
          ref?.click();
          this.listAgency(this.agency.stateId );
  
          // this.addForm.reset();
          // this.router.navigateByUrl(`${state}`);
  
        },
        error =>{
          alert("Insertion failed");
          console.error('Error!',error)
        }
      )
    
    }
  
    updateAgency(){
      this.getFormValues();
      this.agencyService.updateAgency(this.agency).subscribe(
        res=> {
          console.log("res = ",res)
          alert("Agency updated successfully");
          let ref = document.getElementById('cancel');
          ref?.click();
          // this.addForm.reset();
          this.listAgency(this.agency.stateId);
          // this.router.navigateByUrl(`${this.agency.stateId}`);
  
        },
        error => {
          alert("Something went wrong");
          console.error('Error!',error)
        }
      )
  
    }
  
    deleteAgency(agency:Agency){
      const result = confirm("this agency agency will be removed if you press OK! ");
      // console.log("agencyId",agency.id)
      if(result){
        this.agencyService.deleteAgency(agency.id).subscribe(
          res => {
            console.log("res = ",res)
            alert("Agency deleted successfully");
            this.listAgency(agency.stateId);
          },
          error=>{
            console.error('Error!',error)
            alert("Something wen wrong");
          }
        )
      }


}





}