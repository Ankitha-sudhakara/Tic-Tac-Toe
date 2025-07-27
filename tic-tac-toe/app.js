let boxes=document.querySelectorAll(".box1");
let resetbut=document.getElementById("reset_button")
let newGameBtn=document.querySelector("#new_button");
let msgContainer=document.querySelector(".msg_container");
let msg=document.querySelector("#msg");
let turn0=true;
let count=0;
/*stroring winner pattern in 2d array*/
const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>
{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box)=> {
   box.addEventListener("click",()=>
{
 if(turn0==true)
 {
   box.style.color="green";
   box.innerText="0";
   turn0=false;
 }else{
    box.style.color="red";
    box.innerText="X"
    turn0=true;
 }
 box.disabled=true;
 count++;

 let winner=checkWinner();
 if (winner)
 {
    count=0;
    return;
 }
 if(count===9 && !winner)
    {
      msg.innerText=`The game Draw`;
      count=0;
      msgContainer.classList.remove("hide");
      disabledBoxes();
    }
});
});

const disabledBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}
const enableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}
const showWinner=(winner)=>
{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
   
}
const checkWinner=()=>
{
    for(let pattern of winPattern)
    {
        let value1=boxes[pattern[0]].innerText;
        let value2=boxes[pattern[1]].innerText;
        let value3=boxes[pattern[2]].innerText;
       
        if(value1!="" && value2!=""&& value3!="")
        {
            if(value1===value2 && value2===value3)
            {
                showWinner(value1);
                return true;
            }
        }
    }
    return false;
};
newGameBtn.addEventListener("click",resetGame);
resetbut.addEventListener("click",resetGame);
