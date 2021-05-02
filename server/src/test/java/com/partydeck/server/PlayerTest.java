package com.partydeck.server;

import com.partydeck.server.models.Game;
import com.partydeck.server.models.player.Player;
import com.partydeck.server.models.shared.BroadcastContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
public class PlayerTest {

    @Test
    void argsPassing() throws Exception {
        Game game = TestUtils.makeGame();
        PlayerTestImpl player = new PlayerTestImpl();
        game.addPlayer(player, "arg1", "arg2");

        if (!player.arg1.equals("arg1") ||
            !player.arg2.equals("arg2"))
            throw new Exception("Args mismatch: Expected (arg1, arg2), Actual (" + player.arg1 + "," + player.arg2 + ")");
    }

    static class PlayerTestImpl extends Player {

        private String arg1;
        private String arg2;

        public PlayerTestImpl() {
            super("1", "Tester");
            arg1 = "";
            arg2 = "";
        }

        /**
         * Close the connection implementation
         */
        @Override
        public void closeConnection() {

        }

        /**
         * Broadcast a message
         *
         * @param context the context of the broadcast
         * @param args    the args to send.
         */
        @Override
        public void broadcast(BroadcastContext context, Map<String, Object> args) {

        }

        /**
         * Accept the connection
         *
         * @param args the connection to make.
         */
        @Override
        public void acceptConnection(Object... args) {
            try {
                if (args == null || !(args[0] instanceof String))
                    args = new Object[] {"", ""};
                arg1 = (String) args[0];
                arg2 = (String) args[1];
            } catch (Exception e) {
                arg1 = null;
                arg2 = null;
            }
        }

        /**
         * Checks if a player is connected
         *
         * @return true if the player has an active connection
         */
        @Override
        public boolean isConnected() {
            return false;
        }
    }

}
