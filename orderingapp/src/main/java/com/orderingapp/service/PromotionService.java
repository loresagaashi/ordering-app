package com.orderingapp.service;

import com.orderingapp.model.Promotion;
import com.orderingapp.repository.PromotionRepository;
import org.springframework.stereotype.Service;

@Service
public class PromotionService extends BasicServiceOperations<PromotionRepository, Promotion> {

   public PromotionService(PromotionRepository repository) {
      super(repository);
   }

   @Override
   public Promotion save(Promotion entity) {
      if (entity.getId() == null) {
         super.save(entity);
      }

      validateEntity(entity);
      Promotion promotion = findById(entity.getId());
      promotion.setName(entity.getName());
      promotion.setRequiredPoints(entity.getRequiredPoints());
      promotion.setStartDateTime(entity.getStartDateTime());
      promotion.setEndDateTime(entity.getEndDateTime());
      promotion.setDisabled(entity.isDisabled());
      promotion.setProduct(entity.getProduct());
      promotion.setOffer(entity.getOffer());

      return repository.save(promotion);
   }
}
