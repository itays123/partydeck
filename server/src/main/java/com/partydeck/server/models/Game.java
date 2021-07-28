package com.partydeck.server.models;

import com.partydeck.server.models.iterable.Circle;
import com.partydeck.server.models.iterable.Deck;
import com.partydeck.server.models.events.PlayerEventListener;
import com.partydeck.server.models.events.RoundEventListener;
import com.partydeck.server.models.helpers.*;

import java.util.*;
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
    private boolean resumed;

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
        this.resumed = false;
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

    /*
    * Connection-related methods:
    *   Broadcasting
    *   Connection create
    *   Connection resume
     */

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

            if (players.count(Player::isConnected) == 0)
                player.makeAdmin();

            players.addEntry(player);
            player.broadcast(BroadcastContext.INIT, "id", player.getId(), "isAdmin", player.isAdmin(), "game", id);
            broadcastAll(BroadcastContext.PLAYER_JOINED, "count", players.count(Player::isConnected), "joined", player.getNickname());

            if(resumed)
                player.broadcast(BroadcastContext.JOINED_MID_GAME);
            if (started && !resumed)
                player.broadcast(BroadcastContext.GAME_PAUSED, new HashMap<>());

            return true;
        }

        return false;
    }

    /*
     * The actual game methods:
     *  game start, resume
     *  round start, end, skip, next
     *  player events
     */


    /**
     * Fires when a connection is renewed
     * @param player the player that has renewed connection
     * @return true if player is returned to the game successfully
     */
    public boolean onConnectionResume(Player player) {

        if (!players.has(player) || !player.isConnected())
            return false;

        player.broadcast(BroadcastContext.REJOIN, "newId", player.getId(), "game", id);

        // ensure admin exists
        if (players.find(Player::isAdmin).isEmpty())
            player.makeAdmin();

        if(resumed)
            player.broadcast(BroadcastContext.JOINED_MID_GAME, new HashMap<>());
        if (started && !resumed) // waiting for other players to resume connection
            player.broadcast(BroadcastContext.GAME_PAUSED, new HashMap<>());

        int newPlayerCount = players.count(Player::isConnected);

        broadcastAll(BroadcastContext.CONNECTION_RESUME, "count", newPlayerCount);

        if (started) {
            currentRound.setNumberOfParticipants(newPlayerCount);

            if (!resumed && newPlayerCount >= 3)
                onResume();
        }
        return true;
    }

    private void onResume() {
        if (eventListener != null)
            eventListener.onGameResume(id);

        broadcastAll(BroadcastContext.GAME_RESUMED);

        // in order for a game to be resumed, it has to be started, and therefore the current round != null.
        currentRound.clear();
        currentRound.start();

    }

    /**
     * Fires when the admin requests to start the game
     * @param player the player who asked to start
     */
    @Override
    public void onStartRequest(Player player) {
        int playerCount = players.count(Player::isConnected);
        if (player.isAdminOf(this) && playerCount >= MIN_NUMBER_OF_PLAYERS) { // if the start request was valid

            if (eventListener != null)
                eventListener.onGameStart(id);

            broadcastAll(BroadcastContext.GAME_STARTED, "dispatched", "start");

            started = true;
            resumed = true;
            currentRound = new Round();
            currentRound.setRoundEventListener(this);
            currentRound.setNumberOfParticipants(playerCount);
            currentRound.start();

        }
    }

    /**
     * Fires every time a new round is created
     */
    @Override
    public void onRoundStart() {
        Optional<Player> judgeOpt = players.circleAndFind(Player::isConnected);
        if (!started || !resumed || judgeOpt.isEmpty())
            return;

        Optional<Card> questionOpt = questionDeck.pickTopCard();

        if (questionOpt.isEmpty()) {
            onStop();
            return;
        }

        Player judge = judgeOpt.get();
        Card question = questionOpt.get();

        judge.setJudge(true);
        currentRound.setJudge(judge);
        broadcastAll(BroadcastContext.ROUND_STARTED, "j", judge.getNickname(), "q", question.getContent());
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
            if (questionDeck.hasNext() && started)
                currentRound.start();
            else
                onStop();
        }
    }

    /**
     * Fires when the admin requests to stop the game
     * @param player the player wo asked to stop
     */
    @Override
    public void onStopRequest(Player player) {
        if (player.isAdminOf(this)) {
            onStop();
        }
    }

    /*
    * Game lifecycle end:
    *   Connection Pause, Destroy
    *   Game Pause, Stop, Destroy
     */

    /**
     * Fires when the player has disconnected
     *
     * @param player the player who disconnected
     */
    @Override
    public void onConnectionPause(Player player) {

        int newPlayerCount = players.count(Player::isConnected);

        if (currentRound != null)
            currentRound.setNumberOfParticipants(newPlayerCount);

        if (player.isAdminOf(this)) {
            player.demoteToPlayer();
            players.find(Player::isConnected).ifPresent(Player::makeAdmin);
        }

        broadcastAll(BroadcastContext.CONNECTION_PAUSE, "count", newPlayerCount);

        // handle onPause
        if (started && newPlayerCount < 3) // game should pause
            onPause();
    }

    /**
     * Fires when the game has started and there are less than 3 players in the game
     */
    private void onPause() {
        this.resumed = false;
        broadcastAll(BroadcastContext.GAME_PAUSED);

        if (eventListener != null)
            eventListener.onGamePause(id);

        if (currentRound != null) // emit full skip, wait for admin to press "next" or "end game"
            currentRound.emitFullSkip();

    }

    private void onStop() {
        this.started = false;
        this.resumed = false;
        List<ScoreboardRow> scores = new ArrayList<>();
        for (Player player: players)
            scores.add(new ScoreboardRow(player));
        broadcastAll(BroadcastContext.GAME_ENDED, "scores", scores.stream().sorted().collect(Collectors.toList()));
        onDestroy();
    }

    /**
     * Fires when a player was unexpectedly disconnected for too long
     *
     * @param player the player who disconnected
     */
    @Override
    public void onConnectionDestroy(Player player) {
        players.removeEntry(player);

        broadcastAll(BroadcastContext.PLAYER_LEFT, "left", player.getNickname());

        // return player cards
        Arrays.stream(player.currentCards).forEach(answerDeck::insertCardInBottom);
        player.currentCards = new Card[] {};

        if ((started && players.size() < 3) || players.size() == 0) {
            broadcastAll(BroadcastContext.GAME_INTERRUPTED);
            onDestroy();
        }

    }

    public void onDestroy() {
        for (Player player: players)
            player.destroyConnection();
        if (eventListener != null)
            eventListener.onGameDestroy(id);
    }
}
