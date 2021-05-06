package com.partydeck.server.repositories;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.partydeck.server.models.BroadcastContext;
import com.partydeck.server.models.Player;
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
        SessionWrapperPlayer player = new SessionWrapperPlayer(session.getId(), name, session);
        if (acceptor.apply(code, player)) // if player is accepted
            connections.put(session.getId(), player);
        else throw new UnsupportedOperationException();
    }

    /**
     * Fire when a new message is received
     * @param session the session responsible for the message
     * @param message the message to send
     */
    public void handleMessage(WebSocketSession session, String message) {
        Optional.ofNullable(connections.get(session.getId()))
                .ifPresent(player -> player.handleMessage(message));
    }

    /**
     * Fire after a connection is closed
     * @param session the session closed
     * @param closeStatus the close status
     */
    public void removeConnection(WebSocketSession session, CloseStatus closeStatus) {
        Optional.ofNullable(connections.remove(session.getId()))
                .filter(player -> !closeStatus.equalsCode(CloseStatus.NO_STATUS_CODE)) // if connection was not closed by the user itself
                .ifPresent(SessionWrapperPlayer::handleDisconnection);
    }

    private static class SessionWrapperPlayer extends Player  {

        private static final Type TYPE = new TypeToken<Map<String, Object>>(){}.getType();

        private WebSocketSession session;
        private final Gson gson;

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
        public void closeConnection() {
            closeConnection(CloseStatus.NO_STATUS_CODE);
        }

        private void closeConnection(CloseStatus status) {
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
            try {
                String json = gson.toJson(args);
                session.sendMessage(new TextMessage(json));
            } catch (IOException e) {
                closeConnection(CloseStatus.SESSION_NOT_RELIABLE);
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
        public void handleMessage(String message) {
            try {
                Map<String, Object> data = gson.fromJson(message, TYPE);
                String context = (String) Optional.ofNullable(data.get("context")).orElseThrow();
                handleMessage(BroadcastContext.valueOf(context), data);
            } catch (Exception e) {
                closeConnection(CloseStatus.SESSION_NOT_RELIABLE);
            }
        }

        /**
         * Emits after the session is disconnected
         */
        public void handleDisconnection() {
            super.handleDisconnection();
        }
    }

}
