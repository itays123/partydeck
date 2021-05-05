package com.partydeck.server;

import com.partydeck.server.services.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebSocketConfigurer {

    public static final Logger LOGGER = LoggerFactory.getLogger(WebsocketConfig.class);

    @Autowired
    private WebSocketHandler handler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        LOGGER.debug("Registering custom WS service");
        webSocketHandlerRegistry.addHandler(handler, "/ws")
                .setAllowedOriginPatterns("*");
    }

}
