package de.thm.mni.vewg30.hoare.factorial;

import java.util.concurrent.ForkJoinPool;



public class App {
	public static void main(String[] args) {
		ForkJoinPool pool = new ForkJoinPool();
		Integer result = pool.invoke(new Factorizer(10));
		System.out.println(result);
	}

}
