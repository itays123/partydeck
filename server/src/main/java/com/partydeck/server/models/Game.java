package com.partydeck.server.models;

import com.partydeck.server.models.iterable.Circle;
import com.partydeck.server.models.iterable.Deck;
import com.partydeck.server.models.events.PlayerEventListener;
import com.partydeck.server.models.events.RoundEventListener;
import com.partydeck.server.models.helpers.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * An object representing the game
 * @author Itay Schechner
 * @version 1.0
 */
public class Game implements PlayerEventListener, RoundEventListener, Identifiable<String> {

    public static final int TIMEOUT = 30 * 1000; // 30 seconds
    public static final int DELAY = 5 * 1000; // 5 seconds
    public static final int MIN_NUMBER_OF_PLAYERS = 3;

    private String id;

    private Circle<String, Player> players;
    private Deck<String, Card> questionDeck;
    private Deck<String, Card> answerDeck;

    private Round currentRound;

    private boolean started;
    private boolean stopRequested;

    private GameEventListener eventListener;

    /**
     * Creates an empty game
     */
    public Game() {
        this.id = "";
        this.players = new Circle<>();
        this.questionDeck = new Deck<>();
        this.answerDeck = new Deck<>();
        this.currentRound = null;
        this.started = false;
        this.stopRequested = false;
        this.eventListener = null;
    }

    /**
     * Creates a new Game object
     * @param id the id of the game
     * @param questions the game card questions
     * @param answers the game card answers
     */
    public Game(String id, Iterable<Card> questions, Iterable<Card> answers) {
        this();
        this.id = id;
        this.questionDeck = new Deck<>(questions);
        this.answerDeck = new Deck<>(answers);
        questionDeck.shuffle();
        answerDeck.shuffle();
    }

    /**
     * Creates a new Game object
     * @param id the id of the game
     * @param questions the game card questions as stream
     * @param answers the game card answers as stream
     */
    public Game(String id, Stream<Card> questions, Stream<Card> answers) {
        this();
        this.id = id;
        this.questionDeck = new Deck<>(questions);
        this.answerDeck = new Deck<>(answers);
    }

    /**
     * Creates a new Game object
     * @param id the id of the game
     * @param questions the list of string questions
     * @param answers the list of string answers
     */
    public Game(String id, List<String> questions, List<String> answers) {
        this(id,
            IntStream.range(0, questions.size()).mapToObj(index -> new Card(id + "@q" + index, questions.get(index))),
            IntStream.range(0, answers.size()).mapToObj(index -> new Card(id + "@a" + index, answers.get(index)))
        );
    }

    /**
     * Checks if a given id is identical to the identifiable object id
     *
     * @param id the id to compare to
     * @return true if the two values match
     */
    @Override
    public boolean is(String id) {
        return this.id.equals(id);
    }

    /**
     * Returns the id of the object
     *
     * @return the object id
     */
    @Override
    public String getId() {
        return this.id;
    }

    /**
     * Returns the number of players in the game
     * @return the size of the players cache
     */
    public int getPlayerCount() {
        return this.players.size();
    }

    /**
     * Set the game event listener
     * @param eventListener the event listener to set
     */
    public void setGameEventListener(GameEventListener eventListener) {
        this.eventListener = eventListener;
    }

    private void broadcastAll(BroadcastContext context, Object... args) {
        Map<String, Object> argsMap = new HashMap<>();
        for (int i = 0; i < args.length - 1; i+=2) {
            if (args[i] instanceof String)
                argsMap.put((String) args[i], args[i + 1]);
        }
        for (Player player: players) {
            player.broadcast(context, argsMap);
        }
    }

    /**
     * Adds a player to the game
     * @param player the player to add
     * @return true if player is successfully added
     */
    public boolean onConnectionCreate(Player player) {
        if (answerDeck.size() < Player.NUMBER_OF_CARDS) // if there are not enough cards
            return false;

        player.setPlayerEventListener(this);

        if (player.isConnected()) { // if connection is successful
            // get the player initial cards
            Card[] cards = new Card[Player.NUMBER_OF_CARDS];
            for (int i = 0; i < cards.length; i++) {
                cards[i] = answerDeck.pickTopCard().orElseThrow(); // will not throw
            }

            player.setCards(cards);

            if (players.size() == 0)
                player.makeAdmin();

            players.addEntry(player);
            player.broadcast(BroadcastContext.INIT, "id", player.getId(), "isAdmin", player.isAdmin(), "game", id);
            broadcastAll(BroadcastContext.PLAYER_JOINED, "count", players.size(), "joined", player.getNickname());
            return true;
        }

        return false;
    }

