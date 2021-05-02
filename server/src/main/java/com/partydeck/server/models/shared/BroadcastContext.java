package com.partydeck.server.models.shared;

/**
 * Broadcast context
 */
public enum BroadcastContext {
    // server to client
    INIT,
    PLAYER_JOINED,
    PLAYER_LEFT,
    GAME_STARTED,
    ROUND_STARTED,
    PLAYER_USAGE,
    PICK,
    ROUND_ENDED,
    ROUND_ENDED_404,
    GAME_ENDED,
    // client to server
    START,
    STOP,
    SKIP,
    USED,
    PICKED,
}
