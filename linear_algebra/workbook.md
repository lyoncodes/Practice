# Multistep Linear Inequalities

* KEY: When you multiply or divide both sides of an equation by a negative 		number you must swap the inequality.

## Our first two examples will not demonstrate the key principle

# 1. #
	5x + 7 > 3(x + 1)
	5x + 7 > 3x + 3
	-3x     -3x
	2x + 7 > 3
	   - 7 - 7
	2x >   - 4
	/2     / 2
	x  >   - 2

# 2. #
	4x + 3 < -1
	   - 3   -3
	4x <     -4
	/4       /4
	x  <     -1

## The next two examples will utilize the key principle

# 1. #
	 5x > 8x + 27
	 -8x -8x
	-3x >     27
	/-3x    /-3x 
	x   <     -9 

# 2. #
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

## 1. #
Svetlana's hair is 4 centimeters long. Her hair grows 1.5 centimeters per month. Svetlana wants her hair to grow so that it is at least 7 centimeters long.

Write an inequality to determine the number of months, m, it will take Svetlana's hair to grow so it is at least 7 centimeters long.

## JS:
	var answer = []
	 for (var i = 3; i <= 7; i += 1.5) {
	  answer.push(i)
	}
	console.log(answer.length-1)

## Algebra:
	4 * 1.5m >= 7 
	-4        - 4
	1.5m >= 3
	/1.5m /1.5m
	x >= 2

## 2. #
## Algebra:

	53w + 13 < 56w + 16
	-53w     - 53w
	13       < 3w  + 16
	-16						 - 16
	-3       < 3w
	-1 < w

## 3. #
Joey Chestnut is trying to break his own world record for eating the most hot dogs and buns in 10 minutes. He needs to eat more than 72 hot dogs to break his record. After 1 minute of competition, Joey has eaten 10 hot dogs. Joey wants to know the number of hot dogs per minute that he needs to eat for the next 9 minutes to break his own record.

Let d represent the number of hot dogs Joey eats per minute. Write an inequality to determine the number of hot dogs per minute Joey must eat for the last 9 minutes to break his record.

## Algebra:

	9d > 72 - 10
	9d > 62
	/9   /9
	d  > 62/9
	d >= 7

## 4. #
30b + 53 >= 18b - 83


## 5. #
Every day, Katie looks for seashells on the beach. She has 28 shells in her collection. Katie finds 12 more shells each day.
Write an inequality to determine the number of days, d, it will take Katie to collect over 100 shells.

## JS
	var shells = []
	 for (let d = 28; d < 100; d += 12) {
	  shells.push(d)
	 }
	console.log(shells.length)

## JS
	function labDaysLeft(shelfCapacity, shellsPerDay){ 
	 var shells = []
	 if (shelfCapacity > 0) {
	   for (let i = 28; i < shelfCapacity; i += shellsPerDay) {
		shells.push(i)
	  }
	 } 
	 console.log(shells.length)
	}
	labDaysLeft(100, 12)

## Alegebra:
	12d > 100 - 28
	12d > 72
	/12  /12
	d   > 6

## 6. #
55c + 13 <= 75c + 39

## 7. #
Mrs. Morton has a special reward system for her class. When all her students behave well, she rewards them by putting 3 marbles into a marble jar. When the jar has 100 marbles or more, the class has a party. Right now,the jar contains 24 marbles.

Let r represent the number of additional times the class is rewarded. Write an inequality to determine how many more times the class needs to be rewarded in order to earn a party.

## JS
	function marbleParty(currentMarbles) {
	 var days = []
	  for (let i = currentMarbles; i <= 100; i += 3) {
	    days.push(i) 
	  }
	  return days
	}
	marbleParty(24)
	// 26

## Algebra
	3r >= 100 - 24
	3r >= 76
	/3r  /3r
	r >= 25.33
	r = 26

## 8. #
	12t - 2 < -5t + 36
	+5t      + 5t
	17t - 2 < 36
			+ 2  + 2
	17t     < 38
	/17      /17
	t       < 38/17  

## 9. #
	-42v + 33 < 8v + 91
			- 33      - 33
	-42v      < 8v + 58
	-8v       - 8v
	-50v      < 58
	-1(-50v)  < -1(58)
	50v       > -58
	v > -58/50
	v > -29/20

## 10. #
	8m + 95 < -87m + 5
		-  5        - 5
	8m + 90 < -87m
	-8m       -8m
	90      < -95m
	-1(90)  < -1(-95m)
	-90     > 95m
	/95     > /95
	-18/19  > m
# KATA Training
* Code Challenges from Codewars.com community.
## Reverse Words
* Write a function that reverses words in a string
* Example: "this is test" returns "test is this" 
## Reverse Words
    function reverseWords(string) {
	  var answer = []
	  string.split(' ')
	    for (let i = str.length-1; i >= 0; --i) {
	      answer.push(str[i])
	    }
	    answer.join(' ')
	    return answer	
	 }

	 function reverseWords(string) {
	  return string.split(' ').reverse().join(' ')
	 }

	 // see how reverse() can be achieved with the backwards loop? When looping backwards, maybe reverse() can be called to simplify the task.
## Min & Max Functions

## Fake Binary

## Count By X

## Get The Mean of Array

## Highest and Lowest

## Transportation on Vacation

	function baseCost (days, rates) {
	  return days * rates
	}
	function discountRates (days) {
	  if (days >= 7) {
	    return 50
	  }
	  else if (days >= 3) {
	    return 20
	  }
	  else {
	    return 0
	  }
	}
	function rentalCarCost(days) {
	  return baseCost(days, 40) - discountRates(days)
	}

## Switch it Up! --Switch statement practice
The initial switch statement was long and spelled-out

    function switchItUp(number){
      switch (number) {
	   case 0:
	   number = "Zero"
	   break;
	   case 1: 
	   number = "One"
       break;
							etc...

      return number
      }
The refactoring was revealing, as the array indices can be used to achieve the case condition: 

    switchItUp = (n) => {
	  return ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"] [n]
	}

Too Simple!