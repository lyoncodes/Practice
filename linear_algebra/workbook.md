* I. Multistep Inequalities with Variables on Both Sides

* KEY: When you multiply or divide both sides of an equation by a negative 		number you must swap the inequality.

* Our first two examples will not demonstrate the key principle

# 1. 
5x + 7 > 3(x + 1)
5x + 7 > 3x + 3
-3x     -3x
2x + 7 > 3
   - 7 - 7
2x >   - 4
/2     / 2
x  >   - 2

# 2. 
4x + 3 < -1
   - 3   -3
4x <     -4
/4       /4
x  <     -1

* The next two examples will utilize the key principle

# 1. 
5x > 8x + 27
-8x -8x
-3x >     27
/-3x    /-3x
x  <     -9

# 2. 
8x - 5(4x + 1) >= -1 + 2(4x - 3)
8x - 20x  - 5  >= -1 +  8x  - 6
-12x - 5 >= -7 + 8x
-8x            - 8x
-20x - 5 >= -7
     + 5    +5
-20x     >= -2
/-20x      /-20x
x <= 1/10

## QUIZ 2 ##

# 1. #
Svetlana's hair is 4 centimeters long. Her hair grows 1.5 centimeters per month. Svetlana wants her hair to grow so that it is at least 7 centimeters long.

Write an inequality to determine the number of months, m, it will take Svetlana's hair to grow so it is at least 7 centimeters long.

* JS:
	var answer = []
	for (var i = 3; i <= 7; i += 1.5) {
		answer.push(i)
	}
	console.log(answer.length-1)

* Algebra:
	4 * 1.5m >= 7 
	-4        - 4
	1.5m >= 3
	/1.5m /1.5m
	x >= 2

# 2. #
* Algebra:

	53w + 13 < 56w + 16
	-53w     - 53w
	13       < 3w  + 16
	-16						 - 16
	-3       < 3w
	-1 < w

# 3. #
Joey Chestnut is trying to break his own world record for eating the most hot dogs and buns in 10 minutes. He needs to eat more than 72 hot dogs to break his record. After 1 minute of competition, Joey has eaten 10 hot dogs. Joey wants to know the number of hot dogs per minute that he needs to eat for the next 9 minutes to break his own record.

Let d represent the number of hot dogs Joey eats per minute. Write an inequality to determine the number of hot dogs per minute Joey must eat for the last 9 minutes to break his record.

* Algebra:

9d > 72 - 10
9d > 62
/9   /9
d  > 62/9
d >= 7

# 4. #
30b + 53 >= 18b - 83

# 5. #
Every day, Katie looks for seashells on the beach. She has 28 shells in her collection. Katie finds 12 more shells each day.
Write an inequality to determine the number of days, d, it will take Katie to collect over 100 shells.

* JS
	var shells = []
	for (let d = 28; d < 100; d += 12) {
		shells.push(d)
	}
	console.log(shells.length)
* JS
	function labDaysLeft(shelfCapacity, shellsPerDay) {
		var shells = []
		if (shelfCapacity > 0) {
			for (let i = 28; i < shelfCapacity; i += shellsPerDay) {
				shells.push(i)
			}
		} console.log(shells.length)
	}
* Alegebra:
	12d > 100 - 28
	12d > 72
	/12  /12
	d   > 6

# 6. #
55c + 13 <= 75c + 39

# 7. #
Mrs. Morton has a special reward system for her class. When all her students behave well, she rewards them by putting 3 marbles into a marble jar. When the jar has 100 marbles or more, the class has a party. Right now,the jar contains 24 marbles.

Let r represent the number of additional times the class is rewarded. Write an inequality to determine how many more times the class needs to be rewarded in order to earn a party.

* JS
var days = []
for (let i = 24; i <= 100; i+= 3) {
	days.push(i)
}
console.log(days)
