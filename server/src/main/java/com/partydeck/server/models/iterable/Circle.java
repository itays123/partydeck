package com.partydeck.server.models.iterable;

import com.partydeck.server.models.helpers.Identifiable;

import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * An object representing a circle of entries
 * @author Itay Schechner
 * @version 1.1.2
 * @param <T> the type of the entry
 */
public class Circle<T extends Identifiable<String>> implements Iterable<T> {

    private final Queue<T> queue;

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
     * Checks the number of entries in the circle
     * @return the size of the circle as an integer
     */
    public int size() {
        return queue.size();
    }

    /**
     * Count how many entries have a certain condition
     * @param condition the condition to fill
     * @return the number of entries that fill it
     */
    public int count(Function<T, Boolean> condition) {
        return (int) queue.stream().filter(condition::apply).count();
    }

    /**
     * Check if the circle contains a given entry
     * @param e the entry to look for
     * @return true if the entry is present
     */
    public boolean has(T e) {
        for (T entry: queue)
            if (entry.equals(e))
                return true;
        return false;
    }

    /**
     * Circle through the entries
     * @param condition the condition that any returned entry should make
     * @return the next entry that has the condition
     */
    public Optional<T> circleAndFind(Function<T, Boolean> condition) {
        for (int i = 0; i < queue.size(); i++) { // a classic for loop, so that we can change the queue as we go
            T entry = queue.remove();
            queue.add(entry); // ad entry at the end
            if (condition.apply(entry))
                return Optional.of(entry);
        }
        return Optional.empty();
    }

    /**
     * find the first entry without cycling
     * @param condition the condition that any returned entry should make
     * @return the next entry that has the condition
     */
    public Optional<T> find(Function<T, Boolean> condition) {
        for (T entry: queue) {
            if (condition.apply(entry))
                return Optional.of(entry);
        }
        return Optional.empty();
    }

    public List<String[]> asList(Function<T, String> extraField) {
        return queue.stream().map(p -> new String[] { p.getId(), extraField.apply(p) }).collect(Collectors.toList());
    }


    /**
     * Returns an iterator over elements of type {@code T}.
     *
     * @return an Iterator.
     */
    public Iterator<T> iterator() {
        return queue.iterator();
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
        queue.forEach(action);
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
        return queue.spliterator();
    }
}
