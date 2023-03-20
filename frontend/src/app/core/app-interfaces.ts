export interface Message {
  severity: string;
  summary: string;
  detail: string;
}

export interface Category {
  name: string,
  id: string | null,
  code?: string | null,
}

export interface Joke {
  categoryName: string;
  id: string;
  content: string;
}

export interface JokesResponse {
  id: string;
  content: string;
  category: {
    id: string;
    name: string;
    code: string;
  };
}

export interface JokeList {
  jokes: JokesResponse[];
}

export interface GetCategoriesResponse {
  categories: {
    id: string;
    code: string;
    name: string;
  }[];
}

export interface AuthResponse {
  accessToken: string;
}
