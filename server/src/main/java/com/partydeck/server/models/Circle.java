package com.partydeck.server.models;

import java.util.*;
import java.util.function.Consumer;

/**
 * An object representing a circle of entries
 * @author Itay Schechner
 * @version 1.0
 * @param <K> the unique key type of the entry
 * @param <T> the type of the entry
 */
public class Circle<K,T extends Identifiable<K>> implements Iterable<T> {

    private Queue<T> queue;

    /**
     * Default constructor - initializes the queue.
     */
    public Circle() {
        this.queue = new LinkedList<>();
    }

    /**
     * Add an entry to the circle
     * @param entry the entry to be added
     */
    public void addEntry(T entry) {
        queue.add(entry);
    }

    /**
     * Remove an entry from the circle
     * @param entry the entry to be removed
     */
    public void removeEntry(T entry) {
        queue.remove(entry);
    }

    /**
     * remove an entry by its id
     * @param id the id of the entry to be removed
     */
    public void removeEntry(K id) {
        for (T entry: queue)
            if (entry.is(id))
                removeEntry(entry);
    }

    /**
     * Check if the circle has an entry with a given id
     * @param id the id of the entry
     * @return true if the entry exists
     */
    public boolean has(K id) {
        for (T entry: queue)
            if (entry.is(id))
                return true;
        return false;
    }

    /**
     * Circle through the entries
     * @return the next entry
     */
    public Optional<T> circle() {
        if (queue.isEmpty())
            return Optional.empty();

        T entry = queue.remove();
        queue.add(entry); // add entry at the end
        return Optional.of(entry);
    }

    /**
     * Returns an iterable form of the circle
     * @return the iterable of the circle
     */
    @Override
    public Iterator<T> iterator() {
        return queue.iterator();
    }

    /**
     * Loops through the entries
     * @param action the action to perform on them
     */
    @Override
    public void forEach(Consumer<? super T> action) {
        queue.forEach(action);
    }

    /**
     * Returns a spliterator of the circle
     * @return the spliterator of the circle.
     */
    @Override
    public Spliterator<T> spliterator() {
        return queue.spliterator();
    }

    /**
     * Checks the size of the circle
     * @return the size in an integer form.
     */
    public int size() {
        return queue.size();
    }

}
