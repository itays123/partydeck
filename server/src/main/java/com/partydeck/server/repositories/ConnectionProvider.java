package com.partydeck.server.repositories;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.partydeck.server.models.BroadcastContext;
import com.partydeck.server.models.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

/**
 * The repository responsible for handling connections
 * @author Itay Schechner
 * @version 1.0
 */
@Repository
public class ConnectionProvider {

    public static final Logger logger = LoggerFactory.getLogger(ConnectionProvider.class);

    private final Map<String, SessionWrapperPlayer> connections = new HashMap<>();

    /**
     * Fire when a new connection is established
     * @param session the new connection
     * @param code the code of the acceptor
     * @param name the name of the player
     * @param acceptor the acceptor of the new player
     * @throws UnsupportedOperationException when the player is not added
     */
    public void addConnection(WebSocketSession session, String code, String name, BiFunction<String, Player, Boolean> acceptor) throws UnsupportedOperationException {
        logger.info("SESSION CREATED: " + session.getId());
        SessionWrapperPlayer player = new SessionWrapperPlayer(session.getId(), name, session);
        if (acceptor.apply(code, player)) // if player is accepted
            connections.put(session.getId(), player);
        else throw new UnsupportedOperationException();
    }

    /**
     * Fire when a connection is resumed
     * @param newSession the new session to replace
     * @param oldPlayerId the id of the player affected
     * @param code the code of the game affected
     * @param acceptor the function that applies the change to the game
     * @throws UnsupportedOperationException if the oldId not found, the game code not found or the game is full.
     */
    public void reviveConnection(WebSocketSession newSession, String oldPlayerId, String code, BiFunction<String, Player, Boolean> acceptor) throws UnsupportedOperationException {
        logger.info("SESSION REVIVED: " + oldPlayerId);
        SessionWrapperPlayer player = connections.get(oldPlayerId);
        if (player == null)
            throw new UnsupportedOperationException();
        player.setSession(newSession);
        player.setId(newSession.getId());
        if (acceptor.apply(code, player))  // if player is accepted, change it's key on the map
            connections.put(newSession.getId(), connections.remove(oldPlayerId));
        else throw new UnsupportedOperationException();
    }

    /**
     * Fire when a new message is received
     * @param session the session responsible for the message
     * @param message the message to send
     * @throws IOException if the handling has gone wrong and the session closure produced an error
     */
    public void handleMessage(WebSocketSession session, String message) throws IOException {
        SessionWrapperPlayer connection = connections.get(session.getId());
        if (connection != null) {
            connection.handleMessage(message);
        }
    }

    /**
     * Fire after a connection is closed
     * @param session the session closed
     * @param closeStatus the close status
     */
    public void removeConnection(WebSocketSession session, CloseStatus closeStatus) {
        logger.info("SESSION DISCONNECTED: " + session.getId() + ", Status: " + closeStatus.toString());
        Optional.ofNullable(connections.remove(session.getId()))
                .filter(player -> !closeStatus.equalsCode(CloseStatus.NORMAL)) // if connection was not closed by the user itself
                .ifPresent(SessionWrapperPlayer::handleConnectionPause);
    }

    private static class SessionWrapperPlayer extends Player  {

        private static final Type TYPE = new TypeToken<Map<String, Object>>(){}.getType();

        private WebSocketSession session;
        private final Gson gson;

        /**
         * Modify the session on connection resume
         * @param session the new session to set
         */
        public void setSession(WebSocketSession session) {
            this.session = session;
        }

        /**
         * modify the id of the player on connection resume
         * @param id the new Id to set
         */
        public void setId(String id) {
            this.id = id;
        }

        /**
         * Creates a new player object
         *
         * @param id       the id of the player
         * @param nickname the nickname of the player
         * @param session the WebSocket session of the player.
         */
        public SessionWrapperPlayer(String id, String nickname, WebSocketSession session) {
            super(id, nickname);
            this.session = session;
            gson = new Gson();
        }

        /**
         * Close the connection implementation
         */
        @Override
        public void destroyConnection() {
            destroyConnection(CloseStatus.NORMAL);
        }

        private void destroyConnection(CloseStatus status) {
            try {
                if (session != null)
                    session.close(status);
            } catch (IOException e) {
                session = null;
            }
        }

        /**
         * Broadcast a message
         *
         * @param args    the args to send.
         */
        @Override
        public void broadcast(Map<String, Object> args) {
            if (session.isOpen())
                try {
                    String json = gson.toJson(args);
                    session.sendMessage(new TextMessage(json));
                } catch (IOException e) {
                    destroyConnection(CloseStatus.SESSION_NOT_RELIABLE);
                }
        }

        /**
         * Checks if a player is connected
         *
         * @return true if the player has an active connection
         */
        @Override
        public boolean isConnected() {
            return session.isOpen();
        }

        /**
         * Fires when a new message is received
         *
         * @param message the message in a string format
         */
        public void handleMessage(String message) throws IOException {
            try {
                Map<String, Object> data = gson.fromJson(message, TYPE);
                String context = (String) Optional.ofNullable(data.get("context")).orElseThrow();
                logger.debug("MESSAGE INCOMING (" + context + "): " + data);
                handleMessage(BroadcastContext.valueOf(context), data);
            } catch (Exception e) {
                session.close(CloseStatus.SESSION_NOT_RELIABLE);
            }
        }

        /**
         * Emits after the session is disconnected
         */
        public void handleConnectionPause() {
            super.handleConnectionPause();
        }
    }

}
