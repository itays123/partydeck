package com.partydeck.server.services;

import com.partydeck.server.repository.ConnectionProvider;
import com.partydeck.server.repository.GameRepository;
import com.partydeck.server.repository.UrlParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private UrlParser urlParser;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ConnectionProvider connectionProvider;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            Map<String, String> query = urlParser.parse(session.getUri());
            String code = query.get("code");
            String name = query.get("name");

            connectionProvider.addConnection(session, code, name, gameRepository::addPlayerToGame);

        } catch (Exception e) {
            session.close(CloseStatus.BAD_DATA);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        connectionProvider.handleMessage(session, message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        connectionProvider.removeConnection(session, status);
    }
}
