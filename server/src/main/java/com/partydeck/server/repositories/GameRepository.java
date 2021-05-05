package com.partydeck.server.repositories;

import com.partydeck.server.models.Game;
import com.partydeck.server.models.GameEventListener;
import com.partydeck.server.models.Player;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The component responsible for saving the games
 * @author Itay Schechner
 * @version 1.0
 */
@Repository
public class GameRepository implements GameEventListener {

    private final Map<String, Game> games = new HashMap<>();

    public boolean addPlayerToGame(String gameCode, Player player) {
        // TODO: Throw error
        Game game = games.get(gameCode);
        if (game != null)
            return game.addPlayer(player);
        return false;
    }

    public void createGame(String id, List<String> questions, List<String> answers) {
        Game game = new Game(id, questions, answers);
        // game.setGameEventListener
        games.put(id, game);
    }

    public boolean hasGame(String code) {
        return games.containsKey(code);
    }

    /**
     * Fires when a game enters round 1
     *
     * @param gameId the id of the game
     */
    @Override
    public void onGameStart(String gameId) {

    }

    /**
     * Fires when a game ends
     *
     * @param gameId the id of the game
     */
    @Override
    public void onGameEnd(String gameId) {

    }
}
