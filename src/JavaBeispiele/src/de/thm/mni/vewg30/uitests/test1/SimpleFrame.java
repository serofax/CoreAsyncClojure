package de.thm.mni.vewg30.uitests.test1;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

public class SimpleFrame {

	public static void main(String[] args) {
		JFrame frame = new JFrame("Hello frame");
		JButton button = new JButton("button");
		frame.setBounds(400, 400, 400, 400);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		frame.add(button);
		button.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				System.out.println("click: " + event);
			}
		});
		frame.setVisible(true);
	}
}
