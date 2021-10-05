// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AgencyService } from 'src/app/services/agency.service';
// import { Agency } from 'src/app/common/agency';
// import { FormBuilder } from '@angular/forms';
// import { State } from 'src/app/common/state';

// @Component({
//   selector: 'app-agency-list',
//   templateUrl: './agency-list.component.html',
//   styleUrls: ['./agency-list.component.css']
// })
// export class AgencyListComponent implements OnInit {


//   hasStateId!: boolean;
//   currentStateId!: string;
//   agencies: Agency[] = [];
//   states! : State[];

//   agency: Agency = new Agency();
//   isAdd!:boolean;
//   isUpdate!: boolean;

//   addForm = this.formBuilder.group({
//     stateId: '',
//     agencyId:'',
//     city: '',
//     address: '',
//     manager: '',
//     phoneNumber:'',
//     fax:'',
//     email:''
//   });
  
//   constructor(private agencyService: AgencyService,  private formBuilder: FormBuilder,private router:Router,private route:ActivatedRoute) { 
 
//     // console.log("state = ",this.router.getCurrentNavigation()?.extras.state?.id)

//   }

  


//   ngOnInit(): void {
    
//     // console.log("state.id",history.state.id);
    
//     this.route.paramMap.subscribe(() => {
//       this.listAgency();
//     });
//   }

//   listAgency() {
//     this.hasStateId = this.route.snapshot.paramMap.has('stateId');
//     if (this.hasStateId) {
//       this.currentStateId = this.route.snapshot.paramMap.get('stateId') as string;
//     }
//     else{
//       this.currentStateId = '1' ;
//     }
//     this.agencyService.getAgencyList(this.currentStateId).subscribe(
//       data => {
//       // console.log('agencies =' + JSON.stringify(data));
//         this.agencies = data;
//       }

//     ) 
//   }

//   listStates() {
//     this.agencyService.getStateList().subscribe(
//       data => {
//         // console.log('Product Categories=' + JSON.stringify(data));
//         this.states= data;
//       }
//     ); 
//    }


//    getAddForm(){
  
//     this.isAdd = true;
//     this.isUpdate = false;
//      this.addForm.reset();
//      this.listStates();

//    }

//    getUpdateForm(tempAgency:any){

//     this.isAdd = false;
//     this.isUpdate = true;
//     this.listStates();
//     // console.log(tempAgency)
//     this.addForm.controls['stateId'].setValue(tempAgency.stateId)
//     this.addForm.controls['agencyId'].setValue(tempAgency.id)
//     this.addForm.controls['city'].setValue(tempAgency.city)
//     this.addForm.controls['address'].setValue(tempAgency.address)
//     this.addForm.controls['manager'].setValue(tempAgency.manager)
//     this.addForm.controls['phoneNumber'].setValue(tempAgency.phoneNumber)
//     this.addForm.controls['fax'].setValue(tempAgency.fax)
//     this.addForm.controls['email'].setValue(tempAgency.email)


//    }

//    getFormValues(){
    
//     this.agency.stateId = +this.addForm.value.stateId,
//     this.agency.id = +this.addForm.value.agencyId,
//     this.agency.city=this.addForm.value.city,
//     this.agency.address= this.addForm.value.address,
//     this.agency.manager= this.addForm.value.manager,
//     this.agency.phoneNumber= this.addForm.value.phoneNumber,
//     this.agency.fax= this.addForm.value.fax, 
//     this.agency.email= this.addForm.value.email
//    }

//    addAgency(): void {
//     this.getFormValues();
//     // console.log(this.agency);
//     this.agencyService.addNewAgency(this.agency).subscribe(
//       res=> {
//         console.log("res = ",res)
//         alert("Agency added successfully");
//         let ref = document.getElementById('cancel');
//         ref?.click();
//         this.listAgency();

//         // this.addForm.reset();
//         // this.router.navigateByUrl(`${state}`);

//       },
//       error =>{
//         alert("Something wen wrong");
//         console.error('Error!',error)
//       }
//     )
  
//   }

//   updateAgency(){
//     this.getFormValues();
//     this.agencyService.updateAgency(this.agency).subscribe(
//       res=> {
//         console.log("res = ",res)
//         alert("Agency updated successfully");
//         let ref = document.getElementById('cancel');
//         ref?.click();
//         // this.addForm.reset();
//         this.listAgency();
//         // this.router.navigateByUrl(`${this.agency.stateId}`);

//       },
//       error =>{
//         alert("Something wen wrong");
//         console.error('Error!',error)
//       }
//     )

//   }

//   deleteAgency(agencyId:number){
//     const result = confirm("this agency agency will be removed if you press OK! ");
//     console.log("agencyId",agencyId)
//     if(result){
//       this.agencyService.deleteAgency(agencyId).subscribe(
//         res => {
//           console.log("res = ",res)
//           alert("Agency deleted successfully");
//           this.listAgency();
//         },
//         error=>{
//           console.error('Error!',error)
//           alert("Something wen wrong");
//         }
//       )
//     }
//   }





// }
