package com.partydeck.server.models.shared;

import com.partydeck.server.models.player.Player;

/**
 * An object representing a scoreboard row
 */
public class ScoreboardRow implements Comparable<ScoreboardRow> {

    private final String nickname;

    private final int score;

    public ScoreboardRow() {
        nickname = "";
        score = 0;
    }

    public ScoreboardRow(String nickname, int score) {
        this.nickname = nickname;
        this.score = score;
    }

    public ScoreboardRow(Player player) {
        this.nickname = player.getNickname();
        this.score = player.getRoundsWon();
    }

    public String getNickname() {
        return nickname;
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
     *
     * <p>The implementor must ensure
     * {@code sgn(x.compareTo(y)) == -sgn(y.compareTo(x))}
     * for all {@code x} and {@code y}.  (This
     * implies that {@code x.compareTo(y)} must throw an exception iff
     * {@code y.compareTo(x)} throws an exception.)
     *
     * <p>The implementor must also ensure that the relation is transitive:
     * {@code (x.compareTo(y) > 0 && y.compareTo(z) > 0)} implies
     * {@code x.compareTo(z) > 0}.
     *
     * <p>Finally, the implementor must ensure that {@code x.compareTo(y)==0}
     * implies that {@code sgn(x.compareTo(z)) == sgn(y.compareTo(z))}, for
     * all {@code z}.
     *
     * <p>It is strongly recommended, but <i>not</i> strictly required that
     * {@code (x.compareTo(y)==0) == (x.equals(y))}.  Generally speaking, any
     * class that implements the {@code Comparable} interface and violates
     * this condition should clearly indicate this fact.  The recommended
     * language is "Note: this class has a natural ordering that is
     * inconsistent with equals."
     *
     * <p>In the foregoing description, the notation
     * {@code sgn(}<i>expression</i>{@code )} designates the mathematical
     * <i>signum</i> function, which is defined to return one of {@code -1},
     * {@code 0}, or {@code 1} according to whether the value of
     * <i>expression</i> is negative, zero, or positive, respectively.
     *
     * @param o the object to be compared.
     * @return a negative integer, zero, or a positive integer as this object
     * is less than, equal to, or greater than the specified object.
     * @throws NullPointerException if the specified object is null
     * @throws ClassCastException   if the specified object's type prevents it
     *                              from being compared to this object.
     */
    @Override
    public int compareTo(ScoreboardRow o) {
        return o.score - score;
    }
}
