import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(places: any[], searchText: string): any[] {
    if (!places) { return []; }
    if (!searchText) { return places; }
    return places.filter( item => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}
