---
layout: post
title: Project Creator
chapter_number: 1
description: "a program that automatically sets up files and folders and writes the boilerplate code for all of our other projects"
permalink: /book/projects/1-project-creator
---
{% raw %}
We're going to build a lot of projects in this book. From an ASCII Art Creator to an Infinite Sentence Generator, they're going to be as different and varied as you can possibly imagine (within reason).

Nonetheless, these projects will all have similar structures. They'll have a file of code that you run, maybe some other files of code that the first file imports, a README describing how the project works and how to use it, and a TODO list of things you want to do next.

You and I are both busy people with places to be and no patience for drudgerous repetition. So for our first project, we're going to build a tool that creates the skeleton structure of all our other projects for us. Once it's finished, we'll use it to set up future projects, like so:

```
$ python3 main.py
> What is your project called?
robs-secret-project
> Who is the author?
rob
> Created robs-secret-project/
> Created robs-secret-project/README.md
> Created robs-secret-project/TODO.md
> Created robs-secret-project/main.py
> Done!
```

In this example, our tool created a new directory called `robs-secret-project`. In this new directory it created files called `README.md` and `TODO.md`, which contain skeleton information about the project.

```
+--robs-secret-project
   |--README.md
   |--TODO.md
   +--main.py
```


Our tool even created a skeleton code file called `main.py`, which contains the boilerplate code that we need in order to start programming immediately:

```python
if __name__ == "__main__":
    print("Welcome to robs-secret-project")
```

If you think about it, this means that we're going to write code that is itself going to write code. And if that's not a delightful way to start a book then I don't know what is.

---

Before we start programming, let's talk about how we're going to plan and break up our work into *milestones*.

## Milestones

Pretend that you're building a house. If you're a house-builder of any competence (for the sake of this example assume that you are), then you wouldn't try to build every piece of this house at the same time. Instead, you’d plan out the project; break it down into small chunks; and then work through each chunk one at a time. You’d build the foundations, check that they work, build the walls, check that they work. At this point my knowledge of how to build an actual house breaks down, but I think that the principle is clear and I can now safely draw an analogy with computer programming.

Like houses, computer programs are easier to create if you break them up into small, testable *milestones* that allow you to focus on doing one thing at a time. You can build up your complex program one simple milestone after another, giving each milestone the focus it requires. After each milestone you can make sure that everything works as expected, making bug-hunting and -squashing a cinch.

Taking this kind of methodical approach is quadruply important when working on corporate codebases with hundreds and thousands of people working on them. But it is still absolutely critical for the smooth success of one-person (two-person if you count me) projects like ours. This isn’t cheating, it’s just good technique.

## What is a milestone?

Pretend once again that you're building a house. Your end goal is, of course, to have a finished house; your milestones are your interim goals along the way. For example "Get planning permission", "Complete foundations", "Build first wall" and so on. Milestones give you and everyone else involved in the project short-term focus. You might still get the house finished eventually if you instead came each in each day, worked on whatever you feel like, and tested that everything mostly worked as expected once everything was finished. But that's not a house that I'd feel comfortable living in or paying you to build.

## How can you devise milestones for your project?

Milestones don't need to be particularly impressive on their own. They just need to get your project one step closer to realization. Milestones should have clear *completion conditions* - either something new that your program can do ("ask the user for input, process it, and save it to the database") or something very specific about the way in which your code has changed ("move all code related to the AI logic into a `Player` class"). It should be very clear when a milestone can be considered completed and you can move onto the next one.

## Project Creator milestones

Let's come up with some milestones for the Project Creator.

Milestones don't need to be large and profound. In fact, it's best if they're small and boring. In our project, a good, dull place to start might be:

> .1. Ask the user for the name of the project and the author. Print this information back out to the terminal.

This is something new that our program *does*, and that we can test. It's a small milestone, but that's OK - it's much better to make your milestones too small than too large. "1. The program works and is finished" is not a good milestone.

We'll follow this with our second milestone:

> .2. The program creates a new directory named after the user's project

Once again, this milestone is something that our program does, and something that we can test. The next milestone is where things start to get spicy:

> .3. The program creates a `README.md` file inside the new directory, containing information about the project and the author

