# Todo List

## I’ll use this file for now since I have a lot I want to do, and keeping a TODO file will make it easier to remember everything.

---

### Sign-In System

I didn’t originally specify why I needed a sign-in system, but here’s the main reason:  
I want to create a setup where users can **upload their own bytebeat functions**, which would then appear in the **Functions** tab and replace the default hardcoded ones.

To make this possible, I’ll need a **server-side system** connected to a **database** (most likely PostgreSQL, since I’m already familiar with it).  

Additionally, I need to design a way to ensure that **only registered users** can upload functions.  
This system should also include an **approval process**—allowing me to review and approve or deny submissions—to make sure only valid, working bytebeat functions get accepted.

---

### Flairs / Tagging System

The **Functions** tab currently has a navigation bar on the left, which filters results by function type.  
I plan to extend this by implementing a **tagging system** so that when users upload new functions, they’re required to tag them by a specific type.

To keep things consistent and prevent randomness, I’ll likely **hardcode a list of valid tags**.  

Right now, the tab automatically shows results for all existing functions.  
That means if I add a new bytebeat without modifying any of the bar’s code, it dynamically adds a new entry automatically.  
So the tagging system would naturally fit into this setup without needing major changes — I just need to handle user-defined tags properly.
