package com.partydeck.server.web;

import com.partydeck.server.components.UrlDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

public class WebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private UrlDecoder decoder;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            Map<String, String> query = decoder.decode(session.getUri());
            String code = query.get("code");
            String name = query.get("name");

        } catch (Exception e) {
            // Handle
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    }
}
