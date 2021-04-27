package com.partydeck.server.models.player;

import com.partydeck.server.models.shared.Card;

/**
 * An interface used to handle player events
 */
public interface PlayerEventListener {

    /**
     * Fires every time a player uses a card
     * @param card the card used
     * @param player the player that used the card
     * @return the new card to be added
     */
    Card onCardUse(Card card, Player player);

    /**
     * Fires when the admin requests to start the game
     */
    void onStartRequest();

    /**
     * Fires when the admin requests to stop the game
     */
    void onStopRequest();

    /**
     * Fires when the player has disconnected
     * @param player the player who disconnected
     */
    void onPlayerDisconnection(Player player);

}
