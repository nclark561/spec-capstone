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