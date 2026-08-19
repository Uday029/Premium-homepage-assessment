# Decisions

**1. Why this strategy over the obvious alternative you rejected?**
*(Note: As I chose Part 2, I'm answering this in the context of my tech stack and design strategy.)*
I chose to build this using vanilla HTML, CSS, and JavaScript rather than reaching for a framework like React, Next.js, or Tailwind. For a single landing page focused on a 3-second "wow" factor, shipping zero JavaScript framework overhead felt like the most honest and performant engineering choice. It guarantees instant load times and forced me to rely on pure CSS fundamentals (Flexbox, CSS Variables for the dark mode toggle) rather than hiding behind a UI component library.

**2. One trade-off you made under the time limit, and what you’d do with a real week.**
The mock dashboard interaction is handled via CSS hover states revealing static, hardcoded data. Under a tight time limit, this was the fastest way to convey the product's value proposition (e.g., automatic 1RM and Volume calculations) without faking data. With a real week, I’d build the preview as an interactive, stateful component where a user could actually type a mock workout directly into the landing page to experience the "blazing fast" logging feature firsthand before signing up. 

**3. Where did you use AI tools, and what did you personally verify or change afterward?**
I used Claude/ChatGPT to generate the initial boilerplate HTML shell and brainstorm some early copy ideas. However, AI often writes overly verbose, "salesy" marketing copy, so I manually rewrote the hero text to be punchy, direct, and honest ("No fabricated metrics. Just a blazing fast log..."). I personally verified the responsive design constraints (ensuring it looks perfect at exactly 390px mobile width and 1440px desktop with zero horizontal scroll), manually implemented the custom dark mode toggle logic, and added the Konami code easter egg myself.
