// Forked from [Lauren](http://codepen.io/phantomesse/)'s Pen [Multiple Choice Quiz](http://codepen.io/phantomesse/pen/YPrqLJ/)

// Array of all the questions and choices to populate the questions.
var all_questions = [{
    question_string: "In retaliation for the 1599 Acoma Revolt, Governor Juan de Oñate ordered",
    choices: {
        correct: "the mutilation of all Acoma men over the age of twenty-five.",
        wrong: ["the complete destruction of Acoma Pueblo, including its buildings and people.", "the imprisonment of a few key leaders of the revolt.", "that no actions be taken for fear of further infuriating Pueblo peoples."]
    }
}, {
    question_string: "During the final push for New Mexico's statehood, officials in the U.S. Senate proposed a measure called jointure that would have",
    choices: {
        correct: "combined New Mexico and Arizona into one large state called 'Montezuma.'",
        wrong: ["created a joint state out of New Mexico, Arizona, and Oklahoma territories.", "divided New Mexico into two smaller states.", "prevented New Mexico's statehood for another decade."]
    }
}, {
    question_string: "Hispano residents of New Mexico territory began to refer to themselves as 'Spanish Americans' in the late nineteenth century in order to",
    choices: {
        correct: "emphasize their white, Spanish ancestry and disassociate themselves with Mexican or indigenous heritage to appear more acceptable for statehood.",
        wrong: ["qualify for land grants offered under the Homestead Act of 1862.", "prevent the continued influx of Anglo Americans from the Eastern United States.", "reestablish ties with the Spanish government that had once ruled the area."]
    }
}, {
    question_string: "In the early 1940s, directors of the Manhattan Project chose to locate their top-secret nuclear weapons program to ________, New Mexico due to its remote location and prior experience in the area.",
    choices: {
        correct: "Los Alamos",
        wrong: ["Albuquerque", "Ruidoso", "Alamogordo"]
    }
}, {
    question_string: "__________ and __________ were two of the centers of Ancestral Puebloan (formerly Anasazi) culture during the period between 700 and 1200 CE.",
    choices: {
        correct: "Chaco Canyon; Mesa Verde",
        wrong: ["Casas Grandes; Pecos Pueblo", "Third Mesa; Chaco Canyon", "Ohkay Owingeh; Kewa"]
    }
}, {
    question_string: "Following the U.S.-Mexico War, the process of surveying the new border between the United States and Mexico was complicated because",
    choices: {
        correct: "the Disturnell Map used by negotiators of the Treaty of Guadalupe Hidalgo was inaccurate and in 1849 the Rio Grande changed its course.",
        wrong: ["border commissioners routinely became ill in the desert heat and were unable to complete their assignments.", "the Treaty of Guadalupe Hidalgo was never ratified.", "armed bandits and nomadic natives prevented the boundary commission from completing its task."]
    }
}, {
    question_string: "The Santa Fe Ring was",
    choices: {
        correct: "a thinly veiled political machine directed by Thomas B. Catron.",
        wrong: ["a criminal network comprised of petty thieves and bandits near Santa Fe.", "a social club for former politicians.", "a guild of Santa Fe jewelers."]
    }
}, {
    question_string: "The Navajo Long Walk was planned by ___________ and orchestrated by _________.",
    choices: {
        correct: "James Henry Carleton; Christopher 'Kit' Carson",
        wrong: ["Juan de Oñate; Antonio de Zaldivar", "Sheriff Pat Garrett; Billy the Kid", "Governor Clyde Tingley; Senator Dennis Chávez"]
    }
}, {
    question_string: "The Spanish-colonial 'casta' system was a means of",
    choices: {
        correct: "identifying everyone in society based on their degree of limpieza de sangre, or the purity of their blood.",
        wrong: ["casting blame against those who had committed a crime.", "defining the various branches of the colonial government.", "differentiating between people who worked for governors, the Church, and encomenderos."]
    }
}, {
    question_string: "The name 'New Mexico' (Nuevo México) originated with the earliest Spanish explorers of the region, including members of the Coronado expedition, because they hoped to find",
    choices: {
        correct: "gold and riches comparable to those of the great Aztec Empire, the first Mexico.",
        wrong: ["thousands of hostile indigenous peoples whom they would have to subjugate.", "another great city like Tenochtitlan that had been constructed on a lake.", "small, sedentary societies that could be integrated into the Spanish Empire."]
    }
}];

// An object for a Quiz, which will contain Question objects.
var Quiz = function (quiz_name) {
    // Private fields for an instance of a Quiz object.
    this.quiz_name = quiz_name;
    
    // This one will contain an array of Question objects in the order that the questions will be presented.
    this.questions = [];
}

// A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.
Quiz.prototype.add_question = function (question) {
    // Randomly choose where to add question
    var index_to_add_question = Math.floor(Math.random() * this.questions.length);
    this.questions.splice(index_to_add_question, 0, question);
}

