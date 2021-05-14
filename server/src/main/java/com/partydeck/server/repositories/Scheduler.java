package com.partydeck.server.repositories;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * A component that schedules runnable functions for later execution
 */
@Component
public class Scheduler {

    private static final Logger logger = LoggerFactory.getLogger(Scheduler.class);

    private ScheduledExecutorService service;

    /**
     * Schedule a runnable for later use
     * @param runnable the runnable to schedule
     * @param delay the delay of the schedule
     * @param timeUnit the time unit of the delay (e.g minutes, milliseconds)
     */
    public void schedule(Runnable runnable, long delay, TimeUnit timeUnit) {
        if (service != null) {
            logger.info("Scheduling runnable for " + timeUnit.toSeconds(delay) + " seconds from now");
            service.schedule(runnable, delay, timeUnit);
        }

    }

    @PostConstruct
    private void instanciate() {
        service = Executors.newSingleThreadScheduledExecutor();
    }

    @PreDestroy
    private void removeService() {
        service.shutdown();
    }

}
