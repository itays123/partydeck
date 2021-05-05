package com.partydeck.server.web;

import com.partydeck.server.components.GameRepository;
import com.partydeck.server.components.UrlParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

public class WebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private UrlParser urlParser;

    @Autowired
    private GameRepository gameRepository;

    private final Map<String, WebSocketSessionWrapper> connections = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            Map<String, String> query = urlParser.parse(session.getUri());
            String code = query.get("code");
            String name = query.get("name");
            WebSocketPlayer player = new WebSocketPlayer(session.getId(), name, session);

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
            connections.get(session.getId()).onMessage(message.getPayload());
        else
            session.close(CloseStatus.SESSION_NOT_RELIABLE);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        WebSocketSessionWrapper removed = connections.remove(session.getId());
        if (removed != null && !status.equalsCode(CloseStatus.NO_STATUS_CODE)) // session closed by the game
            removed.onUnexpectedDisconnection();
    }
}
