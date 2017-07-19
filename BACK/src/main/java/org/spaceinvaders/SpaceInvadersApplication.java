package org.spaceinvaders;

import org.spaceinvaders.messages.process.MessageEntity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.LinkedList;

@SpringBootApplication
@EnableScheduling
@Configuration
public class SpaceInvadersApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceInvadersApplication.class, args);
	}
	@Bean
	LinkedList<MessageEntity> messages() {
		return new LinkedList<>();
	}
}
