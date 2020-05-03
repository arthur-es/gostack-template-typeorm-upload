// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    // TODO
    const categoriesRepository = getRepository(Category);

    const categoryFound = await categoriesRepository.findOne({
      where: { title },
    });

    if (categoryFound) {
      return categoryFound;
    }

    const newCategory = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(newCategory);

    return newCategory;
  }
}

export default CreateCategoryService;
