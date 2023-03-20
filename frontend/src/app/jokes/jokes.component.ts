import { ToastService } from './../core/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { JokesService } from '../core/services/jokes.service';
import { Joke, JokeList, JokesResponse } from '../core/app-interfaces';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {
  currentJoke!: Joke;
  loading: boolean = true;
  jokes: Joke[] = [];

  constructor(
    private jokesService: JokesService,
    private toastServcie: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getJokes();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn$;
  }

  getJokes() {
    this.jokesService.getJokes().subscribe({
      next: (res: JokeList) => {
        this.jokes = res.jokes.map((joke: JokesResponse) => {
          return {
            categoryName: joke.category.name,
            id: joke.id,
            content: joke.content,
          };
        });

        this.currentJoke = this.jokes[0];
      },
      error: ({ error }) => {
        this.toastServcie.showToast(error.message, false);
      },
    });
  }

  changeJoke() {
    if (!this.jokes) return;
    for (let i = 0; i < this.jokes.length; i++) {
      const jokeIndex =
        (i +
          this.jokes.findIndex((joke) => joke.id === this.currentJoke?.id) +
          1) %
        this.jokes.length;
      const nextJoke = this.jokes[jokeIndex].id;
      if (nextJoke !== this.currentJoke?.id) {
        this.currentJoke = this.jokes[jokeIndex];
        break;
      }
    }
  }
}
