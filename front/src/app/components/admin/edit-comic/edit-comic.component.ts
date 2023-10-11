import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from 'src/app/services/comic.service';
import { Comic } from '../../../models/Comic'; 
import { Genre } from '../../../models/Genre';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

const allGenres: string[] = [
  "Infantil",
  "Juvenil",
  "Manga",
  "Novela Gráfica",
  "Humor",
  "Superhéroes",
  "Ciencia Ficción",
  "Fantasía"
];
@Component({
  selector: 'app-edit-comic',
  templateUrl: './edit-comic.component.html',
  styleUrls: ['./edit-comic.component.scss']
})
export class EditComicComponent implements OnInit {
  comicToEdit: Comic = new Comic(); 
  editedComic: Comic = new Comic();
  allGenres = allGenres; 
  newGenres: string[] = [];
  images: any;
  newComicPhoto: File | null = null;
  photoPreviewUrl: string | ArrayBuffer | null = null;

  constructor(public bsModalRef: BsModalRef, private comicService: ComicService, private http: HttpClient) {}

  ngOnInit(): void {
   
    this.editedComic = { ...this.comicToEdit };
  }

  addNewGenres() {
   
    const newGenresArray = this.newGenres.join(',').split(',').map((genre) => genre.trim());
  

    const uniqueNewGenres = newGenresArray.filter((genre) => genre !== '');
  
   
    this.editedComic.genres = [
      ...this.editedComic.genres,
      ...uniqueNewGenres.map((genreName) => ({ id: 0, name: genreName } as Genre))
    ];
  
  
    this.newGenres = [];
  }
  
 
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreviewUrl = e.target.result;
        this.newComicPhoto = file; 
      };
      reader.readAsDataURL(file);
    }
  }
  openEditForm(comic: Comic) {
    
    this.editedComic = { ...comic };
    
   
    this.comicService.getGenres().subscribe((genres) => {
     
      this.editedComic.genres = this.editedComic.genres.map((genreName) => {
        const matchingGenre = genres.find((genre) => genre.name === genreName);
        return matchingGenre || { id: 0, name: genreName }; 
      });
    });
  }
  saveChanges() {
    const isbn = this.comicToEdit.isbn;
  
    
    if (this.newComicPhoto) {
      this.comicService.uploadComicPhoto(isbn, this.newComicPhoto).subscribe(
        (response) => {
          
          this.editedComic.photo = response.photoUrl;
          console.log('Cómic actualizado con la nueva foto:', this.editedComic);
          this.bsModalRef.hide();
        },
        (error) => {
          console.error('Error al cargar la foto del cómic:', error);
        }
      );
    } else {
      
      this.comicService.updateComic(isbn, this.editedComic).subscribe(
        (updatedComic) => {
          console.log('Cómic actualizado:', updatedComic);
          this.bsModalRef.hide();
        },
        (error) => {
          console.error('Error al actualizar el cómic:', error);
        }
      );
    }
  }
}