---
layout: post
title: Aaronson Oracle
chapter_number: 2
description: "a game that uses the power of statistics to predict which key the player will press next. Can be converted into an unstoppable Rock/Paper/Scissors machine."
permalink: /book/projects/2-aaronson-oracle
---
In his book, *Quantum Computing Since Democritus*, Professor Scott Aaronson tells a story:

> In a class I taught at Berkeley, I did an experiment where I wrote a simple little program that would let people type either “f” or “d” and would predict which key they were going to push next. It’s actually very easy to write a program that will make the right prediction about 70% of the time. Most people don’t really know how to type randomly. They’ll have too many alternations and so on. There will be all sorts of patterns, so you just have to build some sort of probabilistic model. Even a very crude one will do well. I couldn’t even beat my own program, knowing exactly how it worked. I challenged people to try this and the program was getting between 70% and 80% prediction rates.
>
> Then, we found one student that the program predicted exactly 50% of the time. We asked him what his secret was and he responded that he “just used his free will.”

The "probabilistic model" that Prof. Aaronson used to befuddle his students was in fact an elegant computer program that has become known as an *Aaronson Oracle*. In this project we’re going to build an Aaronson Oracle of our own that runs in the terminal. It’s going to bamboozle your friends and family, and it will even bamboozle you. Once we've finished writing a basic oracle then we’ll take the concept even further than Aaronson ever did, and adapt it to predict your opponent's RoShamBo (aka Rock Paper Scissors in some countries) throws. Armed with this RoShamBoracle you’ll be able to win any dispute, so long as you can convince your opponent to play best of 200 and to allow you to use your computer as a stand-in ringer.

## How does an Aaronson Oracle work?

In order to predict which key the user/victim will press next, an Aaronson Oracle starts by looking at their last five keypresses (for example, `ooiio`). The Oracle then analyzes the user's keypress history to work out which key the user usually follows this sequence of recent keypresses with. Finally, the Oracle predicts that the user will press their normally-favored key this time too. For example, if the user has historically gone `ooiio-i` 6 times and `ooiio-o` 8 times, the oracle guesses that their next keypress will be `o`.

Our RoShamBoracle will work on the same principle as the vanilla Aaronson Oracle. We'll look back at our user's last five Rock/Paper/Scissors choices, and check what choice they usually followed this sequence with. Then we'll use this information to choose the optimum counter-move.

Here's a mindblower - it's possible for our program to believe that our opponent is 60% likely to go Paper, but for the theoretically optimum strategy not to be Scissors. Stay tuned to the end of the project to find out how this seeming impossibility can arise.

## Getting ready

As always, we'll start by talking about the structure of the project and the milestones that we'll break it down into. But before we do, spend a few minutes thinking about the project on your own. Even though you don't get much help in Programming Projects for Advanced Beginners, it's still important to begin each project with a period of completely independent contemplation. Everything seems obvious with hindsight, and there's no substitute for exercising your powers of autonomous reasoning, untainted by even the outline of a hint. I'll still be here once you're done pondering the project, and I won't laugh or tell anyone if your choices are different from mine.

If you finished the previous Project Builder project, use it to build yourself a new skeleton directory. Start scribbling in the `NOTES.md` file. First, what extra features would *you* like to add to the program once we're done with the first version? Would you like every new player to enter their name? Would you like to write out the game data or high scores to text files, or even to a database? Would you like to create an ASCII art title screen?

```
 _______  _______  _______  _______  _        _______  _______  _       
(  ___  )(  ___  )(  ____ )(  ___  )( (    /|(  ____ \(  ___  )( (    /|
| (   ) || (   ) || (    )|| (   ) ||  \  ( || (    \/| (   ) ||  \  ( |
| (___) || (___) || (____)|| |   | ||   \ | || (_____ | |   | ||   \ | |
|  ___  ||  ___  ||     __)| |   | || (\ \) |(_____  )| |   | || (\ \) |
| (   ) || (   ) || (\ (   | |   | || | \   |      ) || |   | || | \   |
| )   ( || )   ( || ) \ \__| (___) || )  \  |/\____) || (___) || )  \  |
|/     \||/     \||/   \__/(_______)|/    )_)\_______)(_______)|/    )_)
                                                                        
 _______  _______  _______  _______  _        _______                   
(  ___  )(  ____ )(  ___  )(  ____ \( \      (  ____ \                  
| (   ) || (    )|| (   ) || (    \/| (      | (    \/                  
| |   | || (____)|| (___) || |      | |      | (__                      
| |   | ||     __)|  ___  || |      | |      |  __)                     
| |   | || (\ (   | (   ) || |      | |      | (                        
| (___) || ) \ \__| )   ( || (____/\| (____/\| (____/\                  
(_______)|/   \__/|/     \|(_______/(_______/(_______/                  
```

