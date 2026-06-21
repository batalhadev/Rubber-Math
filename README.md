<h1 style="text-align:center;">Rubber Math</h1>

<p align="center">
  <strong>Write math at the speed of thought.</strong>
</p>

<p align="center">
  A LaTeX editor built for solving mathematics, not just writing mathematics.
</p>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4A2B29?style=for-the-badge\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge\&logo=vite\&logoColor=FFD62E)

---

## What is Rubber Math?

Rubber Math is a LaTeX editor that I started developing after repeatedly feeling frustrated by the experience of solving mathematics on a computer.

LaTeX is fantastic for producing documents and academic papers, but when the goal is to perform calculations, test ideas, solve exercises, or write proofs step by step, it often gets in the way more than it helps. Small interruptions quickly add up: moving the cursor into a fraction, navigating nested structures, searching for commands, or fixing syntax errors while still thinking about the solution.

The idea behind Rubber Math is simple: reduce that friction as much as possible.

Instead of focusing on document publishing, it focuses on the stage that comes before it: the reasoning process itself.

---

## Why does this project exist?

When we solve mathematics on paper, we rarely think about the tool. The pencil simply follows our reasoning.

On a computer, that is not always the case.

Even with good editors, writing complex mathematical expressions often requires many small actions that interrupt concentration. Individually, they may seem insignificant, but throughout an entire solution they break the flow of thought.

Rubber Math grew from an attempt to make this experience more direct and more comfortable for people who spend hours writing mathematics.

---

## What does it do?

### Intelligent structural navigation

One of the project's most important features is structural navigation.

Instead of treating the document as plain text, the editor understands the hierarchy of mathematical expressions and allows users to navigate through them predictably using only the keyboard.

Consider the expression:

```latex
\frac{
    \sqrt{
        \frac{a+b}{c+d}
    }
}{x}
```

Even in deeply nested structures, you can move forward and backward between parameters using `Tab` and `Shift + Tab` without manually repositioning the cursor.

Internally, this works through a depth first search (DFS) traversal of the expression's syntax tree.

The result is a much more natural navigation experience for people who work with LaTeX regularly.

---

### Step by step solutions

Each line in the editor represents an independent step in a solution.

```latex
2x + 4 = 10
2x = 6
x = 3
```

The goal is to reproduce the way we normally solve exercises on paper or a whiteboard, allowing users to follow the evolution of their reasoning one line at a time.

This makes the editor especially useful for:

* Exercises
* Mathematical proofs
* Algebraic manipulations
* Study notes

---

### Integrated comments

Not every line contains only mathematics.

We often want to record a quick note that explains a transformation or justifies a step.

For that reason, the editor supports inline comments:

```latex
2x = 6 // isolating the variable
```

The mathematical expression and the comment are processed separately, allowing users to document their reasoning without compromising readability.

---

### Shortcuts and structure insertion

Rubber Math includes a shortcut system designed to reduce the amount of typing required while writing mathematics.

For example:

```text
Shift + F → \frac{□}{□}
```

All available shortcuts and structures are defined in a single configuration source used by both the interface and the keybinding system.

This approach simplifies project maintenance and keeps both systems synchronized.

---

### Instant rendering

Every change made in the editor immediately appears in the preview.

There is no compilation step and no need to refresh the preview manually.

The goal is to keep the preview synchronized with the writing process, allowing users to experiment with expressions freely without interrupting their workflow.

---

## How does it work internally?

The project was built using React, TypeScript, Zustand, and KaTeX.

The interface is divided into independent components:

```text
App
├── Topbar
├── Sidebar
├── Editor
└── PreviewArea
```

Shared state is centralized through Zustand, allowing the editor, preview, navigation, and shortcuts to remain synchronized without requiring a large amount of integration code.

This separation also makes the project easier to evolve, since the interface and mathematical logic can change relatively independently.

---

## Technologies

* React
* TypeScript
* Zustand
* KaTeX
* Tailwind CSS v4
* Vite

---

## Roadmap

There are still several ideas I would like to explore in the future.

Some of them include:

* Improvements to structural navigation
* More shortcuts for mathematical writing
* Study focused tools
* Better support for long solutions
* Productivity features designed for students

The goal has remained the same since the beginning of the project: make digital mathematical writing less bureaucratic and closer to the natural process of solving problems.

If the editor helps you focus more on mathematics and less on the tool, then it has achieved its purpose.
