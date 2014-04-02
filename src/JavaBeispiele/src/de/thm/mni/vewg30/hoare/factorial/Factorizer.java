package de.thm.mni.vewg30.hoare.factorial;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.RecursiveTask;

public class Factorizer  extends RecursiveTask<Integer>{

	private static final long serialVersionUID = 1L;
	private int n;

	public Factorizer(int n) {
		this.n = n;
	}
	
	@Override
	protected Integer compute() {
		System.out.println("n: " + n + " Threadname: " + Thread.currentThread().getName());
		if(n == 0){
			return 1;
		}else{
			Factorizer child = new Factorizer(n-1);
			child.fork();
			
			Integer result = 0;
			try {
				result = child.get();
			} catch (InterruptedException | ExecutionException e) {
				e.printStackTrace();
			}
//			Integer result = child.compute();
			return result * n;
		}	
	}
}