    /**
     * Fires when the admin requests to start the game
     * @param player the player who asked to start
     */
    @Override
    public void onStartRequest(Player player) {
        if (player.isAdminOf(this) && players.size() >= MIN_NUMBER_OF_PLAYERS) { // if the start request was valid

            if (eventListener != null)
                eventListener.onGameStart(id);

            broadcastAll(BroadcastContext.GAME_STARTED, "dispatched", "start");

            started = true;
            currentRound = new Round();
            currentRound.setRoundEventListener(this);
            currentRound.setNumberOfParticipants(players.size());
            currentRound.start();

        }
    }

    /**
     * Fires every time a new round is created
     */
    @Override
    public void onRoundStart() {
        try {

            if (!started || stopRequested) // if round should not be started
                throw new Exception("Round should not be started");

            Card question = questionDeck.pickTopCard().orElseThrow(); // if there aren't any questions left, finish the game
            Player judge = players.circle().orElseThrow(); // if there aren't any players left, finish the game
            judge.setJudge(true);

            currentRound.setJudge(judge);

            broadcastAll(BroadcastContext.ROUND_STARTED, "j", judge.getNickname(), "q", question.getContent());

        } catch (Exception e) {
            endGame(false);
        }
    }

    /**
     * Fires every time a player uses a card
     *
     * @param card   the card used
     * @param player the player that used the card
     * @return the new card to be added
     */
    @Override
    public Card onCardUse(Card card, Player player) {
        answerDeck.insertCardInBottom(card);
        currentRound.recordUse(card, player);
        broadcastAll(BroadcastContext.PLAYER_USAGE, "playerId", player.getId(), "playerName", player.getNickname());
        return answerDeck.pickTopCard().orElseThrow(); // there must be a card here since it was recently inserted
    }

    /**
     * Fires when a player asks to skip
     *
     * @param player the player who asked to skip
     */
    @Override
    public void onSkipRequest(Player player) {
        if (player.isAdminOf(this)) {
            currentRound.emitSkip();
        }
    }

    /**
     * Fires when all of the options are ready
     *
     * @param options the options picked by the players
     * @param judge   the current judge
     */
    @Override
    public void onOptionsReady(Iterable<Card> options, Player judge) {
        broadcastAll(BroadcastContext.PICK, "pick", options);
    }

    /**
     * Fires every time a judge picks a card
     *
     * @param cardId  the picked card id
     * @param judge the current judge
     */
    @Override
    public void onJudgePick(String cardId, Player judge) {
        if (judge.isJudgeOf(this)) {
            try {
                Player winner = currentRound.getWinner(cardId).orElseThrow();
                winner.incrementRoundsWon();
                broadcastAll(BroadcastContext.ROUND_ENDED, "winningCard", cardId, "playerWon", winner.getNickname());
            } catch (Exception e) {
                broadcastAll(BroadcastContext.ROUND_ENDED_404, "playerWon", "nobody");
            } finally {
                judge.setJudge(false);
            }
        }
    }

    /**
     * Fires when a round is unexpectedly ended
     *
     * @param judge the judge of the round
     */
    @Override
    public void onUnexpectedRoundEnd(Player judge) {
        broadcastAll(BroadcastContext.ROUND_ENDED_404, "playerWon", "nobody");
        judge.setJudge(false);
    }

    /**
     * Fires when the game admin presses 'next'.
     *
     * @param player the player who pressed next
     */
    @Override
    public void onNextRoundRequest(Player player) {
        if (player.isAdminOf(this)) {
            currentRound.clear();
            if (questionDeck.hasNext() && !stopRequested)
                currentRound.start();
            else
                endGame(false);
        }
    }

    /**
     * Fires when the admin requests to stop the game
     * @param player the player wo asked to stop
     */
    @Override
    public void onStopRequest(Player player) {
        if (player.isAdminOf(this)) {
            stopRequested = true;
            endGame(false);
        }
    }

    /**
     * Fires when the player has disconnected
     *
     * @param player the player who disconnected
     */
    @Override
    public void onConnectionPause(Player player) {
        players.removeEntry(player);

        if (currentRound != null)
            currentRound.setNumberOfParticipants(players.size());

        if (player.isAdminOf(this))
            players.peek().ifPresent(Player::makeAdmin);

        broadcastAll(BroadcastContext.PLAYER_LEFT, "count", players.size(), "left", player.getNickname());

        if ((started && players.size() < 3) || players.size() == 0)
            endGame(true);
    }

    private void endGame(boolean interrupted) {
        if (interrupted) {
            broadcastAll(BroadcastContext.GAME_INTERRUPTED);
        } else {
            Iterable<ScoreboardRow> scores = scores();
            broadcastAll(BroadcastContext.GAME_ENDED, "scores", scores);
        }
        for (Player player: players)
            player.destroyConnection();
        if (eventListener != null)
            eventListener.onGameEnd(id);
    }

    private Iterable<ScoreboardRow> scores() {
        List<ScoreboardRow> scores = new ArrayList<>();
        for (Player player: players)
            scores.add(new ScoreboardRow(player));
        return scores.stream().sorted().collect(Collectors.toList());
    }
}
