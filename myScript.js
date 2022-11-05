
//take the name of the player 1 and 2 from the prompt alert!
var player1="Player 1",player2="Player 2";

//swal stands for sweet alert which helps create good alert boxes
//takes the name from player 1 and when we confirm it takes the name of player 2
swal({
    title: 'Connect4',
    text: "Player 1, Enter your name",
    content: "input",
  }).then(function (value) {
      player1 = value;
    swal("Player 2, Enter your name",{
        content: "input",
    })
    .then(function(value){
        player2 = value
    })
});

//player1 = prompt('Player 1, enter your name:'); 
//player2 = prompt('Player 2, enter your name:');

playerPrompt = $('span'); // taking the object span where it displays which player's turn it is

playerPrompt.html('<b>'+player1+'</b>, it is your turn')
circle = $('td'); //taking the object of each table cell and storing it in a queue of cells

console.log(circle);

//initializing the starting point of each column so that the chips can be placed in the bottom of the table
zero = 42;
one = 43;
two = 44;
three = 45;
four = 46;
five = 47;
six = 48;


let playerTurn = 0;

let color = "turnRed"; //initializing color with red because player 1 will always be red

//when the table cells are clicked this function is activated
circle.click(function(){
    

    //checking the column number of clicked cells and checking if that column is full or not
    if($(this).index()==0 && zero>=0){
        zero =chipDrop(color,zero);
    }
    else if($(this).index()==1 && one>=0){
        one =chipDrop(color,one);
    } 
    else if($(this).index()==2 && two>=0){
        two =chipDrop(color,two);
    } 
    else if($(this).index()==3 && three>=0){
        three =chipDrop(color,three);
    } 
    else if($(this).index()==4 && four>=0){
        four =chipDrop(color,four);
    }
    else if($(this).index()==5 && five>=0){
        five =chipDrop(color,five);
    }  
    else if($(this).index()==6 && six>=0){
        six =chipDrop(color,six);
    } 

})


//drops the chip to the specified cells starting from bottom
function chipDrop(currentColor,index){
    circle.eq(index).addClass(currentColor); // adds the class color (.turnRed or .turnBlue) to the index zero in circle table cell queue
        checkVertically(index); 
        checkHorizontally(index);
        checkDiagonally(index)
        checkDiagonallyR2L(index)
        colorChange();  //changes the color after each successful turn
        return index-=7;
}


//this function changes the class name of variable color after each successful turn
function colorChange(){
    //if the current color is red then it changes it to blue alternatively and vice verse
    if(color == "turnRed"){
        color =  "turnBlue"; 
        playerPrompt.html('<b>'+player2+'</b>, it is your turn') //displays the player 1 name in prompt
    }
    else{
        color = "turnRed";
        playerPrompt.html('<b>'+player1+'</b>, it is your turn') //displays the player 2 name in prompt
    }

}

function checkVertically(index){
    freq = 0;   
    
    //loop to check every cell of a column
    for(let i=index;i<49;i+=7){

        //true if the index cell has the same class name as the currently pushed color
        if(circle.eq(i).attr('class')==color){
            freq+=1;  //if there are adjacent cells with the same class then increment freq
            
            //if there are continuous 4 cells with the same name then declare the winnner
            if(freq==4){
                declareResult(color);
            }
        }
        else{
            break; //when there is another color in between and no continous streak can be formed
        }
    }
}

function checkHorizontally(index){
    freq = 0; 
    row = Math.floor(index/7); //get the integer row number of the cell in which chip was dropped
    startingPoint = row*7; //the starting cells from left of the row of which the current chip dropped

    //the loop runs along a row and should not go beyind the last cell index of that row

    for(let i=startingPoint;i<startingPoint+7 && i<(row+1)*7;i++){

        //true if the index cell has the same class name as the currently pushed color
        if(circle.eq(i).attr('class')==color){
            freq+=1;

            if(freq==4){
                declareResult(color);
            }
        }
        else{
            freq = 0; //if there is a another color in between then intialize flag to 0
        }
    }
}


//check the diagonal from left to right
function checkDiagonally(index){
    row = Math.floor(index/7); //gets the row of the current inserted chip
    column = index%7;          //gets the column of the current inserted chip

    var start_row,start_column,end_row,end_column
    if(row-column>=0){
        start_row = row-column;     //this will be the starting row index of inserted chip diagonal
        start_column = 0;           //this will be the starting column index of inserted chip diagonal

        end_row = 6;                //this will be the ending row index of inserted chip diagonal
        end_column = 6-start_row;   //this will be the ending column index of inserted chip diagonal

    }

    //if row-column<0 that means that the diagonal is on the other side of main diagonal
    //hence there will be changes in the starting and ending row and col
    else{
        start_row = 0;
        start_column = column-row;

        end_row = 6-start_column;
        end_column = 6; 
    }

    var freq = 0,position;
    var row_temp = start_row;
    var column_temp = start_column;

    while(row_temp<=end_row){
        position = (row_temp*7)+column_temp;    //denotes the index value of each chip in that specific diagonal
        if(circle.eq(position).attr('class')==color){
            freq+=1;
            if(freq==4){
                console.log("won diagonally")
                declareResult(color);
            }
        }
        else{
            freq = 0; //if there is a another color in between then intialize flag to 0
        }

        row_temp+=1;
        column_temp+=1;
    }

}

function checkDiagonallyR2L(index){
    row = Math.floor(index/7);
    column = index%7;

    var start_row,start_column,end_row,end_column
    if(row+column<7){
        start_row = 0;
        start_column = row+column;

        end_row = row+column;
        end_column = 0;

    }
    else{
        start_row = (row+column)-6;
        start_column = 6;

        end_row = 6;
        end_column = (row+column)-6; 
    }
    var freq = 0,position;
    var row_temp = start_row;
    var column_temp = start_column;

    while(row_temp<=end_row){

        position = (row_temp*7)+column_temp;
        if(circle.eq(position).attr('class')==color){
            freq+=1;
            
            if(freq==4){
                console.log("won diagonally")
                declareResult(color);
            }
        }
        else{
            freq = 0; //if there is a another color in between then intialize flag to 0
        }
        row_temp+=1;
        column_temp-=1;
    }

}

function declareResult(winningColor){
    //swal stands for sweet alert which helps create good alert boxes
    if(winningColor == 'turnRed'){

        swal({
            title: "Good job!",
            text: "The WINNER is: "+player1,
            icon: "success",
          }).then(function(){ 
            location.reload();
            }
         );

    }
    else{
        swal({
            title: "Good job!",
            text: "The WINNER is: "+player2,
            icon: "success",
          }).then(function(){ 
            location.reload();
            }
         );
    }
}
