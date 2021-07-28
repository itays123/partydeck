package com.partydeck.server.models;

/**
 * Broadcast context
 */
public enum BroadcastContext {
    // server to client
    INIT,
    REJOIN,
    JOINED_MID_GAME,
    PLAYER_JOINED,
    CONNECTION_PAUSE,
    CONNECTION_RESUME,
    PLAYER_LEFT,
    GAME_STARTED,
    ROUND_STARTED,
    PLAYER_USAGE,
    PICK,
    ROUND_ENDED,
    ROUND_ENDED_404,
    GAME_PAUSED,
    GAME_RESUMED,
    GAME_INTERRUPTED,
    GAME_ENDED,
    // client to server
    START,
    STOP,
    SKIP,
    USED,
    PICKED,
    NEXT,
}
