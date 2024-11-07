package com.orderingapp.service;

import org.springframework.stereotype.Service;

import com.orderingapp.model.City;
import com.orderingapp.repository.CityRepository;

@Service
public class CityService extends BasicServiceOperations<CityRepository, City> {
   
   public CityService(CityRepository repository) {
      super(repository);
   }

   public City save(City entity) {
      if (entity.getId() == null) {
         super.save(entity);
      }

      validateEntity(entity);
      City city = findById(entity.getId());
      city.setName(entity.getName());

      return repository.save(city);
   }

}
