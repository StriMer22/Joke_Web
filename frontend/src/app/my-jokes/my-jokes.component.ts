import { ToastService } from './../core/services/toast.service';
import { JokesService } from './../core/services/jokes.service';
import { Component, OnInit } from '@angular/core';
import { Joke, JokeList, JokesResponse } from '../core/app-interfaces';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-my-jokes',
  templateUrl: './my-jokes.component.html',
  styleUrls: ['./my-jokes.component.scss'],
})
export class MyJokesComponent implements OnInit {
  jokes: Joke[] = [];
  isConfirmDialogOpen: boolean = false;

  constructor(
    private jokesService: JokesService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.verify();
    this.getMyJokes();
  }

  getMyJokes() {
    this.jokesService.getMyJokes().subscribe({
      next: (res: JokeList) => {
        this.jokes = res.jokes.map((joke: JokesResponse) => {
          return {
            categoryName: joke.category.name,
            id: joke.id,
            content: joke.content,
          };
        });
      },
      error: ({ error }) => {
        this.toastService.showToast(error.message, false);
      },
    });
  }
}
