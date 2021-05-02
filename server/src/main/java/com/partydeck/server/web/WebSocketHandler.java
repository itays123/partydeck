package com.partydeck.server.web;

import com.partydeck.server.components.GameRepository;
import com.partydeck.server.components.UrlDecoder;
import com.partydeck.server.models.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

public class WebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private UrlDecoder decoder;

    @Autowired
    private GameRepository gameRepository;

    private final Map<String, Player> connections = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            Map<String, String> query = decoder.decode(session.getUri());
            String code = query.get("code");
            String name = query.get("name");
            Player player = new PlayerWebSocketImpl(session.getId(), name, session);

            if (gameRepository.addPlayerToGame(code, player)) // if player is successfully added
                connections.put(session.getId(), player);
            else
                session.close(CloseStatus.SERVER_ERROR);

        } catch (Exception e) {
            session.close(CloseStatus.BAD_DATA);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (connections.containsKey(session.getId()))
            connections.get(session.getId()).handleMessage(message.getPayload());
        else
            session.close(CloseStatus.SESSION_NOT_RELIABLE);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Player removed = connections.remove(session.getId());
        if (!status.equalsCode(CloseStatus.NO_STATUS_CODE)) // session closed by the game
            removed.handleDisconnection();
    }
}
