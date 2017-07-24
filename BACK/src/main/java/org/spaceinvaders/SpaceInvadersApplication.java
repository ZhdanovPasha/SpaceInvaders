package org.spaceinvaders;

import org.spaceinvaders.messages.gamelobby.LobbyMessageEntity;
import org.spaceinvaders.messages.gamelobby.LobbyMessageType;
import org.spaceinvaders.messages.process.ProcessMessageEntity;
import org.spaceinvaders.models.Player;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.LinkedList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@SpringBootApplication
@EnableScheduling
@Configuration
public class SpaceInvadersApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceInvadersApplication.class, args);
	}
	@Bean
	LinkedList<ProcessMessageEntity> processMessages() {
		return new LinkedList<>();
	}
	@Bean
	LinkedList<LobbyMessageEntity> lobbyMessages() { return new LinkedList<>();}
	@Bean
	LinkedList<Player> getPlayers() {return new LinkedList<Player>();}
	@Bean
	ConcurrentHashMap<String,Player> getMap() { return  new ConcurrentHashMap<>();}
	}
