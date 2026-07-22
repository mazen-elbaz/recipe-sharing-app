export interface IRecipe {
  _id?: string;

  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  category: string;
  cookTime: number;
  imageUrl?: string;

  owner: {
    _id: string;
    username: string;
  };

  createdAt: string;
  updatedAt?  : string;
}