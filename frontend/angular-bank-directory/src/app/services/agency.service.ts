import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agency } from '../common/agency';
import { State } from '../common/state';


@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  
 
 
  private baseUrl = 'http://localhost:8000/';

  constructor(private httpClient: HttpClient) { }
   
  getStateList(): Observable<State[]>{
    const searchUrl = `${this.baseUrl}stateList`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
      map(response => response.states)
    );  
  }

  getAgencyList(currentStateId: number): Observable<Agency[]> {

    const searchUrl = `${this.baseUrl}agencyList/${currentStateId}`;
    return this.httpClient.get<GetResponseAgencies>(searchUrl).pipe(
      map(response => response.agencies)
    ); 
    
  }

    
  addNewAgency(agency:Agency){
    const url = `${this.baseUrl}newAgency`; 
    return this.httpClient.post<Agency>(url,agency ).pipe(map((res:any)=>{
      return res
    }));
  }

  updateAgency(agency: Agency) {
    const url = `${this.baseUrl}updateAgency`; 
    return this.httpClient.post<Agency>(url,agency ).pipe(map((res:any)=>{
      return res
    }));
  }

  deleteAgency(agencyId:number){
    const url = `${this.baseUrl}deleteAgency/${agencyId}`;
    return this.httpClient.get<any>(url).pipe(map((res:any)=>{
      return res
    })); 


  }

}
interface GetResponseStates {
  states:State[];
 
}
interface GetResponseAgencies{
  agencies: Agency[];
}
interface GetResponseAgency{
  agency: Agency;
}