package com.orderingapp.controller;

import com.orderingapp.model.Category;
import com.orderingapp.service.CategoryService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoryController extends BasicControllerOperations<CategoryService,Category> {

   public CategoryController(CategoryService service) {
      super(service);
   }
   
}
