package com.partydeck.server.models;

/**
 * Listens the events fired by the game
 */
public interface GameEventListener {

    /**
     * Fires when a game enters round 1
     * @param gameId the id of the game
     */
    void onGameStart(String gameId);

    /**
     * Fires when a game ends
     * @param gameId the id of the game
     */
    void onGameEnd(String gameId);

}
