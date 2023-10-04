import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Comic, UpdateComicDTO } from '../models/Comic';
import { of } from 'rxjs';
import { Genre } from '../models/Genre';
@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private comics: Comic[] = [];
  private comicsUrl = 'http://localhost:8000/comics'; 
  private genresUrl = 'http://localhost:8000/genres'; 
  private genres: Genre[] = [];
  constructor(private http: HttpClient) { 
    this.getGenres().subscribe(
      (genres: Genre[]) => {
        this.genres = genres;
      },
      (error) => {
        console.error('Error al obtener la lista de géneros:', error);
      }
    );
  }

  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(this.comicsUrl)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          return throwError(error);
        })
      );
  }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.genresUrl)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          return throwError(error);
        })
      );
  }
  getComicByISBN(isbn: string): Observable<Comic> {
    return this.http.get<Comic>(`${this.comicsUrl}/${isbn}`);
  }
  getMultipleComicsByISBNs(isbns: string[]): Observable<Comic[]> {
    const queryParams = isbns.map(isbn => `isbn=${isbn}`).join('&');
    const url = `${this.comicsUrl}/by-isbns?${queryParams}`;

    return this.http.get<Comic[]>(url);
  }
  searchComics(searchTerm: string): Observable<any[]> {
    const url = `${this.comicsUrl}/buscar-comics?search=${searchTerm}`; 

    return this.http.get<any[]>(`${this.comicsUrl}`);
  }

  newComic(comic:Comic){
    return this.http.post<Comic>(`${this.comicsUrl}`, comic);
  }   

  
  updateComic(isbn: string, dto:UpdateComicDTO): Observable<any> {
  
    return this.http.put<Comic>(`${this.comicsUrl}/${isbn}`,dto)
    
      
  }
  editComic(comic: Comic): Observable<Comic> {
    const editUrl = `${this.comicsUrl}/editar/${comic.isbn}`;
    return this.http.put<Comic>(editUrl, comic);
  }

}


