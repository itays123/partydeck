package com.partydeck.server.components;

import com.partydeck.server.models.Game;
import com.partydeck.server.models.Player;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

/**
 * The component responsible for saving the games
 * @author Itay Schechner
 * @version 1.0
 */
@Repository
public class GameRepository {

    private Map<String, Game> games = new HashMap<>();

    public boolean addPlayerToGame(String gameCode, Player player) {
        return false;
    }

    public boolean hasGame(String code) {
        return games.containsKey(code);
    }

}
