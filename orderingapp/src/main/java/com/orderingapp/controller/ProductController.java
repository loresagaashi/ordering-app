package com.orderingapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.Product;
import com.orderingapp.service.ProductService;


@RestController
@RequestMapping("/products")
public class ProductController extends BasicControllerOperations<ProductService,Product> {

   public ProductController(ProductService service) {
      super(service);
   }

}