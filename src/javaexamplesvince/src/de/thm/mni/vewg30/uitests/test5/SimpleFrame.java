package de.thm.mni.vewg30.uitests.test5;

import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

public class SimpleFrame {
	
	/**
	 * Works because we only have ONE eventhandler thread
	 * @param event
	 */
	public static void alt(ActionEvent event, JButton button){
		switch (button.getText()) {
		case "button1":
			if((event.getModifiers() & ActionEvent.CTRL_MASK) == ActionEvent.CTRL_MASK){
				System.out.println("Button 1 + CTRL pressed");
			}
			break;
		case "button2":
			System.out.println("Button 2 pressed");
			break;
		default:
			break;
		}
	}
	
	
	public static void main(String[] args) {
		JFrame frame = new JFrame("Hello frame");
		final JButton button1 = new JButton("button1");
		final JButton button2 = new JButton("button2");
		frame.setBounds(400, 400, 400, 400);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		frame.setLayout(new FlowLayout());
		frame.add(button1);
		frame.add(button2);
		button1.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				alt(event,button1);
			}
		});
		button2.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				alt(event,button2);
			}
		});
		
		
		frame.setVisible(true);
	}
}
