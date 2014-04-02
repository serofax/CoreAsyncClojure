package de.thm.mni.vewg30.uitests.test2;

import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

public class SimpleFrame {

	public static void main(String[] args) {
		JFrame frame = new JFrame("Hello frame");
		JButton button1 = new JButton("button1");
		JButton button2 = new JButton("button2");
		frame.setBounds(400, 400, 400, 400);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		frame.setLayout(new FlowLayout());
		frame.add(button1);
		frame.add(button2);
		button1.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				System.out.println("click: " + event);
			}
		});
		button2.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				System.out.println("click: " + event);
			}
		});
		frame.setVisible(true);
	}
}
