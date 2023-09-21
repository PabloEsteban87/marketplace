import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { ComicService } from '../../../services/comic.service';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform, OnInit{

comics: any[] = []; 

constructor(private comicService: ComicService){}

  
  ngOnInit(): void {
    this.getComics(); 
  }

  getComics(): void {
    this.comicService.getComics().subscribe((comics) => {
      this.comics = comics;
    });
  } 
  

  transform(items: any, searchText1: string): any {
    if (!items) return []; 
    else if (!searchText1) return items;
    else{
    
    
    for(let item of items){
      if(item.toString().toLowerCase() == searchText1.toLowerCase()){
        return this.comics.push(item)

      }

    }
  }
}
}