It doesn’t matter if your ideas are good or bad or half-baked or over-baked. Just make sure you write them down. We're going to talk together about all of these choices and details in just a few paragraphs, but now's the time to explore on your own. Bathe your mind in the project a little. Splash around.

Next, start to think about how you might structure the code. Scribble down any tiny tidbits that come to you. How can we keep asking the user for input through repeated and repeated rounds of the game? How can we store their input history so as to make it easy to make predictions with?

Scribble down questions that you don't know the answer to. What should you do if the player has never gone `oioio` before? What should you do if they've gone `oioio-o` the same number of times as they've gone `oioio-i`? Even if you're not sure what the best thing to do is, what are some options?

Mull over the user experience. Should the user have to press `Enter` in between each character? What should happen if the user inputs two characters at once? What should happen if they input an invalid character? There's no right answer to any of these questions - you get to choose. What are the options? What's the simplest thing we could do in order to get started?

Finally, come up with some milestones. Remember, milestones are your interim goals along the way to your full vision. What condensed but ever-expanding versions of the program can you imagine that would demonstrate new parts of the project working? Even if you don't think you can come up with a full set of milestones, start by just coming up with one. Actually, I'll give you the first one. You come up with a second:

> 1. Repeatedly read input characters from the user until they input `x`. When they do, exit the program

```
$ python3 aaronson_oracle.py
o
i
o
i
i
x
Exiting...
$
```

What could milestone 2 be? What are the options? What about milestones 3 and beyond?

## My Milestones

Here are the milestones I came up with:

1. Repeatedly read input characters from the user
2. After every input, print out the last 5 characters that the user has entered
3. Design a data structure to store our model's data. This data structure will store the information necessary for us to easily answer the question "for a given combination of 5 characters, how many times did the user next press each character?"
4. After every user input, update our model with their new input
5. Before every user input, use our model to predict which character they will input next
6. Keep a running tally of the number of times the model was right, the number of times it was wrong, and the number of time it declined to guess

Once these milestones are complete we'll work on some extensions:

## Extensions

1. See how our model performs when trying to predict the choices of a random number generator
2. Show the player statistics on what their most predictable combinations of keys are (eg. When you go “oiiii” you follow with “o” 85% of the time)
3. Anything else you think would be cool
4. `TODO: write a program to defeat the oracle`

Then you can go off into the sunset and work on some super-extensions yourself:

## Super-Extensions

4. Adapt our model to beat humans at RoShamBo. `TODO: update intro if I actually don't help the reader with RoShamBo`
5. Write a second model that exploits weaknesses in our first model to generate choices that will *beat* it

Let’s begin.

## 1. Repeatedly read input characters from the user until they input `x`. When they do, exit the program

I often like to start work on a program by writing the code that accepts input from the user. Even if I don't yet do anything with the input, starting here gives me an early sense for how the program will feel to use. It makes the program feel real and functional right from the moment it is born. This is just a personal preference, however; there's no reason you have to take the same attitude in your own projects.

In this milestone we're going to repeatedly read input characters from the user. The user will press `Enter` in between each input. We won't validate or otherwise do anything with their input, unless they input `x`, at which point we will exit the program.

By the end of the milestone our program should work like this:

```
$ python3 aaronson_oracle.py
o
i
o
i
i
x
Exiting...
$
```

Make sure that our program behaves as expected before you move on to the next milestone.

## 2. After every input, print out the last 5 characters that the user has entered

