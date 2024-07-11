import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(customers: any[],term:string): any[] {
    if (!term) return customers;
    return customers.filter((item)=>item.name.toLowerCase().includes(term.toLowerCase()));
  }

}
