package de.thm.mni.vewg30.hoare.philosoph;

public class Philosoph implements Runnable {

	private Room room;
	private Fork leftFork;
	private Fork rightFork;
	private String name;

	private volatile boolean goOn = true;

	public Philosoph(String name,Room room, Fork leftFork, Fork rightFork) {
		this.name = name;
		this.room = room;
		this.leftFork = leftFork;
		this.rightFork = rightFork;
	}

	@Override
	public void run() {
		try {
			while (goOn) {
				Thread.sleep((long) (Math.random() * 10000));
				room.enter(this);
				leftFork.aquire();
				rightFork.aquire();
				say("eating");
				Thread.sleep((long) (Math.random() * 10000));
				say("finished eating");
				leftFork.release();
				rightFork.release();
				room.leave(this);
			}
			
			say("stop received");
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public void stopPhilosoph() {
		goOn = false;
	}
	
	private void say(String message){
		System.out.println(name + " - " + message);
	}
	
	public String getName() {
		return name;
	}

}
