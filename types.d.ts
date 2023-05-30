type Params = {
  params: {
    id: string
  };
};

type User = {
  id: number,
  username: string,
  hashedPass: string
}

type Book = {
  id: number,
  title: string,
  setting: string,
  summary: string,
  userId: number
}

type Character = {
  id: number,
  name: string,
  role: string,
  description: string,
  bookId: number
}

type Chapter = {
  id: number,
  num: number | null,
  name: string | null,
  outline: string,
  bookId: number
}