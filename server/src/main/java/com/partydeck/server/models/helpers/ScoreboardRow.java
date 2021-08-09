package com.partydeck.server.models.helpers;

import com.partydeck.server.models.Player;

/**
 * An object representing a scoreboard row
 */
public class ScoreboardRow implements Comparable<ScoreboardRow> {

    private final String nickname;

    private final String playerId;

    private final int score;

    public ScoreboardRow() {
        nickname = "";
        playerId = "";
        score = 0;
    }

    public ScoreboardRow(String nickname, String playerId, int score) {
        this.nickname = nickname;
        this.playerId = playerId;
        this.score = score;
    }

    public ScoreboardRow(Player player) {
        this(player.getNickname(), player.getId(), player.getRoundsWon());
    }

    public String getNickname() {
        return nickname;
    }

    public String getPlayerId() {
        return playerId;
    }

    public int getScore() {
        return score;
    }

    @Override
    public String toString() {
        return "ScoreboardRow{" +
                "nickname='" + nickname + '\'' +
                ", score=" + score +
                '}';
    }

    /**
     * Compares this object with the specified object for order.  Returns a
     * negative integer, zero, or a positive integer as this object is less
     * than, equal to, or greater than the specified object.
     */
    @Override
    public int compareTo(ScoreboardRow o) {
        return o.score - score;
    }
}
