package org.spaceinvaders;

import org.spaceinvaders.messages.MessageEntity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.LinkedList;

@SpringBootApplication
public class SpaceInvadersApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceInvadersApplication.class, args);
	}
	@Bean
	LinkedList<MessageEntity> messages() {
		return new LinkedList<>();
	}
}
