import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: { author: string; title: string; language: string }[],
    searchText: string
  ): any {
    if (searchText === '') {
      return value;
    }
    let searchResultArr = [];
    for (let item of value) {
      if (
        item.author.toLowerCase().includes(searchText) ||
        item.title.toLowerCase().includes(searchText) ||
        item.language.toLowerCase().includes(searchText)
      ) {
        searchResultArr.push(item);
      }
    }
    return searchResultArr;
  }
}
