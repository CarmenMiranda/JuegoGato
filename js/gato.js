/*
    mainCounter:
        Odd equal to X 
        Even equal to O
*/
var mainCounter = 1,
    secondaryCounter =1,
    cells = [0,0,0,0,0,0,0,0,0],
    sumCol= [0,0,0],
    sumRow = [0,0,0],
    sumDiag = [0,0], /*0 equal to 1,5,9  and 1 to 3,5,7*/
    gameWon = false;

function drawShape(cell){
    if(gameWon==false){
        /*Check if valid cell*/
        if(cells[cell-1]==0){
            /*Check the turn: Odd equal to X, and even equal to O */
            if(mainCounter%2==0){
                document.getElementById("cell"+cell).innerHTML="O";
                cells[cell-1]=1;
                makeSums(cell,1);
                if(checkCols()){
                    document.getElementById("turnTitle").innerHTML="Ganó el jugador: O";
                    document.getElementById("playAgain").innerHTML="Jugar Otra vez";
                }
                else
                    document.getElementById("turnTitle").innerHTML="Turno: Jugador con X";
            }else{
                document.getElementById("cell"+cell).innerHTML="X";
                cells[cell-1]=-1;
                makeSums(cell,-1);
                if(checkCols()){
                    document.getElementById("turnTitle").innerHTML="Ganó el jugador: X";
                    document.getElementById("playAgain").innerHTML="Jugar Otra vez";
                }
                else
                    document.getElementById("turnTitle").innerHTML="Turno: Jugador con O";
            }
            mainCounter++;
            secondaryCounter++;
            if(secondaryCounter==10 && gameWon==false){
                document.getElementById("turnTitle").innerHTML="Es un empate";
                document.getElementById("playAgain").innerHTML="Jugar Otra vez";
            }   
        }
        else{
            addClasses();
        }   
    }
    else{
        addClasses();
    }
}

function addClasses(){
    document.getElementById("board").classList.add("animated");
    document.getElementById("board").classList.add("shake");
    setTimeout(removeClasses, 1000);
}

function removeClasses(){
    document.getElementById("board").classList.remove("shake");
    document.getElementById("board").classList.remove("animated");
}

function makeSums(cell, player){
    switch(cell){
        case 1:
            sumCol[0]+=player;
            sumRow[0]+= player;
            sumDiag[0]+=player;
        break;
        case 2:
            sumCol[1]+=player;
            sumRow[0]+= player;
        break;
        case 3:
            sumCol[2]+=player;
            sumRow[0]+= player;
            sumDiag[1]+=player;
        break;
        case 4:
            sumCol[0]+=player;
            sumRow[1]+= player;
        break;
        case 5:
            sumCol[1]+=player;
            sumRow[1]+= player;
            sumDiag[0]+=player;
            sumDiag[1]+=player;
        break;
        case 6:
            sumCol[2]+=player;
            sumRow[1]+= player;
        break;
        case 7:
            sumCol[0]+=player;
            sumRow[2]+= player;
            sumDiag[1]+=player;
        break;
        case 8:
            sumCol[1]+=player;
            sumRow[2]+= player;
        break;
        case 9:
            sumCol[2]+=player;
            sumRow[2]+= player;
            sumDiag[0]+=player;
        break;
    }
}

function checkCols(){
    if(Math.abs(sumCol[0])==3){
        gameWon =true;
        paintCells("cell1","cell4", "cell7");
    }else{
        if(Math.abs(sumCol[1])==3){
            gameWon =true;
            paintCells("cell2","cell5", "cell8");
        }
        else{
            if(Math.abs(sumCol[2])==3){
                gameWon =true;
                paintCells("cell3","cell6", "cell9");
            }
        }
    }
    checkRows();
    return gameWon;   
}

function checkRows(){
    if(Math.abs(sumRow[0])==3){
        gameWon =true;
        paintCells("cell1","cell2", "cell3");
    }else{
        if(Math.abs(sumRow[1])==3){
            gameWon =true;
            paintCells("cell4","cell5", "cell6");
        }
        else{
            if(Math.abs(sumRow[2])==3){
                gameWon =true;
                paintCells("cell7","cell8", "cell9");
            }
        }
    }
    checkDiags();
    return gameWon;
}

function checkDiags(){
    if(Math.abs(sumDiag[0])==3){
        gameWon =true;
        paintCells("cell1","cell5", "cell9");
    }else{
        if(Math.abs(sumDiag[1])==3){
            gameWon =true;
            paintCells("cell3","cell5", "cell7");
        }
    }
    return gameWon;    
}

function paintCells(cell1,cell2,cell3){
    document.getElementById(cell1).style.backgroundColor = "#ce1483";
    document.getElementById(cell2).style.backgroundColor = "#ce1483";
    document.getElementById(cell3).style.backgroundColor = "#ce1483";
}

function restart(){
    var cellRestart = document.getElementsByClassName("cell");
    for (i = 0; i < cellRestart.length; i++) {
        cellRestart[i].style.backgroundColor = "white";
        cellRestart[i].innerHTML = "";
    }
    gameWon=false;
    if(mainCounter%2==0){
        document.getElementById("turnTitle").innerHTML="Turno: Jugador con O";
    }
    else{
        document.getElementById("turnTitle").innerHTML="Turno: Jugador con X";
    }
    secondaryCounter=1;
    cells = [0,0,0,0,0,0,0,0,0];
    sumCol= [0,0,0];
    sumRow = [0,0,0];
    sumDiag = [0,0];
    document.getElementById("playAgain").innerHTML="Reiniciar";
}