We'll eventually want to create many new files inside our directory, but our third milestone focusses on creating just one. We'll make our program capable of creating one file, then fix all the bugs that will this will inevtiably spawn, then give ourselves one pat on the back and call the milestone complete. This is a better approach than trying to immediately create three files, because that would give us something extra to worry about.

That's another good way of thinking about milestones - "reduce the number of things you have to think about at any one time".

If we wanted to break our third milestone down even further (good idea by the way, you're getting the hang of this), we could crack it into:

> 3a. Create a `README.md` file inside the new directory, containing the hardcoded word "hello"
>
> 3b. Create a `README.md` file inside the new directory, containing information about the project and the author instead of the hardcoded word "hello"

Explicitly breaking up the milestone in this way means that we aren't playing whack-a-mole trying to fix bugs in both the code that creates our `README.md` file and the code that formats its contents.

Next, we have several options for what our fourth milestone could be. We're going to eventually have our program create multiple skeleton files, and I'd like us to do so using *template files*. Our template files will contain outlines of what we want the output files to look like, with placeholders left for information that our program needs to fill in. For example, a template file called `README.md.template` might start something like this:

```
## Welcome to {{ project_name }}!

Created by {{ author_name }}
```

Our code will read this template file, fill in the placeholders, and write the result to an output file. We'll talk much more about the details of how templates work later.

Right now our program creates a single file that it formats using whatever string manipulation was closest to hand in milestone 3. By the end of our program we want it to be able to create multiple files using templates. Milestone 4 could therefore either be to:

* Create multiple files (`README.md`, `TODO.md`, `main.py`, etc) using our current, non-templated approach
* Or create the same single `README.md` file, but this time using a new, refactored template approach.

Both of these goals would be entirely reasonable next milestones. However, I have a mild preference for the second option - refactoring our existing code to use a template. This is because I think that this task reduces *uncertainty* in our project more than the first option. Let's discuss what I mean by this and why I think it matters.

### Uncertainty

In a software project, or indeed any other type of project, there is always uncertainty over whether your plan is a good one. This uncertainty comes in many forms, including:

* Product uncertainty - is your desired goal even a good idea?
* Technical uncertainty - will your technical plan work?
* Team uncertainty - are you or your team able to execute on the plan?

It's desirable to reduce uncertainty as much as possible, as fast as possible. Doing so allows you to change your plans sooner rather than later if you encounter new, surprising information, without having to throw away too much wasted work. For now let's focus on reducing our project's *technical uncertainty* by getting as much new information as possible about whether our technical plan will work or not. How much does each of our two possible next milestones decrease technical uncertainty?

Our first possible milestone is "Create multiple files using our current, non-templated approach". I don't think that completing this milestone would reduce our technical uncertainty very much. We can already be relatively certain that the approach we used to create one file will also allow us to create two more. It will take time and effort to implement, but it will definitely work. This means that taking our code that creates a single file and using it to create multiple files will not give us much new information, and so will not reduce our technical uncertainty.

Our second possible milestone is "Create the same single `README.md` file, but this time using a new, refactored template approach." By contrast, I think that completing this milestone would substantially reduce our technical uncertainty. This is because I think that templating is more likely to throw up a technical challenge that we hadn't previously considered. Maybe we'll find that templating libraries don't work in the way that we think, or that they're too fiddly to get setup correctly. Even if our original plan turns out to be sound, proving that it is will allow us to commit to it more wholeheartedly and to seleep more soundly at night. This means that successfully adapting our code to use template files will give us lots of new information and so will substantially reduce our technical uncertainty.

All of this said, in this particular situation my preference is mild at most. If you would find it satisfying to get our program working end-to-end before going back and *refactoring* it to use templates, then that's an entirely sensible and valid preference too. In fact, focussing on getting a working project as soon as possible, code quality be damned, would reduce our *product uncertainty* (is our desired goal even a good idea?) more than prioritizing template files would. We'll talk more about product uncertainty in future projects. In this particular situation I prefer to focus on reducing technical rather than product uncertainty. We're already committed to finishing this project in it's current form and aren't likely to make any changes to our plans for the functionality of our program until the extensions section. But if you would prefer to add the extra files first then you should do so and feel good about it.

On the basis of this analysis, I'd suggest that for our fourth milestone we go with:

> .4. Refactor our code to format our `README.md` file using a template file

Our fifth milestone can then be the other half of our goal:

> .5. Create a `TODO.md` file and main code file (eg. `main.py`) using template files

I'd also like to tack on a final cleanup milestone before we start working on the extensions:

> .6. Refactor our file creation code into a reusable function

This final milestone will be an interesting one to work on, containing a surprising amount of broadly applicable code-quality techniques.

## Milestone recap

Those milestones again, from 1 to 6:

1. Ask the user for the name of the project and the author. Print this information back out the terminal.
2. Create a directory named after the project
3. Create a README.md file inside the new directory, containing information about the project and the author
4. Refactor our code to format our README.md file using a template file
5. Create a TODO.md file and a main code file using template files
6. Refactor file creation into a reusable function

As I mentioned earlier, notice how most of these milestones are things that our program can *do*, and those that aren't still have clear completion conditions. Either our code uses template functions, or it doesn't. Either it uses a single function to create files, or it doesn't.

With these milestones in hand, let's get programming.

## 1. Ask the user for the name of the project and the author. Print this information back out to the terminal.

In this milestone we'll ask the user for some details about their project. In future milestones we'll use this input as the names for directories and files.

Start this milestone by writing code that reads input from the user, prints it back to them, and exits:

```
> What is the name of your project?
my cool project
> Who is the author of this project?
Steve Steveington
>
> ## PROJECT DETAILS ##
> Project name: my-cool-project
> Author:       Steve Steveington
```

Next, add validation to the user's input to make sure it obeys certain constraints. Let's start with two:

* Project name: contains only letters, dashes and numbers, and is between 1 and 40 characters in length
* Author name: is between 1 and 40 characters in length

At first, if a user's input is invalid, just print `Invalid input!` (or something more friendly and supportive) and exit:

```
> What is the name of your project?
my cool project
> Invalid project name. Exiting.
```

Feel free to add extra rules if you like.

Once you've got this validation working, update your code so that if a user's input is invalid then the program repeatedly asks them to try again until they give us something valid. Map out the logic with pseudo-code if that helps. [Send me a message if you'd like a hint][contact].

Once you're done, make sure that your code works:

```
> What is the name of your project?
my cool project
> Invalid project name. Try again.
my cool-project
> Invalid project name. Try again.
my-cool-project
> Who is the author of this project?

> Invalid author name. Try again.
Steve Steveington
>
> ## PROJECT DETAILS ##
> Project name: my-cool-project
> Author:       Steve Steveington
```

For optional bonus points:

* If the user gives invalid input 3 times in a row then give up and exit
* If the user gives invalid input, tell them why it is invalid. Suggest a valid version of their input

## 2. Create a directory named after the project

Now that our user has told us a little about their project, we can create a directory for it. Use Google to find out how to create a directory in your language - I never remember how to do this kind of thing so I used Google liberally when working through this project myself. Try searching for something like `YOUR_LANGUAGE create directory`.

I'd suggest creating the new directory in the parent directory of our current Project Maker project.

```
projects
+--project_creator (our current project)
   |--README.md
   |--TODO.md
   +--main.py
+--new_project_1
   |--README.md
   |--TODO.md
   +--main.py
+--new_project_2
   |--README.md
   |--TODO.md
   +--main.py
```

You may need to specify the *path* of this new directory using one or more `../` to indicate "go up one directory". As with most things in computer programming, working out how to do this could either be an interesting educational experience or a deeply frustrating one that makes you question what you are doing with your life. If you run into trouble then just let the directory fall where it may and move on with the project and your life.

Finally, print the *absolute path* (Google this term if you haven't come across it before) of the directory you've created in order to let your user know what you've done.

Once this milestone is complete, our program should do the following:

```
What is the name of your project?
> my-cool-project
Who is the author of this project?
> Steve Steveington

## PROJECT DETAILS ##
Project name: my-cool-project
Author:       Steve Steveington

Created directory at /Users/rob/ppab/my-cool-project
```

Use your terminal or Finder to check that the directory you've created really does exist.

## 3. Create a README.md file inside the new directory, containing information about the project and the author

It's good practice to include a `README.md` file with each project that you write. In this file you can explain what the project does, how to use it, and how to install it. README files are often written using *markdown* (that's what the `.md` in `README.md` stands for), which is a convenient way of adding simple formatting to a text file that is well worth doing some quick research on.

You can structure a `README.md` file however you want. I'd suggest that our project creates them in a form like:

```
# $PROJECT_NAME

## Description

TODO

## How to install the project

TODO

## How to run the project

TODO

## Author

$AUTHOR_NAME
```

`$PROJECT_NAME` and `$AUTHOR_NAME` should, of course, be replaced by the values given to you by the user.

There are many ways in which our program could construct this file. In the milestone after this one we're going to look at using beautiful *template files*, so for now let's just get something simple working. Have your code assemble a long string somehow, create a new file, and write the long string to the file.

By the end of this milestone your program should create a new directory with the name of the user's new project and a README file with details about the project. Have your program print a well-formatted debug message to the terminal after it has created a file (eg. `Created file at $FILE_LOCATION`). Run it, make sure it works.

```
What is the name of your project?
> my-cool-project
Who is the author of this project?
> Steve Steveington

## PROJECT DETAILS ##
Project name: my-cool-project
Author:       Steve Steveington

Created directory at /Users/rob/ppab/my-cool-project
Created file at /Users/rob/ppab/my-cool-project/README.md
```

---

TOP TIP: shorten your debugging cycle by temporarily commenting out the code that asks the user for the project and author name and replacing it with hardcoded values. So this:

```python
project_name = input("What is the name of your project?")
```

should become this:

```python
project_name = "test-project"
```

This will mean that you won't need to manually answer these questions every time you want to test your file-writing code. Speeding up each run by a few seconds might not sound like a lot, but I know from experience that those seconds add up and really start to try your patience after the hundredth run when your god-damn code still doesn't god-damn work.

EVEN TOPPER TIP: in our situation, hard-coding `project_name = "test-project"` will cause problems if we try to run our program twice. Our program will try to create a new project inside a directory that already exists, at which point it should probably throw an exception to warn our user that they are trying to overwrite an existing directory. This means that every time our program runs we'll need to delete the `test-project` directory that our program creates so that we can create it again the next time we test our tool. This will probably be even more annoying than having to repeatedly answer our own `What is the name of your project?` question every time we run our program.

A trick that I like to use in situations like this is to append the current *unix timestamp* (the number of seconds since midnight on January 1st, 1970 - Google it for more information) to our project name:

```python
# Or whatever the equivalent of `getCurrentTimestamp()`
# is in your language
project_name = "test-project-" + getCurrentTimestamp()
# project_name is now something like "test-project-1584084936"
```

Now `project_name` will be different every time you run your program, since the current timestamp is always increasing. You won't have to waste time either manually entering input or deleting directories.

---

## 4. Refactor our code to format our README.md file using a template file

Writing bespoke code to construct the contents of the `README.md` file by hand is not a terrible approach, but it is quite fiddly. If you're anything like me then you may have had trouble getting your newlines and indentation and *string interpolation* (Google it) just so.

A neater and more pleasant option is to use a *templating language*. To do so, we write the broad structure of our `README.md` file in a template file, called something like `README.md.template`. This file contains placeholders, formatted according to the chosen templating language, for parameters like projects and author name:

```
## Welcome to {{ project_name }}!

Created by {{ author_name }}
```

Then in our code we read the contents of the template file and use a specially-written templating library to fill in all the placeholders with their real values. This is often known as *rendering* a template, and returns a string containing the filled-in contents of our new file. We write this data out to a file in exactly the same way as we do currently.

For example, one common templating language is called *Jinja*. Jinja templates designate placeholders using double-curly-braces:

```
Hello {{ first_name }} {{ last_name }}, how are you today?
```

A program can render this Jinja template using code that looks conceptually like:

```python
# Read the template file into a string
readme_template_string = open("templates/README.md.template").read()

# Turn the string into a "template object"
readme_template = Template(readme_template_string)

# Render the template by filling in the placeholders
rendered_readme = readme_template.render(
    {"project_name": project_name, "author_name": author_name}
)

# Write the rendered output to a file
readme_output_path = join("..", project_name, "README.md")
open(output_path).write(readme_output_path)
```

Use Google to research templating engines available for your language, and choose the one that looks the most pleasant to work with. This is good practice for the common challenge of deciding which one out of a baffling array of similar-seeming tools to work with. But if you have trouble finding a suitable engine then see the Appendix (TODO - coming soon) for suggestions. Once you've selected an engine, use its syntax to write a template for `README.md`. Finally, update our code to load and render your template and generate the contents of the output `README.md` file. Swap in this code to replace the bespoke string manipulation that our program used previously.

Figuring out the nuances of your specific templating library is left as an exercise for the reader, because that's kind of the whole point of this book.

If you simply can't get templating to work, despite having bashed your head against stacks of curly-braces until your head was really very sore, then don't worry. They're not essential for finishing the this project, and you can stick with the string-manipulation approach we took in the previous mileston. Templates are needed for the final milestone and for many of the extensions, so do give this step your best shot, but you can also make a note to come back to this section once you've got more projects and experience under your belt.

Once you're done, make sure that our program still works in the same way as before. Edit the template, and make sure that the rendered output changes when you re-run the program.

### Storytime

Here's an educational story: I wrote my version of this program in Python, and I wanted to use the Jinja templating engine that I mentioned above. I had no idea what the recommended way to load a Jinja template from a file was, so I Googled "jinja load template from file" and found a promising-looking StackOverflow answer. However, I found its recommendation very obtuse. Here's a stylized impression of how it appeared to me:

```python
import jinja

templateReticulator = jinja.ThingIDontUnderstand(florpblarp=True)
templateSplines = jinja.FloopFlopFleebleFlee(reticulator=templateReticulator)
template = templateSplines.Jangulate("README.md.template")
output = template.render(variables)
```

I didn't like the idea of using so much code that I didn't understand in order to do something as simple as load a file. I therefore elected to load the file myself, the old fashioned way. I was much happier with the result:

```python
import jinja

with open(template_path, mode='r') as f:
    template_string = f.read()
    
template = jinja.Template(template_string)
contents = template.render(variables)
```

When going to Google for assistance, try to come back with something that you at least roughly understand.

## 5. Create a TODO.md file and a main code file using template files

In this milestone we're going to use our template pattern to create additional files.

First, write two more template files - one for `TODO.md` and one for a main code file. Then, update your program to render these templates and create the output files in the new project directory, using exactly the same approach you used to create `README.md`.

Start by simply copy-and-pasting the code you used to render your `README.md` file:

```python
readme_template_string = open("README.md.template", mode='r').read()
readme_template = Template(readme_template_string)
# ...etc...

todo_template_string = open("TODO.md.template", mode='r').read()
todo_template = Template(todo_template_string)
# ...etc...

main_code_template_string = open("main.py.template", mode='r').read()
main_code_template = Template(main_code_template_string)
# ...etc...
```

This duplication may make you feel uneasy. What if I wanted to make fifty templates and fifty files? you may think. What if I wanted to update something about how the code worked? Would I have to update it in each of fifty identical locations?

These are good instincts, but set them aside for just a few paragraphs. In the next and final milestone, we're going to *refactor* our code to DRY (an acronym that stands for Don't Repeat Yourself) it out and get rid of the copy-pasting. But for now we're just trying to get our code working, even if it's a little messy and not something you'd be proud to show to your parents. Get something functioning, then turn around and straighten out the furniture.

This isn't a training-wheels approach for dummies - this is exactly how I wrote my program when working on this project myself. One thing at a time.

### Quick file structure suggestions

I'd suggest that you write your TODO template file using [markdown][markdown] formatting:

```
# TODO for {{ project_name }}

[ ] ...
```

`[ ]` is markdown for an empty tick box, and `[x]` is a ticked off tickbox. For example:

```
# TODO

[x] Create project structure for $PROJECT_NAME
[ ] Make sure that the generated code file works
[ ] Devise project milestones and save them in a file called `MILESTONES.md`
```

I'd further suggest that you write the template for your main code file as code that prints `Welcome to $PROJECT_NAME`. In Python this might be:

```python
if __main__ == "__name__":
    print("Welcome to {{ project_name }}")
```

This is our previously promised code-that-writes-more-code. In the extensions section of this project we're going to write code-that-writes-more-code-*and then automatically executes the code that it just wrote*. Put that on your resume and smoke it.

## 6. Refactor file creation into a reusable function

Our program does everything that we want it to - now it's time to apply some polish. In milestone 5 we had to duplicate a lot of code every time we wanted to load and render a template. In this milestone we're going to reduce this repetition in order to make our code easier to maintain. This will also teach us about how to reduce similar duplication in the future.

At the moment, our code looks something like this:

```python
# README.md
readme_template_string = open("templates/README.md.template").read()
readme_template = Template(readme_template_string)
rendered_readme = readme_template.render(
    {"project_name": project_name, "author_name": author_name}
)
readme_output_path = join("..", project_name, "README.md")
open(output_path).write(readme_output_path)

# TODO.md
todo_template_string = open("TODO.md.template", mode='r').read()
todo_template = Template(todo_template_string)
# Plus lots more code repeated from README.md...

# main.py
main_code_template_string = open("main.py.template", mode='r').read()
main_code_template = Template(main_code_template_string)
# Plus even more repeated code...
```

Our job in this milestone is to wrap up the logic for rendering a template into a single function, so that this snippet becomes something cleaner and less repetitive, like this:

```python
write_template_to_file(
    "templates/README.md.template",
    join("..", project_name, "README.md"),
    {"project_name": project_name, "author_name": author_name}
)
write_template_to_file(
    "templates/TODO.md.template",
    join("..", project_name, "TODO.md"),
    {"project_name": project_name, "author_name": author_name}
)
write_template_to_file(
    "templates/main.py.template",
    join("..", project_name, "main.py"),
    {"project_name": project_name, "author_name": author_name}
)
```

How should we decide what arguments our `write_template_to_file` function should accept, and what it should do with them? The answer is to consider the function's *interface*.

### Function interfaces

I find it useful to think about functions in terms of their *interfaces*. What is the *contract* that your function offers to other code that calls it? How would describe it in terms of "you give me these arguments, and I'll give you back this return value" or "you give me these arguments, and I'll do X with them"?

Some examples:

* You give me two numbers, and I'll give you back their sum
* You give me a project name, and I'll give you back a boolean representing whether or not that project name is valid
* You give me a file path, and I'll read the file and give you back the contents of that file
* You give me the details of a new Tweet and I'll write them to the database. I won't return anything

Function contracts can get more complicated, especially when they have to handle unexpected situations:

* You give me a user ID. If a user with that ID exists then I'll give you back their account details. If not, I'll give you back `None` (or `nil`, or `null`, or whatever word your language uses for "nothing")
* You give me a file path, and I'll give you back the contents of that file. If no file exists at the path, I'll throw an exception

Contracts should be as complex as they need to be and no more. Think about how you would describe your function to someone else, and what they would need to know in order to use it correctly. Would anything about your function surprise them? Is there any risk that using it will introduce strange, silent bugs to their code?

These kinds of "ergonomics" are always important for making your code clean and readable. However, they are most important when you're writing "library code" that is intended be read and used by a wide range of people in a wide range of circumstances. A good example of library code is the code behind a templating engine. I'd argue that Jinja's complex template-loading code that we discussed a few sections ago is a small, forgivable, but definite failure of ergonomics.

Let's look at how to use interfaces to design clean, pleasant-to-use functions.

### How to design a function

When I start writing a new function, I often like to begin by writing out how it will look to the code that uses it. A good example is the `write_template_to_file` snippet that we wrote out at the start of this section:

```python
write_template_to_file(
    "templates/README.md.template",
    join("..", project_name, "README.md"),
    {"project_name": project_name, "author_name": author_name}
)
```

I sketched out this snippet before I had even started to consider how `write_template_to_file` would actually work. This forced me to work out:

* The name of the function
* The arguments that the caller will pass in to the function
* The return value that the function will pass back to the caller
* Any "side-effects" the function will perform, such as writing data to a database, creating a file, or sending an email (we'll talk more about side-effects in future projects)
* How to function would look and feel to prospective users

We'll talk more about how I decided on an interface for `write_template_to_file` shortly. First, let's try this function-sketching technique on something simpler.

### Designing a function that validates project names

Suppose that we want to move the logic that checks whether a project name is valid into a function. We decide to call our function `validate_project_name`, although as we will soon see, I don't like that name very much. After some thought and experimentation, we see that our function will need to accept one argument - the project name. We decide that it will return the boolean value `True` if the project name is valid, and `False` if it not. Our function won't need to write any data to a database or anything like that, so it won't perform any *side-effects*.

We can pretend to use this new function in our code before we have even started to write it:

```python
if not validate_project_name(project_name):
    print("Invalid project name!")
```

This pretend code looks perfectly reasonable, but, as I mentioned above, I don't like the function name `validate_project_name`. It's too vague. A new reader of the above code could probably infer from context that it returns a boolean representing whether `project_name` is valid. But it's also perfectly possible that a function with this name throws an exception if `project_name` is invalid, or even returns a list of strings describing the errors.

I would thererefore prefer to call the function something more specific and descriptive, like `is_valid_project_name`. Let's see how this new name looks in an if-statment:

```python
if not is_valid_project_name(project_name):
    print("Invalid project name!")
```

Now we've almost got an intelligible, if stilted, English sentence. The phrase `is_valid_project_name` is itself a binary question, and it is therefore obvious to even a casual reader that it returns a true/false answer. Sidenote - the Ruby programming language takes this principle even further with the convention that methods that return booleans end in a `?`. In Ruby we would therefore call our method `valid_project_name?`. At this point you can almost hear the rising vocal inflection.

Maybe your programming language or your company has different function naming conventions. That's fine - learn what they are and try to follow them. For now the important thing isn't to get everything about your code and functions perfect first time; it's to start thinking about how they look.

---

Now let's go through this exercise for our template-rendering function. First, what should we call it? In order to answer this question, let's consider its responsibilities:

* Read a template string from a template file
* Prepare this template string to be used for rendering
* Render an output string from the template using some variables
* Write the output string to a new file location

I think that a name like `write_file_from_template` nicely encapsulates the important aspects of these responsibilities. Now we can start to pretend to use our function in our code:

```python
write_file_from_template(...ARGUMENTS_TBD...)
```

Lots of work left to do, but looks good so far.

Next we need to decide what arguments the function will require from the caller, and what values, if any, it should return. To work out what arguments a function requires, I usually use a combination of reading code to see what values it needs, and thinking in the abstract about what information I might need to tell a human in order to allow them to perform the same task. This is something of an art, not a science.

To help with this, here's our previous template-rendering pseudo-code again:

```python
# Read the template file into a string
readme_template_string = open("templates/README.md.template").read()

# Turn the string into a "template object"
readme_template = Template(readme_template_string)

# Render the template by filling in the placeholders
rendered_readme = readme_template.render(
    {"project_name": project_name, "author_name": author_name}
)

# Write the rendered output to a file
readme_output_path = join("..", project_name, "README.md")
open(output_path).write(readme_output_path)
```

All of the variables in this snippet are derived from a small set of original input values. These are the values that our function will need to accept as arguments. They are:

* The template path (in the pseudocode example, `"README.md.template"`)
* The output path (e.g `join("..", project_name, "README.md")`)
* The variables to use to render the template (eg. `{"project_name": project_name, "author_name": author_name}`)

This list of inputs also makes sense if we think about what information a person would need in order to read a template from a file, render it, and write the output to a file. This person would need to know where to get the template (the template path), where to put the output (the output path), and what information to fill in the template placeholders with (the variables).

We now know the X in "if you give me X, I'll give you back Y". But what's Y? What's the return value of our function?

The answer is "nothing". Our function's job is to perform the "side-effect" of writing output to a file, and if it succeeds then it doesn't need to return anything. If it fails for some reason (perhaps because the template file we passed in doesn't exist), then I think that throwing an exception is a very reasonable response.

We now know the full interface of our function. It will:

* Accept 3 arguments: `template_path`, `output_path`, `template_variables`
* Return nothing
* Perform the side-effect of rendering the template from `template_path` using `template_variables`, and write the result to `output_path`
* Throw an exception if something goes wrong

We're finally ready to rewrite our original code as a function, giving us something like:

```python
def write_template_to_file(template_path, output_path, template_variables):
    template_string = open(template_path).read()
    template = Template(template_string)
    rendered = template.render(template, template_variables)
    open(output_path).write(rendered)
```

Our previous, repetitive code can now be rewritten with calls to our new function:

```python
write_template_to_file(
    "templates/README.md.template",
    join("..", project_name, "README.md"),
    {"project_name": project_name, "author_name": author_name}
)
write_template_to_file(
    "templates/TODO.md.template",
    join("..", project_name, "TODO.md"),
    {"project_name": project_name, "author_name": author_name}
)
write_template_to_file(
    "templates/main.py.template",
    join("..", project_name, "main.py"),
    {"project_name": project_name, "author_name": author_name}
)
```

This finished function is compact and modest, but it still has more details for us to analyze. For example, let's talk about *genericism*.

### Genericism

Our `write_template_to_file` function is almost entirely *generic*. This means that it contains very few assumptions or constraints that are specific to our project. It could in theory be reused as-is by any other program that needed to write templated files to files. This is a good thing, because it meanst that it will be easier to adapt as our program's requirements change.

Here's an alternative implementation of `write_template_to_file` that would still work but would be much less generic. Notice how its interface has changed from accepting arguments of `(template_path, output_path, template_variables)` to `(file_name, project_name, template_variables)`:

```python
def write_template_to_file(file_name, project_name, template_variables):
    # Assume that all templates are stored in a directory called
    # `templates/` and that all filenames end with `.template`
    template_path = join("templates", template_name + ".template")

    # Assume that all output paths are of the form
    # `../$PROJECT_NAME/$FILE_NAME
    output_path = join("..", project_name, file_name)

    # Now render the templates as normal
    template = Template(template_string)
    rendered = template.render(template, template_variables)
    open(output_path).write(rendered)
```

This alternative function is used like so:

```python
write_template_to_file(
    "README.md",
    project_name,
    {"project_name": project_name, "author_name": author_name}
)
```

The alternative function makes at least two very specific assumptions that our original function did not. First, it assumes that templates are always stored in a directory called `templates/` and their filenames always end with `.template`. The only thing that the code calling this version of `write_template_to_file` gets to choose is the first part of the filename. If it wants to call its templates something else or store its templates somewhere other than `templates/` then tough toodles. This is a shame.

Second, the function assumes that output paths are always of the form `../PROJECT_NAME/FILE_NAME`. This is another perfectly reasonable way to set up a project, but there's no reason to bake this assumption into this function's code. Once again, it would be much better to allow the caller to choose the full path, as our original function did.

It is admittedly unlikely that we will actually take advantage of this genericism and reuse this code in another program. However, genericism comes with other side-benefits and is still a good property to strive for. Generic functions are easy to understand, because they don't contain any hidden assumptions. They're also more flexible and easy to adapt to new requirements. For example, if we wanted to organize our templates and output into sub-directories (eg. `templates/code/main.py`), we wouldn't need to change our generic template-writing function at all. We would simply add sub-directories to the paths that we pass into the function, and the function would handle them naturally with no extra work. By contrast, the non-generic, assumption-making second version would require some awkward, complexity-introducing updates in order to handle this new use-case.

Not all your code needs to or should be generic. Every program makes assumptions - without assumptions you just have an infinitely powerful computer that has no idea what it wants to achieve. In general, the parts of your program that you should strive to keep generic are the utility building blocks at its base that perform common, broadly-applicable operations like reading input, writing output, or performing text-book calculations.

A rule-of-thumb that I like to use is that if I write a function that is 80% generic (measured in arbitrary made-up units), I'll try to put the extra effort to make it 100% generic. A good example from a future project is a function that renders a 2-D game board to the terminal without making any assumptions about how the game works. However, if I write a function that is only 10% generic and needs to make a lot of assumptions about how my program works, then that's entirely fine and I'll leave it alone.

## Extensions

*We're done - congratulations! I haven't finished writing the extensions to this project yet (they're coming soon). Send me [an email][contact] if you got this far and I'll send you what I've written, or [subscribe to receive updates][subscribe].*

{% endraw %}

[contact]: /feedback
[markdown]: https://daringfireball.net/projects/markdown/syntax#philosophy
[subscribe]: /subscribe