package de.thm.mni.vewg30.jcsp;

import java.util.Date;

import org.jcsp.lang.Any2AnyChannel;
import org.jcsp.lang.CSProcess;
import org.jcsp.lang.Channel;
import org.jcsp.lang.ChannelInput;
import org.jcsp.lang.ChannelOutput;
import org.jcsp.lang.Parallel;

public class FirstTest {
	
	private static class ReadProcess implements CSProcess{
		private ChannelInput in;
		
		public ReadProcess(ChannelInput in){
			this.in = in;
		}
		@Override
		public void run() {
			while(true){
				System.out.println("Value from Channel: " + in.read());
			}
		}
	}
	
	private static class WriteProcess implements CSProcess{

		private ChannelOutput out;
		
		public WriteProcess(ChannelOutput out) {
			this.out = out;
		}
		
		@Override
		public void run() {
			while(true){
				out.write("Hello " + new Date().toString());
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
		}
		
	}

	public static void main(String[] args) {
		Any2AnyChannel chan = Channel.any2any();
		
		ReadProcess read = new ReadProcess(chan.in());
		WriteProcess write = new WriteProcess(chan.out());
		
		Parallel par = new Parallel(new CSProcess[]{read,write});
		par.run();

	}

}
