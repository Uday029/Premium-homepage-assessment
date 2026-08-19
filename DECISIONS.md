# Decisions

**1. Why this strategy over the obvious alternative you rejected?**
*(Note: As I chose Part 2, I'm answering this in the context of my frontend architecture and design strategy.)*
I chose to build this using pure Vanilla HTML, CSS, and JavaScript rather than reaching for heavy frameworks like React, Next.js, or Framer Motion. Why? Because achieving high-end, modern web interactions—like 3D mouse parallax, magnetic CTA buttons, and cursor-tracking spotlight cards (Linear-style)—is entirely possible with raw DOM APIs and CSS variables. Shipping zero kilobytes of JavaScript framework overhead for a landing page where a 3-second "wow" factor is critical felt like the most honest and performant engineering choice.

**2. One trade-off you made under the time limit, and what you’d do with a real week.**
The product mockup dashboard consists of static DOM elements. Under the tight time limit, I prioritized building the high-end interaction physics (magnetic buttons, animated glowing borders) and making the early-access waitlist form functionally realistic (it securely collects and logs emails to `localStorage`). With a real week, I’d turn the product preview card into a fully interactive, stateful web component, allowing users to type their own workout metrics directly on the landing page to experience the "blazing fast" auto-calculations firsthand before signing up. 

**3. Where did you use AI tools, and what did you personally verify or change afterward?**
I used AI (Claude/ChatGPT) to scaffold the initial HTML shell, brainstorm initial copy, and generate the boilerplate math for the 3D parallax mouse-tracking vectors. However, I manually rewrote the hero copy to be punchy and honest ("No fabricated metrics"), strictly avoiding the trap of AI-generated fake testimonials. I also personally calibrated the physics of the magnetic button interactions, built the spotlight CSS gradient logic, and verified the responsive constraints (ensuring perfect rendering at exactly 390px mobile width with absolutely zero horizontal scroll).
