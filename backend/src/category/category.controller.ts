import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){}

    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async updateCategory(@Param('id') id: number, @Body('name') name: string,@Body('description') description: string){
        return this.categoryService.updateCategory(id, {name, description});
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteCategory(@Param('id') id:number){
        return this.categoryService.deleteCategory(id);
    }
}
