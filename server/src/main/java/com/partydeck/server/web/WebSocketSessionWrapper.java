package com.partydeck.server.web;

/**
 * A Wrapper for the WebSocketSession class
 */
public interface WebSocketSessionWrapper {

    /**
     * Emits after the session is disconnected
     */
    void onUnexpectedDisconnection();

    /**
     * Fires when a new mess
     * @param message the message in a string format
     */
    void onMessage(String message);

}
