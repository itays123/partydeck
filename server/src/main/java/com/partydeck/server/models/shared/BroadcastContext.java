package com.partydeck.server.models.shared;

/**
 * Broadcast context
 */
public enum BroadcastContext {
    INIT,
    PLAYER_JOINED,
    PLAYER_LEFT,
    GAME_STARTED,
    ROUND_STARTED,
    CARD_USED,
    PICK,
    ROUND_ENDED,
    ROUND_ENDED_404,
    GAME_ENDED,
}