In order to ask the question "which character does the user usually input next after their most recent sequence of inputs?" we first need to know what those recent inputs were. The output of this milestone will look quite silly when we run our program, but it will nonetheless demonstrate a key piece of our program's internal logic:

```
$ python3 aaronson_oracle.py
o
Last 5 chars: o
i
Last 5 chars: oi
i
Last 5 chars: oii
i
Last 5 chars: oiii
o
Last 5 chars: oiiio
o
Last 5 chars: iiioo
```

Keep track of all the user's inputs in an array variable called something like `history`, and print out the last 5 characters from this array when required.

Behind this seemingly innocuous task lies a lot of depth and intrigue. Let's discuss some design decisions we need to make.

### Design decisions

#### How much history should we store?

We're not going to use any history beyond the most recent 5 inputs any time soon. So should we just store the user's last 5 inputs, or their entire input history?

I like to start with the simplest possible approach, and to structure my code so that I have the option to easily change my mind in the future. This isn't cheating, it's just good practice. In this situation, I think that the simplest approach is to store the user's entire input history in an array, and pull out the last 5 elements from this array as and when we want to print our `Last 5 chars` output.

An alternative, somewhat more complex approach would be to throw away every user input beyond the 5 most recent inputs. This would be a more scrupulously efficient thing to do, since maintaining an array of the user's entire input history will mean that our program requires more *RAM* (also known colloquially as *memory*) to store this extra data in.

However, optimizing the memory usage of our program at this stage in its life would be a perfect waste of time. Assuming we're running the code on a relatively modern computer, we have room to store - literally - billions of inputs before we start having to worry about running out of memory. (I arrived at this estimate by assuming that each character takes up 1 byte of memory. My several-year old MacBook has 16 gigabytes of RAM, and there are roughly 1 billion bytes in a gigabyte. This suggests that we have enough memory to store billions of characters.)

If, on the other hand, we were working on an ancient computer with only a few *kilobytes* of RAM then we would indeed need to be much more judicious about how much data we retained. But even then our best plan would be to sell our antique machine on eBay and to spend the proceeds on a new, more powerful laptop. The abundance of system resources inside modern computers is a boon that you should take advantage of, not feel guilty about. Don't worry about optimizing your code unless:

* It's slow or heavy enough to materially worsen your quality of life
* It's running at massive scale inside a large company, and saving resources could save a significant amount of money
* It's trivial to optimize - for example, all you have to do is swap out one method for another
* You want to optimize your code for fun or practice. You understand that doing so is, from a practical point of view, a complete waste of time

#### How should we deal with invalid input?

What should happen if the user inputs two characters on one line? And what should happen if they input a character other than `o` or `i`?

The simplest solution, and the one that I think we should start with, is to ignore such inputs entirely and ask the user for another character. In the future we might want to do something fancier; maybe if the user inputs multiple characters on a line then we pick the first valid character and treat that as their input, or maybe we even pick out every valid character and treat each as a separate input.

For now, let's start with the simplest thing that gets our program working, but leave ourselves flexible and open for the future.

#### Should we store invalid inputs in our history array?

We've decided that we're going to ignore invalid inputs. Should we still add these inputs to our history array?

In my opinion, the answer is no. This is for two reasons. First, we aren't going to use the history of invalid inputs for anything. I've just said that we shouldn't be squeamish about using up memory, but this doesn't mean that we should store entirely spurious data that we're never going to need.

Second, our code will be simpler if our history array only contains valid inputs. This is because we won't have to worry about filtering out invalid inputs whenever we want to retrieve information from it. "Get the last 5 inputs" is a markedly simpler operation than "Get the last 5 inputs, but skip out the invalid ones".

There is almost nothing that could make me compromise on the requirement that our history array only contain valid inputs. Suppose that in the future we decided to attempt to extract valid characters from invalid inputs, as mentioned briefly above (for example, parse out the first valid character in a multi-character input and use that). To allow this we should convert the invalid input into valid characters(s), and store only these converted values in our history array.

