import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
  //  private dialog: MatDialog
   public dialog: MatDialog,
   public snackBar: MatSnackBar
    ) { }

  /**
   * ngOnInit is called when angular is done creating the component
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetch movies via API and set movies state to returned JSON file
   * @returns array holding movie objects
   * @function  getMovies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Fetch user info via API and set favorites state to returned JSON file
   * @returns array holding IDs of favorite Movies
   * @function getFavoriteMovies
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
    })
  }

  /**
   * Adds a movie to a user's favorite
   * @param {string} movieId 
   * @function addToFavorite
   */

  addToFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been added to your favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from a user's favorites
   * @param {string} movieId 
   * @function removeFavoriteMovie
   */

  removeFromFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been removed from your favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Checks if a movie is included in a user's favorite movies
   * @param {string} movieId 
   * @returns boolean
   * @function movieIsFavorite
   */

  movieIsFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * toggles to add or remove a movie from a users list of favorite
   * @param {string} movieId 
   */

  toggleFavorite(movieId: string): void {
    if(this.movieIsFavorite(movieId)) {
      this.removeFromFavorite(movieId);
    } else {
      this.addToFavorite(movieId);
    }
  }

  /**
   * Opens Genre information from genre component
   * @param movie
   * @function openGenre 
   */
  
  openGenre(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      panelClass: 'genre-dialog-background',
      width: '400px',
    });
  }

  /**
   * Opens director information from Director component
   * @param movie 
   * @function openDirector
   */

  openDirector(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: { Name, Birth, Bio },
      panelClass: 'director-dialog-background',
      width: '400px',
    })
  }

  /**
   * Opens movie details from MovieDetailsComponent
   * @param movie
   * @function openMovieDetails
   */

  openMovieDetails(movie: any): void {
    const { Name, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { Name, Description },
      panelClass: 'synopsis-dialog-background',
      width: '400px',
    });
  }
}
