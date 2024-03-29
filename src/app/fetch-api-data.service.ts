import { Injectable } from '@angular/core';""
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// // Declares the api url that will provide data for the client app
const apiUrl = 'https://marcey-flix-movie-app.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) {}

  /**
   * @service POST to the respective endpoint of apiurl to register a new user
   * @param {any} userDetails 
   * @returns a new user object in json foormat
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + '/users', userDetails)
    .pipe(catchError(this.handleError));
  };

  /**
   * @service POST to the respective endpoint of apiurl to login a user
   * @param {any} userDetails 
   * @returns a user object in json format
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + '/login', userDetails)
    .pipe(catchError(this.handleError));
  }

  /**
   * @service GET to the respective endpoint of apiurl to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */

  getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http
    .get(apiUrl + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets a specific movie by title
   * @param {string} title
   * @returns an array of movie objects in json format
   * @function getMovie
   */

  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET to the respective endpoint of apiurl to get director information
   * @param {string} directorName 
   * @returns directors name
   * @function getDirector
   */

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/directors/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service Gets respective genre information
   * @param {string} genreName 
   * @returns get genre name
   * @function getGenre
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/genre/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }) 
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets a specific user
   * @returns a user object in json format
   * @function getUser
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service Get all favorite movies
   * @returns a list of movie ids
   * @function getFavoriteMovies
   */
  
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    )
  }

  /**
   * @service POST to the respective endpoint of the apiUrl to add a movie to a users favorite
   * @returns a user object in json format
   * @function addFavoriteMovie
   */
  
  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .post(
      `${apiUrl}/users/${username}/movies/${movieId}`,
      { FavoriteMovie: movieId },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    )
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service PUT to updates a user's details
   * @param updatedUser 
   * @returns a user object in json format
   * @function editUser
   */

  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .put(`${apiUrl}/users/${username}`, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`
        }
      )
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE to delete a user
   * @returns success message
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .delete(`${apiUrl}/users/${username}`, {
      headers: new HttpHeaders ({
        Authorization: `Bearer ${token}`
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE to  remove a movie from a user's favorite
   * @param movieId 
   * @returns a user object in json format
   * @function removeFavoriteMovie
   */
  removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extracts response data from HTTP response
   * @param res 
   * @returns response body or empty object
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Error handler
   * @param error
   * @returns error message
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.')
  }
}