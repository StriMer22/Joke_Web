import { ToastService } from './../../services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { JokesService } from './../../services/jokes.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Joke } from '../../app-interfaces';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss'],
})
export class JokeCardComponent implements OnInit {
  @Input() currentJoke!: Joke;
  @Output() jokeDeleted = new EventEmitter<void>();
  isMyJokes: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private jokesService: JokesService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isMyJokes = this.route.snapshot.url[0].path === 'my-jokes';
  }

  deleteJokeSubmit(id: string) {
    this.confirmationService.confirm({
      message: `Czy na pewno chcesz usunąć wybrany żart ?`,
      accept: () => {
        this.jokesService.deleteJoke(id).subscribe({
          next: (_) => {
            this.toastService.showToast('Żart został usunięty.');
            this.jokeDeleted.emit();
          },
          error: ({ error }) => {
            this.toastService.showToast(error.message, false);
          },
        });
      },
    });
  }
}
