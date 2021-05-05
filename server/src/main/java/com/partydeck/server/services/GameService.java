package com.partydeck.server.services;

import com.partydeck.server.repositories.GameCodeGenerator;
import com.partydeck.server.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameCodeGenerator generator;

    @Autowired
    private GameRepository gameRepository;

    public void createGame(List<String> questions, List<String> answers) {
        String uniqueGameCode = generator.generate(gameRepository::hasGame);
        // Create game
    }

}
