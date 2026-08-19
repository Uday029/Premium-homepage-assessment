# Decisions

**1. Why this scheme and not the obvious alternative you rejected?**
*(Note: I chose Part 2 so I am answering this in regard to my front-end architecture and design strategy.)* I decided to build this with straight Vanilla HTML, CSS and JavaScript, rather than using any major frameworks such as React, Next.js or Framer Motion. What gives? Because you can totally build high-end, modern web interactions like 3D mouse parallax, magnetic CTA buttons and cursor-tracking spotlight cards (Linear-style) with raw DOM APIs and CSS variables. For a landing page where a 3-second “wow” factor is critical, shipping zero kilobytes of JavaScript framework overhead felt like the most honest, performant engineering choice.


**2. Something you sacrificed in the time constraint, and what you would do with a real week.**
The product mockup dashboard is built using static DOM elements. Given the tight time frame, my focus was on building out the high-end interaction physics (magnetic buttons, animated glowing borders) and making the early-access waitlist form functionally realistic (it securely captures and logs emails to `localStorage`). If I had a real week, I would have made the product preview card a fully interactive stateful web component so that users would have been able to type their own workout metrics right on the landing page and experience the "blazing fast" auto-calculations first hand before signing up. 



**3. What AI tools did you use, what did you verify or change yourself afterward?**
I used AI (Claude/ChatGPT) to help scaffold the initial HTML shell, brainstorm initial copy and generate the boilerplate math for the 3D parallax mouse tracking vectors. However, I manually rewrote the hero copy to be punchy and honest (“No fabricated metrics”) avoiding the trap of AI-generated fake testimonials. I also personally tweaked the physics of the magnetic button interactions, built the CSS gradient logic for the spotlight, and verified the responsive constraints (making sure it rendered flawlessly at exactly 390px mobile width with no horizontal scroll whatsoever).
