# 2025 Q1 Demo

## Setup

In order to run the TypeScript files in this repo, just use bun!

```shell
npm i -g bun
bun ring-buffer
bun signal
```

## Ring Buffer

My first goal for this quarter was to complete the course ["The Last Algorithms Course You'll Need"](https://frontendmasters.com/courses/algorithms/), by ThePrimeagen, a YouTuber who's best known for reading and discussing tech articles on Twitch. My college degree is a Bachelor's in Mechanical Engineering and the only programming course we were required to take was Fortran, so I've often felt that I have gaps in my knowledge, and wanted to try to cover some of the basics with this course.

I would generally recommend the course, but to be clear, it is over nine hours long, the examples are all in TypeScript, and most of the course is more on the basic end of the spectrum.

### Description

One of the more interesting topics Prime touched on was ring buffers. This was discussed very early on, and really only briefly, but it caught my interest. Ring buffers are a type of array data structure that addresses some basic drawbacks of the more common ArrayList data structure.

ArrayLists are array data structures designed to handle "push" of new elements to the end and "pop" of elements off of the end. Under the hood, they are stored as a fixed-length data buffer. Their drawback is that they do not handle adding to the beginning of the array very well, the "unshift" / "shift" operations in JavaScript arrays. In order to do these operations, the whole array has to be moved by one so that the indices line up, which is an expensive operation.

```javascript
// push 3
// [0, 1, 2, -] -> [0, 1, 2, 3]

// pop 3
// [0, 1, 2, 3] -> [0, 1, 2, -]

// unshift 0
// [1, 2, 3, -] -> [0, 1, 2, 3]

// shift 0
// [0, 1, 2, 3] -> [1, 2, 3, -]
```

A Ring Buffer treats the start and end indices as flexible, so that the data in the array does not need to be reorganized when items are added or removed from either end of the buffer. A ring buffer might look like:

```javascript
const ring = {
  value: [1, 2, 3, null, null],
  startIndex: 0,
  endIndex: 2,
};
```

Unlike an ArrayList, when you unshift onto a ring buffer, you can wrap around without reorganizing the data, as long as there is room.

```javascript
ring.unshift(0);
// [1, 2, 3, null, 0], startIndex: 4, endIndex: 2
ring.push(4);
// [1, 2, 3, 4, 0], startIndex: 4, endIndex: 3
```

### Implementation

Prime mentions during the course that he can tell JavaScript arrays, while obfuscated at the memory level, are likely based on the ArrayList style implementation, because you can performance test them and see that they do not perform well at shift/unshift operations. Out of curiosity, I wanted to see if I could implement a JavaScript Ring Buffer and compare the performance.

The results can be found in [ring-buffer.ts](./ring-buffer.ts).

## Signal

My second goal for this quarter was to build a custom implementation of a Signal. In Angular 17+, signals are really taking over, and while they are trivially easy to use, I didn't really understand how they were able to communicate changes. In this case, after setting this as a goal for myself, I quickly found this has already been tackled by a [presenter at ng-conf 2024](https://www.youtube.com/watch?v=cJ7AuQUBmA4). I was shocked just seeing how short the video is. I have duplicated Corbin's implementation of a Signal, adding the `effect` type as well, in [signal.ts](./signal.ts).
