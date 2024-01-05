import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){}

    @Post()
    async createCategory(@Body('name') name:string, @Body('description') description:string){
        return this.categoryService.createCategory({name, description});
    }
    @Get()
    async getAllCategory(){
        return this.categoryService.findAllCategory();
    }
    @Get(':id')
    async getOneCategory(@Param('id') id:number){
        return this.categoryService.getOneCategory(id);
    }
    @Put(':id')
    async updateCategory(@Param('id') id: number, @Body('name') name: string,@Body('description') description: string){
        return this.categoryService.updateCategory(id, {name, description});
    }
    @Delete(':id')
    async deleteCategory(@Param('id') id:number){
        return this.categoryService.deleteCategory(id);
    }
}
