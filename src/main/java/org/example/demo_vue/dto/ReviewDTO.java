package org.example.demo_vue.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    String id;
    String title;
    String address;
    Integer grade;
    String review;
}