Alternatively, suppose that we decided to give our players an accuracy score, telling them how many times they gave us valid or invalid inputs. This would require us to store both valid and invalid inputs, so that we can analyze both. In this situation we should maintain two arrays - one for the processed, valid history and another for the unprocessed, raw inputs. Will this cause us to store a lot of duplicate data? Sure, but so what? Memory is cheap, but you can't put a price on clean code.

## 3. Design a data structure to store our model's data

Strictly speaking, our history array is the only data structure that we need in order to make predictions about which key our player will press next. In theory, after every input we could go through the entire history array, looking for instances where the user inputted the same 5 characters in a row that they just inputted. We could check which character the user inputted following these sequences, keep tallies, and use the results to make a prediction.

This would certainly work, but I don't think it's what we should do, for three reasons. First, it would require us to scroll through the entire array for every prediction that we want to make. Repeatedly going through the entire array is an unnecessary waste of time that will slow our program down. That said, the slowdown is admittedly unlikely to be perceptible to a human user unless our array gets enormous. I doubt that we would see any noticable decrease in our program's speed until the user had inputted tens of thousands characters, if not more.

Second, this approach doesn't produce any easily analyzable output. In the extensions section we're going to show our user what their most predictable sequences are in an attempt to help them get better at behaving randomly. If we made every prediction from scratch, as outlined above, then we'd have no intermediate model data that we could use to produce such analyses. Instead, we'd have to write another function that did all this analysis from scratch too.

Third, I think there's an alternative approach that is simpler, faster, and more amenable to analysis. I think we should store our data in a *nested map* (sometimes instead called a *nested dictionary* or *nested hash*, depending on the programming language). This *data structure* will look like this:

```
{
    'ooooo': {
        'o': 5,
        'i': 4
    },
    'ooooi': {
        'o': 10,
        'i': 3
    },
    # ...etc...
}
```

The keys of the top-level map are strings representing a sequence of 5 inputs. The values of the top-level map are themselves also maps (hence "nested maps"), in which the keys are the possible next inputs, and the values are the number of times that the user has chosen this input.

We will retrieve information from this data structure by accessing each map in turn. For example, to find the number of times that the user has followed `ooiii` with `i` we would write:

```python
model_data['ooiii']['i']
```

To keep our model up to date, after every user input we will increment the relevant number in the model. Because we do this hard work up front, making a prediction becomes as easy as pulling out the pre-computed numbers for `o` and `i` from the model and seeing which is bigger.

### How should we initialize the data structure?

"OK, makes sense, I'll just go and..." Wait, there's so much more for us to discuss! For example, when we initialize our program, should we pre-populate the `model_data` structure with zero values for every possible sequence of inputs?

```
{
    'ooooo': {
        'o': 0,
        'i': 0
    },
    'ooooi': {
        'o': 0,
        'i': 0
    },
    # ...etc...
}
```

Or should we initialize `model_data` as an empty map and *lazily* initialize keys for historical sequences as we see them?

```python
model_data = {}
if last_sequence not in model_data:
    model_data[last_sequence] = {
        'o': 0,
        'i': 0,
    }
```

Both approaches will work, but I prefer the latter because it's simpler.

### Wraping the data structure in a `ModelData` class

