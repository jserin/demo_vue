package org.example.demo_vue;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("org.example.demo_vue.dao")
public class DemoVueApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoVueApplication.class, args);
    }

}
