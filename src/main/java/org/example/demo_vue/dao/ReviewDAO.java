package org.example.demo_vue.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.example.demo_vue.dto.ReviewDTO;

import java.util.List;

@Mapper
public interface ReviewDAO {
    void saveReview(ReviewDTO reviewDTO);
    List<ReviewDTO> getReviews();
    void deleteReview(@Param("id") String id);
}
