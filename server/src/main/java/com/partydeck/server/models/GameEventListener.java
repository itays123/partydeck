package com.partydeck.server.models;

/**
 * Listens the events fired by the game
 */
public interface GameEventListener {

    /**
     * Fires when a game enters round 1
     */
    void onGameStart();

    /**
     * Fires when a game ends
     */
    void onGameEnd();

}
