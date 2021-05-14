package com.partydeck.server.services;

import com.partydeck.server.repositories.GameCodeGenerator;
import com.partydeck.server.repositories.GameRepository;
import com.partydeck.server.repositories.Scheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * The game service
 * @author Itay Schechner
 * @version 1.0
 */
@Service
public class GameService {

    private static final int REMOVE_EMPTY_GAME_DELAY = 5;

    @Autowired
    private GameCodeGenerator generator;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private Scheduler scheduler;

    /**
     * Creates a new game
     * @param questions the list of questions
     * @param answers the list of answers
     * @return the code of the newly created game
     */
    public String createGame(List<String> questions, List<String> answers) {
        String uniqueGameCode = generator.generate(gameRepository::hasGame);
        gameRepository.createGame(uniqueGameCode, questions, answers);
        scheduler.schedule(removeGameIfEmpty(uniqueGameCode), REMOVE_EMPTY_GAME_DELAY, TimeUnit.MINUTES);
        return uniqueGameCode;
    }

    private Runnable removeGameIfEmpty(String gameId) {
        return () -> gameRepository.removeGame(gameId);
    }

    /**
     * Checks if a game exists
     * @param code the code of the game to check
     * @return true if the game exists
     */
    public boolean checkGame(String code) {
        return gameRepository.hasGame(code);
    }

}
