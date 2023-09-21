import { Component, OnInit} from '@angular/core';
import { ComicService } from '../../services/comic.service';
import {SearchPipe} from '../../examples/service/pipe/search.pipe';

@Component({
  selector: 'app-comic-table',
  templateUrl: './comic-table.component.html',
  styleUrls: ['./comic-table.component.scss']
})



export class ComicTableComponent implements OnInit{
[x: string]: any;
  comics: any[] = [];
  genres: any[] = [];
  selectedGenre: any = null;
  selectedCoverType: string | null = null;
  searchTerm: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  sortByisbnAscending: boolean = true;
  sortByTitleAscending: boolean = true;
  sortByAuthorAscending: boolean = true;
  currentSortOrder: 'A-Z' | 'Z-A' = 'A-Z';
  showSearchPopup: boolean = false;
  showGenreFilterPopup: boolean = false;
  showCoverTypeFilterPopup: boolean = false;
  selectedAuthor: string = '';
  showAuthorFilterPopup: boolean = false;
  showcodigoFilterPopup: boolean = false;
  showisbnFilterPopup: boolean = false;
  selectedisbn: string = '';

  searchText = '';
  searchText1 = ''; 

  constructor(private comicService: ComicService, private searchPipe: SearchPipe ) {}

  ngOnInit(): void {
    this.getComics();
    this.getGenres();
    this.resetFiltersAndSorting();
}

  getComics(): void {
    this.comicService.getComics().subscribe((comics) => {
      this.comics = comics;
      this.applyFilters();
/*       this.globalsearch(); */
    });
  }

  getGenres(): void {
    this.comicService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  applyFilters(): void {
    let filteredComics = this.comics;

    if (this.selectedisbn) {
      filteredComics = filteredComics.filter((comic) =>
        comic.isbn.toLowerCase().includes(this.selectedisbn.toLowerCase())
      );
    }
    if (this.selectedAuthor) {
      filteredComics = filteredComics.filter((comic) =>
        comic.author.toLowerCase().includes(this.selectedAuthor.toLowerCase())
      );
    }
    if (!this.sortByAuthorAscending) {
      filteredComics.sort((a, b) => b.author.localeCompare(a.author));
    } else {
      filteredComics.sort((a, b) => a.author.localeCompare(b.author));
    }

    if (this.selectedGenre) {
      filteredComics = filteredComics.filter((comic) =>
        comic.genres.some((g: any) => g.id === this.selectedGenre)
      );
    }

    if (this.selectedCoverType === 'hard') {
      filteredComics = filteredComics.filter((comic) => comic.ishardcover);
    } else if (this.selectedCoverType === 'soft') {
      filteredComics = filteredComics.filter((comic) => !comic.ishardcover);
    }

    if (this.searchTerm) {
      filteredComics = filteredComics.filter((comic) =>
        comic.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (!this.sortByTitleAscending) {
      filteredComics.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      filteredComics.sort((a, b) => a.title.localeCompare(b.title));
    }

    
    if (!this.sortByisbnAscending) {
      filteredComics.sort((a, b) => b.title.localeCompare(a.isbn));
    } else {
      filteredComics.sort((a, b) => a.title.localeCompare(b.isbn));
    }
    

    this.comics = filteredComics;
  }
  
  toggleSortOrderPopup(order: 'A-Z' | 'Z-A') {
    this.currentSortOrder = order;
    this.sortByTitleAscending = !this.sortByTitleAscending;
    
    
    this.applyFilters();
  }
  toggleSortOrderPopup2(order: 'A-Z' | 'Z-A') {
    this.currentSortOrder = order;
    this.sortByisbnAscending = !this.sortByisbnAscending;
  
    
    this.applyFilters();
  }

  toggleSortOrderPopup3(order: 'A-Z' | 'Z-A') {
    this.currentSortOrder = order;
    this.sortByAuthorAscending = !this.sortByAuthorAscending;
  
    
    this.applyFilters();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.comics.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  get comicsOnCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.comics.slice(startIndex, endIndex);
  }

  toggleSearch() {
    this.showSearchPopup = !this.showSearchPopup;
    if (!this.showSearchPopup) {
      this.searchTerm = '';
      this.applyFilters();
    }
  }

  toggleFilterPopup(filterType: 'isbn' |'author' | 'genre' | 'coverType') {
    if (filterType === 'isbn') {
      this.showisbnFilterPopup = !this.showisbnFilterPopup;
    }
    else if (filterType === 'genre') {
      this.showGenreFilterPopup = !this.showGenreFilterPopup;
    } else if (filterType === 'coverType') {
      this.showCoverTypeFilterPopup = !this.showCoverTypeFilterPopup;
    }
    else if (filterType === 'author') {
      this.showAuthorFilterPopup = !this.showAuthorFilterPopup;
    }
  
    this.applyFilters();
  }

  
  
  refreshTable() {
    this.resetFiltersAndSorting();
    this.getComics();
  }

  resetFiltersAndSorting() {
    this.selectedAuthor = '';
    this.selectedGenre = null;
    this.selectedCoverType = null;
    this.searchTerm = '';
    this.currentSortOrder = 'A-Z';
    this.sortByTitleAscending = true;
    this.sortByAuthorAscending = true;
    this.selectedisbn = '';
  }

   globalsearch(){
  this.searchText ='';
  } 



  popup!: HTMLElement;

  onMouseOut(popup: HTMLElement){
    popup.style.display = "none";
  }

  onMouseEnter(popup: HTMLElement){
    popup.style.display = "block";
  }

}