If we wanted to be really fancy (and why not, it's the weekend), we could wrap all of this logic up inside a *class* called something like `ModelData`. This class would take care of storing and retrieving the model data, and would expose simple, convenient methods that the rest of the program can use to query it. The rest of the code wouldn't have to care *how* it manipulates the data behind the scenes, and the less different parts of your code have to know about each other's internal details, the better.

`ModelData` would need a method called `add` for adding new data, and a method called `get` to retrieve data. We would also be well advised to include a method called `all` that returns all the internal data, mostly for use in debugging. In pseudo-code, `ModelData` might look like this:

```python
class ModelData:

    def initialize():
        # self.data is the nested map, structured as
        # discussed above, that will store all of our
        # data. The data will be accessed using the
        # other methods on the ModelData class
        self.data = {}

    def add(previous_sequence, next_value):
        # Increment the count for `next_value` following
        # `previous_sequence` by 1. Initialize a new
        # element in `self.data` if necessary.

    def get(previous_sequence, next_value):
        # Pull the count for `next_value` following
        # `previous_sequence` off of `self.data` and
        # return it. Make sure to return 0 if we have
        # never seen `previous_sequence` before.

    def all():
        # Returns the raw `self.data` nested map. Mostly
        # useful for debugging.
```

It would be used like so:

```python
model_data = ModelData()
model_data.add('ooooo', 'o')
model_data.add('ooooo', 'o')
model_data.add('ooooo', 'i')

print(model_data.get('ooooo', 'i'))
# => 1
print(model_data.get('ooooo', 'o'))
# => 2
print(model_data.get('oioio', 'i'))
# => 0
```

We will make sure that the `ModelData` class takes care of all of the plumbing involved with storing and retrieving data. If the class's `add` method is called with a value of `previous_sequence` that it has never seen before, the class will be responsible for initializing a new entry in its internal data store. If the class's `get` method is called with a value of `previous_sequence` that it has never seen before, the class will be responsible for making sure to return `0`, rather than throwing an exception.

By centralizing and hiding all this logic inside a `ModelData` class, we simplify the rest of our code. The rest of our code doesn't need to know or care about the exact data structure we are using to store our model data, or how to safely interact with it. All it needs to know is that you call `model_data.add` to increment a value and `model_data.get` to retrieve one.

What's more, this separation of logic means that we can change the way in which we store data inside the `ModelData` class without having to change any of the rest of our code. For example, suppose that we wanted to store our data in a database instead of in an *in-memory* nested map. This would have the advantage that we would no longer lose all of the data we had accumulated when our program exited. We could ask the user for their name when they start playing the game, and label their inputs in our database with their name. When the user logs back in (we could add a password system so that they have to prove their identity), we can load back their old input data so that we can make better predictions faster, rather than starting again from nothing. Idea for an extension project - do all of that.

To make this change, we would only have to update the `ModelData#add` and `ModelData#get` methods. `ModelData#add` would need to store and increment its numbers in a database, instead of an in-memory nested map, and `ModelData#get` would need read its numbers from this database. Since the *interface* of the `ModelData` class and its functions wouldn't change, none of the rest of our code would have to change either. As far as the rest of our code is concerned, it still provides the `ModelData` methods with the same arguments and receives back the same return values. What those methods do internally is their own private business.

To take things yet another step further, we could define two different classes that each implement different storage mechanisms. `SQLiteModelData` could store its data in a `sqlite` database, and `InMemoryModelData` could store its data in-memory. Since both classes *conform to the same interface* and look the same to the outside world, we could swap them out for each other and completely change the backend behavior of our program simply by changing a single line of configuration.

```python
if data_store_type == 'in_memory':
    model_data = InMemoryModelData()
elif data_store_type == 'sqlite'
    model_data = SQLiteModelData('oracle.db')
else:
    raise Exception("Unknown data_store_type!")

model_data.add('ooooo', 'o')
print(model_data.get('ooooo', 'i'))
```

In a large, complex codebase, separating out pieces of functionality and hiding them behind *interface boundaries* like this is critical for keeping the code readable and maintainable. However, in our relatively short - for now - Aaronson Oracle program, it would be perfectly reasonable and pragmatic to decide that all this talk of classes and interfaces smells like over-engineering. There would be nothing wrong with taking the simpler approach of having the main program code work with the nested map directly, instead of via a `ModelData` class. If things starts to get messy then we can always refactor our code later to use the `ModelData` class approach.

However, even if this is how you feel, I'd still suggest that you give the `ModelData` class approach a shot if you feel able. I think that this is a good opportunity to practice working with classes and interfaces, and to see their benefits first hand. If the class doesn't work out then you can go back to working with the nested map directly, no harm done.

## 4. After every user input, update the model with the new input

We've gone to all the effort of designing a data structure to store our model data - now let's use it.

Every time you get a new input from the user, update the model by incrementing the count of the number of times the previous sequence was followed by the new input character.

### Testing

When I was working on this project myself I made sure that my code was working by printing the full model data structure after each input. For example:

```
$ python3 aaronson_oracle.py
o
{}
i
{}
o
{}
i
{}
i
{}
o
{'oioii': {'o': 1, 'i': 0}}
i
{'oioii': {'o': 1, 'i': 0}, 'ioiio': {'o': 0, 'i': 1}}
x
Exiting...
$
```

Make sure that your code is working too.

### Edge cases

#### First five inputs

You may notice that for the first five inputs that the user gives us we don't have a previous sequence of five inputs to update our model with. I think that we should therefore not update our model for these inputs and should write them off as a warmup.

## 5. Before every user input, use our model to predict which character they will input next

The payoff of our program is upon us! We already have all the data that we need, and in this milestone we'll use it to predict our user's future inputs.

Update our code so that, just before the user gives us an input, we use our model to predict what that input will be. For now, print the prediction to the terminal to help with debugging. We'll of course turn this off once the program is complete - we don't want to give the game away to our user.

### Edge-cases

Stop for a second before you keep reading. What *edge-cases* might we encounter, and what are our options for dealing with them?

`TODO: move this higher up`
The term *edge-case* is not rigorously defined. Most people, including me, use it to mean "something weird that I didn't think of but isn't my fault because it's so weird stop looking at me like that". In our situation I would define normal, "central-case" operation as a situation in which the user has already given us at least 5 inputs, and has historically followed their most recent 5 inputs with one input more than another. For example, suppose that their last 5 inputs were `iiooo`, and they have previously followed this sequence with `o` 4 times and `i` 6 times. It's easy for us to predict that their next input will be `i`.

But things won't always be this vanilla. What other, odder situations might we encounter? I can think of three - see if you can come up with them yourself before reading on. What could we do about them?

The edge-cases I'm worried about are when:

* It is the very start of the game, and the user has not yet given us 5 inputs
* The user has given us more than 5 inputs, but it is the first time they have given us their most recent sequence
* The user has inputted their most recent sequence before, but they have followed it with `o` and `i` an equal number of times

In all three of these situations we will be unable to make an intelligent prediction, because from our point of view `o` and `i` are both equally likely next choices. What should we do?

I see three options:

1. Hardcode to always predict `o`
2. Randomly predict `o` or `i`
3. Decline to make a prediction at all

Let's discuss each of these solutions in turn.

Solution 1 - "Always predict `o`" - is not a good idea. It unnecessarily introduces bias into our program, and makes it easier for a sneaky player to outwit us.

Solutions 2 and 3 - "Randomly predict `o` or `i`" and "Decline to make a prediction at all" - are both reasonable approaches. Which one we prefer depends on the user experience that we want to present to our player. Do we want to keep it simple and always present them with a prediction, even if this prediction is occasionally random? Or do we want to be more scrupulously precise by only making predictions when we have the data to do so, even if this means that we occasionally chicken out?

This isn't a technical decision with a single right answer - it's a product decision that you get to make based on whatever your heart tells you.

Interestingly, regardless of whether we decide to handle these toss-up situations by making a random prediction or declining to make a prediction at all, I would like us to write our code in a similar structure. In particular, I'd like us to separate the code that attempts to make a prediction from the code that decides what to do if we can't make one. Doing so will make our code tidier and easier to update if we change our mind.

To start with, I would like us to put our prediction code inside a function called something like `get_prediction`. This function should:

* Accept 2 arguments: our model data and the user's most recent inputs
* Return a prediction for what key the user will press next, or `None` if it believes that both characters are equally likely

```python
def get_prediction(model_data, previous_sequence):
    # Returns a prediction, or None
```

Once we've done this we should take the output of `get_prediction` and handle separately the cases where it was or was not able to make a prediction. A code snippet that makes a random prediction when `get_prediction` draws a blank might look like this:

```python
prediction = get_prediction(model_data, previous_sequence)

if prediction is None:
    prediction_to_display_to_user = get_random_prediction()
else:
    prediction_to_display_to_user = prediction

print("I predict: " + prediction_to_display_to_user)
```

On the other hand, a snippet that admits when it doesn't know what the user is going to do might look like this:

```python
prediction = get_prediction(model_data, previous_sequence)

if prediction is None:
    print("I don't know")
else:
    print("I predict: " + prediction)
```

Notice how the code that gets the prediction (`prediction = get_prediction(model_data, previous_sequence)`) doesn't change between the two snippets - all that changes is the code that handles its output. This is a good indication that the functionality of our program is well-separated into discrete components, and is a good example of what I mean when I say that I try to keep my code *flexible*.

The most obvious alternative to splitting our code up in this way would be to have `get_prediction` itself generate a random prediction if it can't make a useful guess. In extremely sketchy pseudo-code this would be:

```python
def get_prediction(model_data, previous_sequence):
    if can_make_prediction:
        return that_prediction
    else:
        return get_random_prediction()
```

However, I prefer our approach because:

* It cleanly separates the prediction logic from the game logic. `get_prediction` is like a pure scientist trying to understand the world and reporting its raw findings. The rest of the code is like a businessman who decides how to use the scientist's unprocessed output to create a fun game.
* It gives us greater flexibility in the future. For example, we could easily update the above code to display our overall prediction accuracy to the user (including our random guesses), but internally keep track of our prediction accuracy based on only those occasions where we were able to make an intelligent guess

### Testing

This milestone is hard to exhaustively test manually. Our code has to deal with many different scenarios, including all of the edge-cases that we have just spent so long discussing. For now, test our code by feeding it a few scenarios for which it's easy to know what to expect. For example, it's clear that if you keep inputting `iiiiiiiiiiii` then our model should keep predicting that your next input will be `i`.

Our program is already awkward to test manually, so think about how nightmarish it must be to manually test even larger programs with even more combinations of inputs. "OK it works if I click 'Like' then 'Comment', but what about if I click 'Comment' then 'Like'?" And whilst manual testing is still an important part of verifying the behavior of complex programs, you can't expect it to catch everything.

Most large programs are therefore validated using *automated testing*. In automated testing, you write test code that loads your main program, exercises the code by feeding it carefully chosen inputs, and programatically verifies that the output is what you expected it to be. For example, we could write a *test case* that simulated a user repeatedly inputting `iiiiiiiiiiii`, and made sure that our code predicted that the next input would be `i`.

```python
# Lots of additional code required to make this work,
# but this is the general idea:
feed_inputs(['i', 'i', 'i', 'i', 'i', 'i', 'i'])
next_prediction = get_next_prediction()
expected_next_prediction = 'i'

if next_prediction == expected_next_prediction:
    print("PASS")
else:
    print("Test failed. Expected {expected_next_prediction}, got {next_prediction}")
```

We could write test cases that run through other scenarios too. Then, when we want to validate our code, all we have to do is run our *test suite*. A few milliseconds later, we see which of our tests have passed, which have failed, and whether we have any bug-fixing to do. Testing libraries take care of a lot of the infrastructure around making assertions, so that we don't have to write our own if-statements whenver we want to verify an output. These libraries also collect and display test failures for us.

However, that's all a story for another project. For now, do enough manual testing to satisfy yourself that our code is working as expected.

## 6. Keep a running tally of the number of times the model was right, the number of times it was wrong, and the number of time it declined to guess

This is the final milestone in the first phase of our project. By the end of it we'll have a program that reads in our user's button-mashes, makes predictions about how they will button-mash in the future, and tells them how accurate our predictions are.

Even though this is the final milestone in the project, it's also rather simpler than many of the preceding ones. Make guesses, get inputs, keep track of whether you were right, and print out the results as you go. I displayed my results as below, but you can do anything you like:

```
$ python3 aaronson_oracle.py
i
RIGHT: 0% WRONG: 0% NOGUESS: 100%
i
RIGHT: 0% WRONG: 0% NOGUESS: 100%
i
RIGHT: 0% WRONG: 0% NOGUESS: 100%
i
RIGHT: 0% WRONG: 0% NOGUESS: 100%
i
RIGHT: 0% WRONG: 0% NOGUESS: 100%
i
RIGHT: 0% WRONG: 0% NOGUESS: 100%
i
RIGHT: 14.3% WRONG: 0% NOGUESS: 85.7%
x
Exiting...
$
```

## Extensions

TKTK
