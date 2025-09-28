# LearnBit: AI-Powered Coding Tutor 🚀

## About
LearnBit is a simple AI-powered coding assistant built to help beginner programmers.  
It gives **real-time feedback** on code, answers beginner-friendly coding questions,  
and tracks progress — like having a **personal mentor**.

---

## Problem
- Too many scattered tutorials → wasted study hours.  
- Students wait too long for feedback when stuck.  
- Repeated mistakes due to lack of progress tracking.  
- Tutors can’t give personalized attention to every learner.  

---

## Solution
LearnBit solves these by:  
- **Code Feedback** → Type code, get AI suggestions.  
- **Interactive Q&A** → Ask coding questions, get clear answers.  
- **Progress Tracker** → Track coding tasks with a history log.  
- **Speech** → AI reads feedback out loud.  
- **Flexible Models** → Works with Hugging Face or offline DeepSeek.  

---

## Features
- Real-time AI code review  
- Beginner-friendly answers to coding questions  
- Progress list stored locally  
- Text-to-speech feedback  
- Switchable AI model support  

---

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express  
- **AI Models:** Hugging Face API / DeepSeek (offline)  
- **Storage:** LocalStorage for progress  

---

## Project Structure
```

LearnBit/
├── public/
│   ├── index.html      # Main web page
│   ├── script.js       # Frontend logic
│   └── styles.css      # Styling
├── server.js           # Express server
├── .env                # API keys (ignored in Git)
├── .gitignore          # Ignore files for Git
├── package.json        # Dependencies + project info
├── package-lock.json   # Dependency lock
└── README.md           # Documentation

````

---

## Getting Started

### Requirements
- Node.js (v18 or higher)
- npm

### Installation
1. Clone this repo:
   ```bash
   git clone https://github.com/yourusername/LearnBit.git
   cd LearnBit
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your Hugging Face API key to a `.env` file:

   ```
   HUGGINGFACE_TOKEN=your_api_key_here
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. Open in browser:

   ```
   http://localhost:3000
   ```

---

## Usage

1. Paste or type code in the input box.
2. Click **Check Code** → Get feedback.
3. Click **Speak Code** → Hear the feedback spoken aloud.
4. See your progress updates in the “My Progress” list.

---

## Roadmap

* Add voice input for code/questions
* Add cloud storage for progress
* Add gamification (challenges, levels)
* Multi-language support

---

## License

This project is licensed under the MIT License.

---

## Author
Alex Mureti Maingi**
Helping software engineering students learn **smarter, not slower**.

```

---

👉 Do you also want me to generate the **MIT LICENSE file** alongside this so it’s fully ready?
```
 