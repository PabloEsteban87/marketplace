import { Component } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { Comic } from 'src/app/models/Comic';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-comictableadmin',
  templateUrl: './comictableadmin.component.html',
  styleUrls: ['./comictableadmin.component.scss']
})
export class ComictableadminComponent {
  comics: Comic[] = [];
  originalComics: Comic[] = [];
  genres:  Genre[] = [];
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
  searchTextGlobal: string = '';
  filteredComics: Comic[] = [];
  columnFilters: {
    isbn: string;
    title: string;
    author: string;
    genre: number | null;
    coverType: string | null;
  } = {
    isbn: '',
    title: '',
    author: '',
    genre: null,
    coverType: null,
  };
  constructor(private comicService: ComicService) {}

  ngOnInit(): void {
    this.getComics();
    this.getGenres();
    this.filteredComics = this.comics;
  }

  getComics(): void {
    this.comicService.getComics().subscribe((comics) => {
      this.comics = comics;
      this.originalComics=comics;
    });
  }

  getGenres(): void {
    this.comicService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  applyFilters(): void {
    console.log("AAAAA")
    let filteredComics =  this.originalComics.slice();
  
    if (this.columnFilters.isbn) {
      filteredComics = filteredComics.filter((comic) =>
        comic.isbn.toLowerCase().includes(this.columnFilters.isbn.toLowerCase())
      );
    }
  
    if (this.columnFilters.title) {
      filteredComics = filteredComics.filter((comic) =>
        comic.title.toLowerCase().includes(this.columnFilters.title.toLowerCase())
      );
    }
  
    if (this.columnFilters.author) {
      filteredComics = filteredComics.filter((comic) =>
        comic.author.toLowerCase().includes(this.columnFilters.author.toLowerCase())
      );
    }
  
    if (this.columnFilters.genre !== null) {
      filteredComics = filteredComics.filter((comic) =>
        comic.genres.some((g: any) => g.id === this.columnFilters.genre)
      );
    }
  
    if (this.columnFilters.coverType !== null) {
      if (this.columnFilters.coverType === 'hard') {
        filteredComics = filteredComics.filter((comic) => comic.ishardcover);
      } else {
        filteredComics = filteredComics.filter((comic) => !comic.ishardcover);
      }
    }
  
    if (!this.sortByTitleAscending) {
      filteredComics.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      filteredComics.sort((a, b) => a.title.localeCompare(b.title));
    }
    console.log(this.filteredComics)
    this.comics = filteredComics;
    console.log(this.comics)
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

  get comicsOnCurrentPage(): Comic[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.comics.length);
    return this.comics.slice(startIndex, endIndex);
  }

  toggleSearch() {
    this.showSearchPopup = !this.showSearchPopup;
  if (!this.showSearchPopup) {
    this.searchTerm = '';
    this.searchTextGlobal = ''; 
    this.applyFilters(); 
  }
}

  toggleFilterPopup(filterType: 'isbn' | 'author' | 'genre' | 'coverType') {
    if (filterType === 'isbn') {
      this.showisbnFilterPopup = !this.showisbnFilterPopup;
    } else if (filterType === 'genre') {
      this.showGenreFilterPopup = !this.showGenreFilterPopup;
    } else if (filterType === 'coverType') {
      this.showCoverTypeFilterPopup = !this.showCoverTypeFilterPopup;
    } else if (filterType === 'author') {
      this.showAuthorFilterPopup = !this.showAuthorFilterPopup;
    }

    this.applyFilters();
  }

 

  resetFiltersAndSorting() {
    this.selectedAuthor = '';
    this.selectedGenre = null;
    this.selectedCoverType = null;
    this.searchTerm = '';
    this.searchTextGlobal = '';
    this.currentSortOrder = 'A-Z';
    this.sortByTitleAscending = true;
    this.sortByAuthorAscending = true;
    this.sortByisbnAscending = true;
    this.selectedisbn = '';
  }

  globalsearch() {
    if (this.searchTextGlobal.trim() === '') {
      this.getComics();
      return;
    }
  
    this.comicService.searchComics(this.searchTextGlobal).subscribe((comics) => {
      this.comics = comics;
  
      const searchKeywords = this.searchTextGlobal.toLowerCase().split(' ');
  
      const filteredComics = this.comics.filter((comic) => {
        const comicTitle = comic.title.toLowerCase();
        const comicAuthor = comic.author.toLowerCase();
        const comicISBN = comic.isbn.toLowerCase();
        const comicGenres = comic.genres.map((genre) => genre.name.toLowerCase());
  
        return (
          searchKeywords.some(keyword => comicTitle.includes(keyword)) ||
          searchKeywords.some(keyword => comicAuthor.includes(keyword)) ||
          searchKeywords.some(keyword => comicISBN.includes(keyword)) ||
          searchKeywords.some(keyword => comicGenres.some(genre => genre.includes(keyword)))
        );
      });
      this.comics = filteredComics;
    });
  }
  
  
  
  popup!: HTMLElement;

  onMouseOut(popup: HTMLElement) {
    popup.style.display = "none";
  }

  onMouseEnter(popup: HTMLElement) {
    popup.style.display = "block";
  }
}
