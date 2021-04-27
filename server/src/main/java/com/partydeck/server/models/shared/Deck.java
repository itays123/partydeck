package com.partydeck.server.models.shared;

import java.util.*;
import java.util.function.Consumer;

/**
 * An object representing a deck of cards.
 * @author Itay Schechner
 * @version 1.0
 * @param <K> the identifier type of the object
 * @param <T> the entry type
 */
public class Deck<K, T extends Identifiable<K>> implements Iterable<T> {

    private final Set<T> originalDeck;
    private final Queue<T> currentDeck;

    /**
     * Default constructor. Generates an empty deck.
     */
    public Deck() {
        this.originalDeck = new HashSet<>();
        this.currentDeck = new LinkedList<>();
    }

    /**
     * Generates a deck from a given entry type.
     * @param entries the entries to add to the deck.
     */
    public Deck(Iterable<T> entries) {
        this();
        for (T entry: entries) {
            originalDeck.add(entry);
            currentDeck.add(entry);
        }
    }

    /**
     * Finds the top entry of the deck, if exists
     * @return the entry as optional.
     */
    public Optional<T> pickTopCard() {
        if (currentDeck.isEmpty())
            return Optional.empty();
        else {
            T entry = currentDeck.remove();
            return Optional.of(entry);
        }
    }

    /**
     * Checks if the original deck has an entry with a given identifier
     * @param id the identifier of the entry
     * @return true if the identifier is present
     */
    public boolean has(K id) {
        for (T entry: originalDeck)
            if (entry.is(id))
                return true;
        return false;
    }

    /**
     * Returns an entry to the bottom if existed before
     * @param id the id of the entry
     */
    public void insertCardInBottom(K id) {
        for (T entry: originalDeck)
            if (entry.is(id))
                insertCardInBottom(entry);
    }

    /**
     * Returns an entry to the bottom if existed before
     * @param entry the entry to add
     */
    public void insertCardInBottom(T entry) {
        if (originalDeck.contains(entry))
            currentDeck.add(entry);
    }

    /* TODO: Shuffle */

    /**
     * Returns an iterator over elements of type {@code T}.
     *
     * @return an Iterator.
     */
    public Iterator<T> iterator() {
        return currentDeck.iterator();
    }

    /**
     * Performs the given action for each element of the {@code Iterable}
     * until all elements have been processed or the action throws an
     * exception.  Actions are performed in the order of iteration, if that
     * order is specified.  Exceptions thrown by the action are relayed to the
     * caller.
     * <p>
     * The behavior of this method is unspecified if the action performs
     * side-effects that modify the underlying source of elements, unless an
     * overriding class has specified a concurrent modification policy.
     *
     * @param action The action to be performed for each element
     * @throws NullPointerException if the specified action is null
     * @implSpec <p>The default implementation behaves as if:
     * <pre>{@code
     *     for (T t : this)
     *         action.accept(t);
     * }</pre>
     * @since 1.8
     */
    public void forEach(Consumer<? super T> action) {
        currentDeck.forEach(action);
    }

    /**
     * Creates a {@link Spliterator} over the elements described by this
     * {@code Iterable}.
     *
     * @return a {@code Spliterator} over the elements described by this
     * {@code Iterable}.
     * @implSpec The default implementation creates an
     * <em><a href="../util/Spliterator.html#binding">early-binding</a></em>
     * spliterator from the iterable's {@code Iterator}.  The spliterator
     * inherits the <em>fail-fast</em> properties of the iterable's iterator.
     * @implNote The default implementation should usually be overridden.  The
     * spliterator returned by the default implementation has poor splitting
     * capabilities, is unsized, and does not report any spliterator
     * characteristics. Implementing classes can nearly always provide a
     * better implementation.
     * @since 1.8
     */
    public Spliterator<T> spliterator() {
        return currentDeck.spliterator();
    }
}
