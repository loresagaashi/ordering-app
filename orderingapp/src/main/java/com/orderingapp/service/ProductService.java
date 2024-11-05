package com.orderingapp.service;


import org.springframework.stereotype.Service;

import com.orderingapp.model.Product;
import com.orderingapp.repository.ProductRepository;


@Service
public class ProductService extends BasicServiceOperations<ProductRepository,Product> {

   public ProductService(ProductRepository repository) {
      super(repository);
   }

}
