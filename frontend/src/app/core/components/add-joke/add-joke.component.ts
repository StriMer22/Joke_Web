import { ToastService } from './../../services/toast.service';
import { JokesService } from './../../services/jokes.service';
import { CategoriesService } from './../../services/categories.service';
import { Category, GetCategoriesResponse } from '../../app-interfaces';
import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-joke',
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.scss'],
})
export class AddJokeComponent implements OnInit {
  @ViewChild('addJokeModal') addJokeModal!: ElementRef;
  @Input() selectedCategory!: Category;
  @Output() jokeAdded = new EventEmitter<void>();
  jokesForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private jokesService: JokesService,
    private toastService: ToastService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.jokesForm = this.fb.group({
      category: ['', [Validators.required]],
      content: ['', Validators.minLength(10)],
      categoryName: ['', Validators.minLength(3)],
    });
  }

  addJokeSubmit() {
    const { category, categoryName, content } = this.jokesForm.value;

    if (category.id === null) {
      return this.categoriesService.create(categoryName).subscribe({
        next: (res: Category) => {
          const categoryId = res.id;
          this.addJoke(categoryId!, content);
          this.getCategories();
        },
        error: ({ error }) => {
          this.toastService.showToast(error.message[0], false);
        },
      });
    }
    return this.addJoke(category.id, content);
  }

  private addJoke(categoryId: string, content: string) {
    this.jokesService.addJoke(categoryId, content).subscribe({
      next: (_) => {
        this.toastService.showToast('Żart został pomyślnie dodany!');
        this.jokeAdded.emit();
        this.dismissModal();
        this.jokesForm.reset({
          category: '',
          content: '',
          categoryName: '',
        });
      },
      error: ({ error }) => {
        this.toastService.showToast(error.message[0], false);
      },
    });
  }

  private dismissModal() {
    this.addJokeModal.nativeElement.querySelector('.btn-close').click();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res: GetCategoriesResponse) => {
        this.categories = [{ name: 'Dodaj nową', id: null }, ...res.categories];
      },
      error: ({ error }) => {
        this.toastService.showToast(error.message, false);
      },
    });
  }
}
