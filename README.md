This is a small program I wrote in PixiJS to dabble with Maze Generation. Especially, using the depth first traversal approach or the backtracking approach. This was a small, but fun project.


## Demo Video
![](https://github.com/Njancodes/Maze-Generation-DFT/blob/main/demo.gif)

# How it works

This maze generation algorithm works by randomly picking an adjacent unvisited neighbor and breaking the wall between the currently selected cell and the chosen one. If the current cell has no unvisited neighbors, the algorithm backtracks to the nearest cell that has at least one unvisited neighbor.

### Note:
You can run this on your local machine by downloading the repo and serving the html file with a web server.

It was done with PixiJS.
