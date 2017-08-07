package org.spaceinvaders;

import org.spaceinvaders.messages.gamelobby.LobbyMessageEntity;
import org.spaceinvaders.messages.gamelobby.LobbyMessageType;
import org.spaceinvaders.messages.process.ProcessMessageEntity;
import org.spaceinvaders.models.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.LinkedBlockingQueue;

@SpringBootApplication
@EnableScheduling
@Configuration
public class SpaceInvadersApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceInvadersApplication.class, args);
	}

	@Bean
	LinkedList<Game> games() {
		LinkedList<Game> games = new LinkedList<>();
		games.push(new Game());
		games.push(new Game());
		return games;
	}
	@Bean
	ConcurrentHashMap<String,Player> getPlayers() {
		return new ConcurrentHashMap<String,Player>();
	}
}


