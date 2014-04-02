package de.thm.mni.vewg30.hoare.philosoph;

import java.util.concurrent.Semaphore;

public class Fork {

	private Semaphore semaphore = new Semaphore(1, true);
	
	public void aquire() throws InterruptedException {
		semaphore.acquire();		
	}

	public void release() {
		semaphore.release();
	}

}
