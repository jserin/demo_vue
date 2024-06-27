package org.example.demo_vue.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    String id;
    String title;
    String address;
    Integer grade;
    String review;
}
