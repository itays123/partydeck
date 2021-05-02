package com.partydeck.server.web;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.partydeck.server.models.player.Player;
import com.partydeck.server.models.shared.BroadcastContext;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;
import java.util.Optional;

/**
 * The WebSocket implementation of the player
 * @author Itay Schechner
 * @version 1.0
 */
public class PlayerWebSocketImpl extends Player {

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
    public PlayerWebSocketImpl(String id, String nickname, WebSocketSession session) {
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
     * @param context the context of the broadcast
     * @param args    the args to send.
     */
    @Override
    public void broadcast(BroadcastContext context, Map<String, Object> args) {
        args.put("context", context.toString());
        String json = gson.toJson(args);
        try {
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
     * handle messages received by the user
     *
     * @param message the message received by the suer
     */
    @Override
    public void handleMessage(String message) {
        try {
            Map<String, Object> data = gson.fromJson(message, TYPE);
            String context = (String) Optional.ofNullable(data.get("context")).orElseThrow();
            handleMessage(BroadcastContext.valueOf(context), data);
        } catch (Exception e) {
            closeConnection(CloseStatus.SESSION_NOT_RELIABLE);
        }
    }

    private void handleMessage(BroadcastContext context, Map<String, Object> data) throws UnsupportedOperationException {
        switch (context) {
            case START:
                handleStartRequest();
                break;

            case STOP:
                handleStopRequest();
                break;

            case SKIP:
                handleSkipRequest();
                break;

            case USED:
                String usedCardId = (String) Optional.ofNullable(data.get("used")).orElseThrow();
                handleCardUsage(usedCardId);
                break;

            case PICKED:
                String pickedCardId = (String) Optional.ofNullable(data.get("picked")).orElseThrow();
                handleJudgePick(pickedCardId);

            default:
                throw new UnsupportedOperationException();

        }
    }
}
