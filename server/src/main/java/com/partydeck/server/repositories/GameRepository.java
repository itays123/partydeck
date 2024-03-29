package com.partydeck.server.repositories;

import com.partydeck.server.models.Game;
import com.partydeck.server.models.GameEventListener;
import com.partydeck.server.models.Player;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * The component responsible for saving the games
 * @author Itay Schechner
 * @version 1.0
 */
@Repository
public class GameRepository implements GameEventListener {

    private final Map<String, Game> games = new ConcurrentHashMap<>();

    /**
     * Adds a player to a game if exists
     * @param gameCode the code of the game
     * @param player the player to add
     * @return true if the player added successfully
     * @throws IllegalArgumentException if the game does not exist
     */
    public boolean addPlayerToGame(String gameCode, Player player) throws IllegalArgumentException {
        Game game = games.get(gameCode);
        if (game != null)
            return game.onConnectionCreate(player);
        throw new IllegalArgumentException();
    }

    /**
     * Notifies the game that a connection has been resumed
     * @param gameCode the game affected
     * @param player the player with renewed connection
     * @return true if the game had the player and received the message
     */
    public boolean resumeConnection(String gameCode, Player player) {
        Game game = games.get(gameCode);
        if (game != null)
            return game.onConnectionResume(player);
        return false;
    }

    /**
     * Creates a new game object
     * @param id the id of the game
     * @param questions the questions of the game
     * @param answers the answers of the game
     */
    public void createGame(String id, List<String> questions, List<String> answers) {
        Game game = new Game(id, questions, answers);
        game.setGameEventListener(this);
        games.put(id, game);
    }

    /**
     * Remove a game if it is empty
     * @param gameId the id of the game to remove
     */
    public void removeGame(String gameId) {
        Game game = games.get(gameId);
        if (game != null && game.getPlayerCount() == 0)
            games.remove(gameId);
    }

    /**
     * Checks if a game with a certain code exists
     * @param code the code of the game
     * @return true if the game exists
     */
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
     * Fires when a game is paused
     *
     * @param gameId the id of the game
     */
    @Override
    public void onGamePause(String gameId) {

    }

    /**
     * Fires when a game resumes
     *
     * @param gameId the id of the game
     */
    @Override
    public void onGameResume(String gameId) {

    }

    /**
     * Fires when a game ends
     *
     * @param gameId the id of the game
     */
    @Override
    public void onGameDestroy(String gameId) {
        games.remove(gameId);
    }
}
