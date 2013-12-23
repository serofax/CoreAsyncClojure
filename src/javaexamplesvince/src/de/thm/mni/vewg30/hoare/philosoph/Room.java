package de.thm.mni.vewg30.hoare.philosoph;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Semaphore;

public class Room {
	
	private int maxPhils;
	private Set<Philosoph> philsInside = new HashSet<Philosoph>();
	
	private Semaphore semaphore = null;

	public Room(int maxPhils) {
		this.maxPhils = maxPhils;
		this.semaphore = new Semaphore(this.maxPhils, true);
	}
	
	public void enter(Philosoph phil) throws InterruptedException{
		semaphore.acquire();		
		philsInside.add(phil);
		System.out.println("room - " + phil.getName() + " enters the room. There are " + philsInside.size() + " in the room now and " + semaphore.getQueueLength() + " Philosophs are waiting.");
	}
	
	public void leave(Philosoph phil){
		philsInside.remove(phil);
		System.out.println("room - " + phil.getName() + " leaves the room. There are " + philsInside.size() + " in the room now and " + semaphore.getQueueLength() + " Philosophs are waiting.");
		semaphore.release();
	}
}
