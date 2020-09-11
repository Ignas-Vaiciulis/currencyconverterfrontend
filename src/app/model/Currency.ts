export class Currency{
  id: number;
  abbreviation: string;
  rate: number;
  date: string;


  constructor(id: number, abbreviation: string, rate: number, date: string) {
    this.id = id;
    this.abbreviation = abbreviation;
    this.rate = rate;
    this.date = date;
  }
}
