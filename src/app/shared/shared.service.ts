import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class SharedService {

  private usedAbbreviation = new BehaviorSubject('x');
  sharedUsedAbbreviation = this.usedAbbreviation.asObservable();

  constructor() { }
  nextUsedAbbreviation(usedAbbreviation: string){
    this.usedAbbreviation.next(usedAbbreviation);
  }
}
