package com.partydeck.server;

import com.partydeck.server.models.Game;
import com.partydeck.server.models.GameEventListener;
import com.partydeck.server.models.Player;
import com.partydeck.server.models.BroadcastContext;
import com.partydeck.server.models.helpers.Card;
import com.partydeck.server.models.helpers.ScoreboardRow;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class GameTest {

    public static final Logger LOGGER = LoggerFactory.getLogger(GameTest.class);

    public static List<ScoreboardRow> result = new ArrayList<>();

    @Test
    void gameRuns() throws Exception {
        Game game = TestUtils.makeGame();
        Player player1 = new PlayerReactiveImpl("Player1");
        Player player2 = new PlayerReactiveImpl("Player2");
        Player player3 = new PlayerReactiveImpl("Player3");
        LOGGER.info("STARTING GAME"::toString);
        game.onConnectionCreate(player1);
        game.onConnectionCreate(player2);
        game.onConnectionCreate(player3);
        game.setGameEventListener(new GameEventListener() {
            @Override
            public void onGameStart(String gameId) {

            }
            
            @Override
            public void onGamePause(String gameId) {

            }

            @Override
            public void onGameDestroy(String gameId) {
                LOGGER.info(result::toString);
            }
        });

    }

    static class PlayerReactiveImpl extends Player {

        public PlayerReactiveImpl(String name) {
            super(name, name);
        }

        /**
         * Close the connection implementation
         */
        @Override
        public void destroyConnection() {
        }

        /**
         * Broadcast a message
         *
         * @param context the context of the broadcast
         * @param args    the args to send.
         */
        @Override
        public void broadcast(BroadcastContext context, Map<String, Object> args) {
            try {
                switch (context) {
                    case PLAYER_JOINED: {
                        int numberOfPlayers = (int) args.get("count");
                        if (numberOfPlayers >= 3 && isAdmin()) {
                            LOGGER.info("Commanding start"::toString);
                            new Thread(this::handleStartRequest).start();
                        }

                    }
                    break;
                    case ROUND_STARTED: {
                        String usedCardId = getCurrentCards()[0].getId();
                        for (Card card: getCurrentCards()) {
                            usedCardId = card.getId();
                            if (Math.random() < 0.25) break;
                        }
                        handleCardUsage(usedCardId);
                    }
                    break;
                    case PICK: {
                        if (isJudge()) {
                            Iterable<Card> options = (Iterable<Card>) args.get("options");
                            String pickedCardId = "";
                            for (Card card: options) {
                                pickedCardId = card.getId();
                                if (Math.random() < 0.25) break;
                            }
                            handleJudgePick(pickedCardId);
                        }
                    }
                    break;
                    case ROUND_ENDED: {
                        if (isAdmin())
                            LOGGER.info(("ROUND ENDED, winner: " + args.get("playerWon"))::toString);
                    }
                    break;
                    case GAME_ENDED: {
                        if (isAdmin())
                            result = (List<ScoreboardRow>) args.get("scores");
                    }
                    default:
                        break;
                }
            } catch (Exception e) {
                throw e;
            }
        }

        /**
         * Broadcast a message
         *
         * @param args the args to send.
         */
        @Override
        public void broadcast(Map<String, Object> args) {

        }

        /**
         * Checks if a player is connected
         *
         * @return true if the player has an active connection
         */
        @Override
        public boolean isConnected() {
            return true;
        }
    }

}
