import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { Comic } from 'src/app/models/Comic';
import { Genre } from 'src/app/models/Genre';

import {TokenServiceService} from '../../services/tokenservice.service';

@Component({
  selector: 'app-comic-table',
  templateUrl: './comic-table.component.html',
  styleUrls: ['./comic-table.component.scss']
})
export class ComicTableComponent implements OnInit {
  comics: Comic[] = [];
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

  info: any = {};



  constructor(private comicService: ComicService, private tokenService: TokenServiceService) {}

  ngOnInit(): void {
    this.getComics();
    this.getGenres();
    this.filteredComics = this.comics;
    this.resetFiltersAndSorting();

    this.info = {
      email: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };



  }

  getComics(): void {
    this.comicService.getComics().subscribe((comics) => {
      this.comics = comics;
      this.applyFilters();
    });
  }

  getGenres(): void {
    this.comicService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  applyFilters(): void {
    let filteredComics = this.comics.slice(); 

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

    if (this.searchTerm || this.searchTextGlobal) {
      const searchQuery = (this.searchTerm + ' ' + this.searchTextGlobal).toLowerCase();
      filteredComics = filteredComics.filter((comic) =>
        comic.title.toLowerCase().includes(searchQuery) ||
        comic.isbn.toLowerCase().includes(searchQuery) ||
        comic.author.toLowerCase().includes(searchQuery)
      );
    }

    if (!this.sortByTitleAscending) {
      filteredComics.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      filteredComics.sort((a, b) => a.title.localeCompare(b.title));
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

  refreshTable() {
    this.resetFiltersAndSorting();
    this.getComics();
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