// A function that you can enact on an instance of a quiz object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the quiz in.
Quiz.prototype.render = function (container) {
    // For when we're out of scope
    var self = this;

    // Hide the quiz results modal
    $('#quiz-results').hide();

    // Write the name of the quiz
    $('#quiz-name').text(this.quiz_name);

    // Create a container for questions
    var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');

    // Helper function for changing the question and updating the buttons
    function change_question() {
        self.questions[current_question_index].render(question_container);
        $('#prev-question-button').prop('disabled', current_question_index === 0);
        $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);

        // Determine if all questions have been answered
        var all_questions_answered = true;
        for (var i = 0; i < self.questions.length; i++) {
            if (self.questions[i].user_choice_index === null) {
                all_questions_answered = false;
                break;
            }
        }
        $('#submit-button').prop('disabled', !all_questions_answered);
    }

    // Render the first question
    var current_question_index = 0;
    change_question();

    // Add listener for the previous question button
    $('#prev-question-button').click(function () {
        if (current_question_index > 0) {
            current_question_index--;
            change_question();
        }
    });

    // Add listener for the next question button
    $('#next-question-button').click(function () {
        if (current_question_index < self.questions.length - 1) {
            current_question_index++;
            change_question();
        }
    });

    // Add listener for the submit answers button
    $('#submit-button').click(function () {
        // Determine how many questions the user got right
        var score = 0;
        for (var i = 0; i < self.questions.length; i++) {
            if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
                score++;
            }
        }

        // Display the score with the appropriate message
        var percentage = score / self.questions.length;
        console.log(percentage);
        var message;
        if (percentage === 1) {
            message = 'Great job!'
        } else if (percentage >= .75) {
            message = 'You did alright.'
        } else if (percentage >= .5) {
            message = 'Better luck next time.'
        } else {
            message = 'Maybe you should try a little harder.'
        }
        $('#quiz-results-message').text(message);
        $('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
        $('#quiz-results').slideDown();
        $('#quiz button').slideUp();
    });

    // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
    question_container.bind('user-select-change', function () {
        var all_questions_answered = true;
        for (var i = 0; i < self.questions.length; i++) {
            if (self.questions[i].user_choice_index === null) {
                all_questions_answered = false;
                break;
            }
        }
        $('#submit-button').prop('disabled', !all_questions_answered);
    });
}

// An object for a Question, which contains the question, the correct choice, and wrong choices. This block is the constructor.
var Question = function (question_string, correct_choice, wrong_choices) {
    // Private fields for an instance of a Question object.
    this.question_string = question_string;
    this.choices = [];
    this.user_choice_index = null; // Index of the user's choice selection

    // Random assign the correct choice an index
    this.correct_choice_index = Math.floor(Math.random(0, wrong_choices.length + 1));

    // Fill in this.choices with the choices
    var number_of_choices = wrong_choices.length + 1;
    for (var i = 0; i < number_of_choices; i++) {
        if (i === this.correct_choice_index) {
            this.choices[i] = correct_choice;
        } else {
            // Randomly pick a wrong choice to put in this index
            var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
            this.choices[i] = wrong_choices[wrong_choice_index];

            // Remove the wrong choice from the wrong choice array so that we don't pick it again
            wrong_choices.splice(wrong_choice_index, 1);
        }
    }
}

// A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
Question.prototype.render = function (container) {
    // For when we're out of scope
    var self = this;

    // Fill out the question label
    var question_string_h2;
    if (container.children('h2').length === 0) {
        question_string_h2 = $('<h2>').appendTo(container);
    } else {
        question_string_h2 = container.children('h2').first();
    }
    question_string_h2.text(this.question_string);

    // Clear any radio buttons and create new ones
    if (container.children('input[type=radio]').length > 0) {
        container.children('input[type=radio]').each(function () {
            var radio_button_id = $(this).attr('id');
            $(this).remove();
            container.children('label[for=' + radio_button_id + ']').remove();
        });
    }
    for (var i = 0; i < this.choices.length; i++) {
        // Create the radio button
        var choice_radio_button = $('<input>')
            .attr('id', 'choices-' + i)
            .attr('type', 'radio')
            .attr('name', 'choices')
            .attr('value', 'choices-' + i)
            .attr('checked', i === this.user_choice_index)
            .appendTo(container);

        // Create the label
        var choice_label = $('<label>')
            .text(this.choices[i])
            .attr('for', 'choices-' + i)
            .appendTo(container);
    }

    // Add a listener for the radio button to change which one the user has clicked on
    $('input[name=choices]').change(function (index) {
        var selected_radio_button_value = $('input[name=choices]:checked').val();

        // Change the user choice index
        self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));

        // Trigger a user-select-change
        container.trigger('user-select-change');
    });
}

// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function () {
    // Create an instance of the Quiz object
    var quiz = new Quiz('Red or Green? New Mexico History Quiz #1');

    // Create Question objects from all_questions and add them to the Quiz object
    for (var i = 0; i < all_questions.length; i++) {
        // Create a new Question object
        var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);

        // Add the question to the instance of the Quiz object that we created previously
        quiz.add_question(question);
    }

    // Render the quiz
    var quiz_container = $('#quiz');
    quiz.render(quiz_container);
});
