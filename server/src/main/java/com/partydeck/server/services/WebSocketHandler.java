package com.partydeck.server.services;

import com.partydeck.server.repositories.ConnectionProvider;
import com.partydeck.server.repositories.GameRepository;
import com.partydeck.server.repositories.Scheduler;
import com.partydeck.server.repositories.UrlParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * The component responsible for the logic of handling WebSocket requests
 * @author Itay Schechner
 * @version 1.0
 */
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    public static final Logger LOGGER = LoggerFactory.getLogger(WebSocketHandler.class);

    @Autowired
    private UrlParser urlParser;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ConnectionProvider connectionProvider;

    @Autowired
    private Scheduler scheduler;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            
            Map<String, String> query = urlParser.parse(session.getUri());
            String code = Optional.ofNullable(query.get("code")).orElseThrow(IllegalArgumentException::new);
            Optional<String> oldPlayerId = Optional.ofNullable(query.get("id"));
            String name;

            if (oldPlayerId.isEmpty()) { // new connection has been made
                name = Optional.ofNullable(query.get("name")).orElseThrow(IllegalArgumentException::new);
                LOGGER.debug("New connection made " + code, name);
                connectionProvider.addConnection(session, code, name, gameRepository::addPlayerToGame);
            }

            else { // rejoin event, oldPlayerId is present
                connectionProvider.reviveConnection(session, oldPlayerId.get(), code, gameRepository::resumeConnection);
            }


        } catch (UnsupportedOperationException e) {
            session.close(CloseStatus.BAD_DATA);
        } catch (IllegalArgumentException e) {
            session.close(CloseStatus.NOT_ACCEPTABLE);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        connectionProvider.handleMessage(session, message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        connectionProvider.handleConnectionPause(session, status).ifPresent(destroyHandler -> scheduler.schedule(destroyHandler, 30, TimeUnit.SECONDS));
    }
}
