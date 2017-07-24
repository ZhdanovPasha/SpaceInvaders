package org.spaceinvaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;

/**
 * Created by gemini on 20.07.17.
 */
@Component
public class CustomDecoratorFactory implements WebSocketHandlerDecoratorFactory {
    @Autowired
    CustomWebSocketHandlerDecorator decorator;
    @Override
    public WebSocketHandler decorate(WebSocketHandler webSocketHandler) {
        return decorator;
    }
}
