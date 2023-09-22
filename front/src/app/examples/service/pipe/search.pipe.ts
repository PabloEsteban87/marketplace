import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { ComicService } from '../../../services/comic.service';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform, OnInit{

comics: any[] = [];
comics2: any[] = [];  

constructor(private comicService: ComicService){}

  
  ngOnInit(): void {
    this.getComics(); 
  }

  getComics(): void {
    this.comicService.getComics().subscribe((comics) => {
      this.comics = comics;
    });
  } 
  

  transform(items: any[], searchText1: string): any {
 /*    if (!items) return [];  */
     if (searchText1){ 
      console.log(items)
      return items.filter(item => item.toString().includes(searchText1));
      } 
    else {
      return items;
    }  
}
}
