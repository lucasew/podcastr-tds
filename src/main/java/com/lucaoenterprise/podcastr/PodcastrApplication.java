package com.lucaoenterprise.podcastr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class PodcastrApplication {

	public static void main(String[] args) {
		SpringApplication.run(PodcastrApplication.class, args);
	}

}
