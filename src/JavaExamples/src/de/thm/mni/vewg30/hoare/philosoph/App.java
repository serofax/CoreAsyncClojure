package de.thm.mni.vewg30.hoare.philosoph;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class App {
	public static void main(String[] args) {
		final int countPhils = 5;

		Room room = new Room(countPhils - 1);
//		Room room = new Room(5);
//		Room room = new Room(countPhils); // remove sleeps 
		Fork[] forks = new Fork[countPhils];
		Philosoph[] philosophs = new Philosoph[countPhils];

		for (int i = 0; i < countPhils; ++i) {
			forks[i] = new Fork();
		}

		for (int i = 0; i < countPhils; ++i) {
			philosophs[i] = new Philosoph("phil" + i, room, forks[(i + 1)
					% countPhils], forks[i]);
		}

		ExecutorService executorService = Executors
				.newFixedThreadPool(countPhils);
		
		for(Philosoph philosoph :philosophs){
			executorService.execute(philosoph);
		}		
		
		try {
			Thread.sleep(TimeUnit.MINUTES.toMillis(1));
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		for(Philosoph philosoph :philosophs){
			philosoph.stopPhilosoph();
		}
		executorService.shutdown();		

	}

}
