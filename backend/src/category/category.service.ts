import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository:Repository<Category>
    ){}
    async findAllCategory():Promise<Category[]>{
        return await this.categoryRepository.find();
    }
    async createCategory(data: CategoryDto ):Promise<Category>{
        const category= new Category();
        category.name=data.name;
        category.description=data.description;
        return await this.categoryRepository.save(category);
    }
    async updateCategory(id:number, data:CategoryDto):Promise<Category>{
        await this.categoryRepository.update(id, data);
        return await this.categoryRepository.findOneBy({id});
    }
    async deleteCategory(id: number): Promise<Object>{
        await this.categoryRepository.delete(id);
        return {message:"Category deleted successfully"};
    }
    async getOneCategory(id:number):Promise<Category>{
        return await this.categoryRepository.findOneBy({id});
    }
}
